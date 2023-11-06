import { Flex, Image, Button, ButtonGroup, Card, Text } from '@chakra-ui/react'
import { MdAutorenew, MdCancel } from 'react-icons/md'

export type MemberCardProps = {
  member: any
  nft: any
  balance: string
  renewMembershipForIsLoading: boolean
  cancelAndRefundIsLoading: boolean
  expireDate: string
}

const MemberCard = (props: MemberCardProps) => {
  const { nft, balance, renewMembershipForIsLoading, cancelAndRefundIsLoading, expireDate } = props

  return (
    <Card overflow={'hidden'} p={8} mb={4} alignItems="center" boxShadow="2xl">
      <Image src={`${nft.metadata.image}`} height={250} width={200} />
      <Flex justify={'space-between'} alignItems={'center'} direction={'row'} width="100%" mb={4}>
        <Text fontWeight={'bold'}>{nft.metadata.name}</Text>
        <Text>Qty: {balance}</Text>
      </Flex>
      <Flex justifyContent={'center'} direction={'row'} mb={4}>
        <Text fontSize="xs">{nft.metadata.description}</Text>
      </Flex>
      <Flex justifyContent={'center'} direction={'column'} mb={4}>
        <Text fontSize="xs">Expires: {expireDate}</Text>
      </Flex>
      <ButtonGroup justifyContent={'center'}>
        <Button colorScheme={'green'} leftIcon={<MdAutorenew />} onClick={() => {}} isLoading={renewMembershipForIsLoading}>
          RENEW
        </Button>
        <Button colorScheme={'red'} leftIcon={<MdCancel />} onClick={() => {}} isLoading={cancelAndRefundIsLoading}>
          CANCEL
        </Button>
      </ButtonGroup>
    </Card>
  )
}
export default MemberCard
