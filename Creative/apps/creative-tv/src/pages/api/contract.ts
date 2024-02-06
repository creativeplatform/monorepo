import { NextApiRequest, NextApiResponse } from 'next'
import { mongodbClient } from 'utils/db-connectors/mongo-db'
import { getUser } from './auth/[...thirdweb]'

const mongo = {
  mongodbClient,
  db: mongodbClient.db('creative-tv'),
  collectionName: 'userContractAddress',
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the user of the request
  const user = await getUser(req)

  // Check if the user is authenticated
  if (!user) {
    return res.status(401).json({
      message: 'No user is signed in.',
    })
  }

  if (req.method === 'GET') {
    const query = req.query

    const collection = mongo.db.collection(mongo.collectionName)
    const result = await collection.findOne({ userAddress: query.address })

    res.status(200).json({ data: result })
  } else if (req.method === 'POST') {
    const data = req.body

    const collection = mongo.db.collection(mongo.collectionName)
    const doc = await collection.insertOne(data)

    if (doc.acknowledged) {
      res.status(201).json({
        data: `Operation successful`,
        status: res.statusCode
      })
    } else {
      res.json({
        data: 'Operation failed.',
      })
    }
  } else {
    // Respond with "Method Not Allowed" if the method is neither GET nor POST
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    res.json({
      status: 500,
      statusText: 'Server error',
    })
  }
}

export default handler
