import { Box, Image, Link, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Skeleton } from '@chakra-ui/react'
import { LivepeerConfig } from '@livepeer/react'
import { useQuery } from '@tanstack/react-query'
import { useAddress } from '@thirdweb-dev/react'
import { useLivepeerClient } from 'hooks/useLivepeerClient'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { CREATIVE_LOGO_WHT } from '../utils/context'
import { AssetData } from '../utils/fetchers/assets'
import { parseTimestampToDate, formatString } from '../utils/helpers'

type ApiResponse<TData> = { data?: TData; errors?: any[] }

const PosterImage = () => {
  return (
    <Image src={`${CREATIVE_LOGO_WHT}`} objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Creative Logo" />
  )
}

type MyAssetsProps = {
  [index: string]: any
}
export default function MyAssets(props: MyAssetsProps) {
  const router = useRouter()
  const { query: rQuery } = router
  console.log('router: ', rQuery)
  const connectedAddress = useAddress()

  const videosQuery = useQuery<ApiResponse<AssetData['video'][]>>(['allVideos'], () => fetch('/api/livepeer/assets').then((res) => res.json()), {
    staleTime: 3000,
  })

  if (videosQuery?.isLoading) {
    console.log('loading...')
    // loading state
    return <Skeleton height={'20px'}/>
  }

  if (videosQuery?.isError || videosQuery?.data?.errors) {
    console.log('error', videosQuery?.error)
    return <Box children="Error loading resource." mb={24} />
  }

  const readyVideos =
    videosQuery?.data?.data?.filter((video): video is AssetData['video'] => {
      return (
        video?.status?.phase === 'ready' &&
        Number(video?.storage?.ipfs.spec?.nftMetadata?.properties?.pricePerNFT) > 0 &&
        video?.creatorId?.value === connectedAddress
      )
    }) ?? []

  console.log('readyVideos: ', readyVideos)

  return (
    <LivepeerConfig client={useLivepeerClient}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Created</Th>
              <Th>Updated</Th>
              <Th isNumeric>Views</Th>
              <Th>Claims Permissions set</Th>
            </Tr>
          </Thead>
          <Tbody>
            {readyVideos.map((video, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    <Link as={NextLink} href={`${connectedAddress}/${video.id}?video=${JSON.stringify(video)}`}>
                      {formatString.titleCase(video?.name)}
                    </Link>
                  </Td>
                  <Td>{parseTimestampToDate(video?.createdAt as any)}</Td>
                  <Td>{parseTimestampToDate(video?.status?.updatedAt as any)}</Td>
                  <Td isNumeric>{video?.viewCount}</Td>
                  {/* TODO: Depict that the ClaimCondition is set */}
                  {/* <Td>{rQuery['isClaimConditionSet'] ? 'true' : 'false'}</Td> */}
                  <Td>{'true/false'}</Td>
                </Tr>
              )
            })}
          </Tbody>
          <Tfoot>
            <Tr></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </LivepeerConfig>
  )
}

// {
//   isMinting && txHash ? (
//     <div>
//       <SetClaimConditions
//         nftContractAddress={nftContract?.getAddress() as any}
//         currencyAddress={''}
//         price={Number(props.assetData.pricePerNFT)}
//       />
//     </div>
//   ) : null
// }