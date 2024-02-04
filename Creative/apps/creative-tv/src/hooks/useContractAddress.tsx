import { useAddress } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'

type PostContractAddressType = {
  _id?: string
  userAddress: string
  contractAddress: string
}
/**
 * This hook is used to save a contract address to a database and also the fetch the contract addreess
 * NOTE: might to update to use IPFS
 * @returns
 */
export const useContractAddress = () => {
  const connectedAddress = useAddress()
  const [nftContractAddress, setNftContractAddress] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getContractAddress()
  }, [])

  const getContractAddress = async () => {
    try {
      setIsFetching(true)

      const res = await fetch(
        '/api/contract?' +
          new URLSearchParams({
            address: connectedAddress!,
          })
      )

      const {data} = await res.json()      
      
      if (connectedAddress == data.userAddress) {
        setNftContractAddress(data.contractAddress)
      }
    } catch (err: any) {
      setIsFetching(false)
      setError(err.message)
    }
  }

  const postContractAddress = async ({ userAddress, contractAddress }: PostContractAddressType) => {
    try {
      setIsFetching(true)
      const res = await fetch('/api/contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contractAddress, userAddress }),
      })

      const data = await res.json()
      return data
    } catch (err: any) {
      setIsFetching(false)
      setError(err.message)
    }
  }

  return { nftContractAddress, postContractAddress, error, isFetching }
}
