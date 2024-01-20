import { Flex, Image, Button, ButtonGroup, Card, Text, useToast, SkeletonText } from '@chakra-ui/react'
import { MdAutorenew, MdCancel } from 'react-icons/md'
import { useAddress, useContract, useOwnedNFTs, useContractWrite, useContractRead } from '@thirdweb-dev/react'
import { CREATIVE_ADDRESS, LOCK_ADDRESS_MUMBAI_TESTNET } from 'utils/config'
import { fromTimestampToDate } from 'utils/formatString'
import Unlock from '../utils/fetchers/Unlock.json'


export type MemberCardProps = {
  member: any
  nft: any
  balance: string
}

const MemberCard = (props: MemberCardProps) => {
  const toast = useToast()
  const address = useAddress()

  const { 
      contract: unlockContract,
      isLoading: loadingUnlockContract,
      error: unlockContractError,
    } = useContract(
      LOCK_ADDRESS_MUMBAI_TESTNET.address, 
      Unlock.abi
    )

  const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs( unlockContract, address)

  // SET PROPS
  const { nft, balance } = props


  // READ FROM CONTRACT
  const { data: expirationDuration, isLoading: expirationLoading } = useContractRead(unlockContract, "expirationDuration");

  /****** WRITE TO CONTRACT *******/

  const { mutateAsync: renewMembershipFor, isLoading: renewMembershipForIsLoading } = useContractWrite(unlockContract, 'renewMembershipFor')

  const renew = async () => {
    try {
      const data = await renewMembershipFor({ args: [ownedNFTs?.[0].metadata.id, CREATIVE_ADDRESS] })
      console.info('contract call successs', data)
      toast({
        title: 'Membership Renewal',
        description: 'Successfully renewed your membership 🙌🏾',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      console.error('Renewal Failed', err)
      toast({
        title: 'Renewal Error',
        description: `${err}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const { mutateAsync: cancelAndRefund, isLoading: cancelAndRefundIsLoading } = useContractWrite(unlockContract, 'cancelAndRefund')

  const cancelMembership = async () => {
    try {
      const data = await cancelAndRefund({ args: [ownedNFTs?.[0].metadata.id] })
      console.info('contract call successs', data)
      toast({
        title: 'Membership Cancelled',
        description: 'Sorry to see you go... 🥹',
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      console.error('contract call failure', err)
      toast({
        title: 'Error',
        description: `${err}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }


  return (
    <Card overflow={'hidden'} p={8} mb={4} alignItems="center" boxShadow="2xl">
      <Image src={`${nft?.metadata?.image}`} height={250} width={200} mb={4} />
      <Flex justify={'space-between'} alignItems={'center'} direction={'row'} width="100%" mb={4}>
        <Text fontWeight={'bold'}>{nft?.metadata?.name}</Text>
        <Text fontWeight={'bold'}>Qty: {balance}</Text>
      </Flex>
      <Flex justify={'space-between'} alignItems={'center'} direction={'row'} width="100%" mb={4}>
        <Text fontWeight={'bold'}>Member No. { nft?.metadata?.id }</Text>
      </Flex>
      <Flex justifyContent={'center'} direction={'row'} mb={4}>
        <Text fontSize="xs">{nft?.metadata?.description}</Text>
      </Flex>
      <Flex justifyContent={'center'} direction={'column'} mb={4}>
      <Text fontSize="xs">
        Expires in {
          expirationDuration
          ? fromTimestampToDate(expirationDuration)
          : <SkeletonText noOfLines={1} skeletonHeight={'2'}/>
        } hour(s).
      </Text>
      </Flex>
      <ButtonGroup justifyContent={'center'}>
        <Button colorScheme={'green'} leftIcon={<MdAutorenew />} onClick={() => {renew()}} isLoading={renewMembershipForIsLoading}>
          RENEW
        </Button>
        <Button colorScheme={'red'} leftIcon={<MdCancel />} onClick={() => {cancelMembership()}} isLoading={cancelAndRefundIsLoading}>
          CANCEL
        </Button>
      </ButtonGroup>
    </Card>
  )
}
export default MemberCard
