import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { FaStar } from 'react-icons/fa'
import { ProfileHeader } from 'ui'

//import { PROFILE_VIDEOS, PROFILE_CAMPAIGNS } from 'utils/context'



// TODO GRAPHQL QUERY: GET_PROFILES using useQuery
// const GET_PROFILES = gql`
//   query ($request: ProfileQueryRequest!) {
//     profiles(request: $request) {
//       items {
//         ...ProfileFragment
//       }
//     }
//   }
//   ${ProfileFragment}
// `

const ProfilePage: NextPage = () => {
  const { query } = useRouter()
  const { address } = useAccount()

  const [balance, setBalance] = React.useState(10000)
  const [brandData] = React.useState([
    // {
    //   id: 1,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Voting Stage",
    //   claim: false,
    // },
    // {
    //   id: 2,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Decision Stage",
    //   claim: false,
    // },
    // {
    //   id: 3,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Submission Stage",
    //   claim: false,
    // },
    // {
    //   id: 4,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "Coca-Cola Brand Campaign",
    //   prize: 500,
    //   active: false,
    //   stage: "Ended",
    //   claim: false,
    // },
    // {
    //   id: 5,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: true,
    //   stage: "Voting Stage",
    //   claim: false,
    // },
    // {
    //   id: 6,
    //   image: "https://bit.ly/dan-abramov",
    //   brand: "TESLA Brand Campaign",
    //   prize: 500,
    //   active: false,
    //   stage: "Ended",
    //   claim: false,
    // },
  ])

  // Lens Profile Query
//   console.log('___ query ___', query)
//   const {
//     data: profileData,
//     loading,
//     error,
//     refetch,
//   } = useQuery(GET_PROFILES, {
//     variables: {
//       request: { handles: [query.user] },
//     },
//   })

//   console.log('___ error ___', error)
//   if (loading) return <p>loading...</p>
//   if (error) return <p>Error :(</p>
//   // console.log(profileData);

//   if (!profileData.profiles.items[0])
//     return (
//       <Box
//         margin={'auto'}
//         maxW={['100%', '100%', '100%', '60%']}
//         display="flex"
//         overflowX="hidden"
//         justifyContent={['center', 'center', 'center', 'space-evenly']}
//         flexDir={['column', 'column', 'column', 'row']}
//       >
//         <chakra.h2 color="black" fontSize="3xl" fontWeight="bold">
//           No user with this handle
//         </chakra.h2>
//       </Box>
//     )

  return (
    <Box>
      <ProfileHeader
        profile={''}
        balance={balance}
        refetch={() => {    }}
      />

      <Box
        margin={'auto'}
        marginBottom={100}
        maxW={['100%', '100%', '100%', '60%']}
        display="flex"
        padding={5}
        overflowX="hidden"
        justifyContent={['center', 'center', 'center', 'space-evenly']}
        flexDir={['column', 'column', 'column', 'row']}
      >
        <Box
          display="flex"
          flexDir={'column'}
          marginTop={30}
          marginRight={[0, 0, 0, 20]}
          marginBottom={[10, 10, 10, 0]}
          alignItems="center"
          maxW={['100%', '100%', '100%', '20%']}
          cursor={'pointer'}
        ></Box>
        <Box maxW={['100%', '100%', '100%', '80%']}>
          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'row', 'row']}
            marginBottom={20}
            cursor={'pointer'}
          ></Box>
          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'column']}
            marginBottom={20}
            cursor={'pointer'}
          >
            <Box marginBottom={5}>
              <Heading>
                No Idea what goes here
              </Heading>
            </Box>
            <Box display="flex" alignItems="center" marginBottom={5}>
              <FaStar fontSize={35} color="yellow" />
              <Heading marginLeft={5} color="#e50168">
                600
              </Heading>
            </Box>
            <Box>
              <Button background="#e50168">unlock NFT</Button>
            </Box>
          </Box>

          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'column']}
            marginBottom={20}
            cursor={'pointer'}
          >
            <Box marginBottom={5}>
              <Heading>
                Your Videos
              </Heading>
            </Box>
            <Box
              display="flex"
              flexDir="row"
              maxW={['100%', '100%', '100%', '100%']}
              cursor={'pointer'}
            >
              {/* <Box display="flex" flexDir="row" overflowX="scroll">
              <CreativeCard />
              <CreativeCard />
              <CreativeCard />
              <CreativeCard />
            </Box> */}
            </Box>
          </Box>

          <Box
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'column']}
            marginBottom={20}
            cursor={'pointer'}
          >
            <Box marginBottom={5}>
              <Heading>
                  Submitted Campaign Details
              </Heading>
            </Box>
            <SimpleGrid marginBottom={5} columns={[4, 4, 4, 6]}>
              <Box maxW="10%" h="10" />
              <Box h="10">
                <Heading as="h4" size="md">
                  Brand
                </Heading>
              </Box>
              <Box h="10" display={['none', 'none', 'none', 'flex']}>
                <Heading as="h4" size="md">
                  Prize
                </Heading>
              </Box>
              <Box h="10" display={['none', 'none', 'none', 'flex']}>
                <Heading as="h4" size="md">
                  Status
                </Heading>
              </Box>
              <Box h="10">
                <Heading as="h4" size="md">
                  Stage
                </Heading>
              </Box>
              <Box h="10">
                <Heading as="h4" size="md">
                  Claim
                </Heading>
              </Box>
            </SimpleGrid>
            <Box background="gray" width="100%">
                  <SimpleGrid key={""} columns={[4, 4, 4, 6]} padding={2}>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'center'}
                    >
                      <Image
                        boxSize="30px"
                        src={""}
                        alt="Dan Abramov"
                      />
                    </Box>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Text color="black" fontSize="sm">
                       
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={['none', 'none', 'none', 'flex']}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Text color="black" fontSize="sm">
                        USDC reward
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Box
                        background={""}
                        minWidth={5}
                        minHeight={5}
                        maxWidth={5}
                        maxHeight={5}
                        borderWidth={2}
                        marginRight={2}
                        borderRadius={'50%'}
                      />
                      <Text color="black" fontSize="sm">
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={['none', 'none', 'none', 'flex']}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                      <Text color="black" fontSize="sm">
                      </Text>
                    </Box>
                    <Box
                      h="10"
                      display={'flex'}
                      alignItems="center"
                      justifyContent={'flex-start'}
                    >
                        <Button background="#e50168">POAP</Button>
                    </Box>
                  </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage