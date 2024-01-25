import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useActiveClaimCondition } from '@thirdweb-dev/react'
import { ClaimCondition, NFT, SmartContract } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import { useState } from 'react'
import { globalTheme } from 'utils/config'
import { logError } from 'utils/helpers'
import { ClaimNFT } from './ClaimNFT'
import { ListClaimConditions } from './ListClaimConditions'
import { SetClaimConditions } from './SetClaimConditions'

type ShowNFTDetailsInModalProps = {
  isOpen: boolean
  onClose: () => void
  nft: NFT
  claimConditions: ClaimCondition[]
  isFetching: boolean
  nftContract: SmartContract<ethers.BaseContract> | undefined
  nftMetadata: Record<string, any>
  addClaimPhase: boolean
  setAddClaimPhase: (arg: boolean) => void
  getClaimConditionsById: (tokenId: string) => void
  assetData: any
}
export function ShowNFTDetailsInModal(props: ShowNFTDetailsInModalProps) {
  const [tabIndex, setTabIndex] = useState(0)
  const {
    data: activeClaimCondition,
    isLoading: isActiveClaimLoading,
    error: activeClaimError,
  } = useActiveClaimCondition(props.nftContract, props.nft?.metadata.id)

  const tabList = ['Details', 'Claim Conditions', 'Claim']

  const handleTabsChange = (idx: number) => {
    if (tabList[tabList.length - 1].toLowerCase() == 'Claim'.toLowerCase() && activeClaimCondition === undefined) {
      logError({ description: 'activeClaimCondition not available', err: '' })
      return
    }
    setTabIndex(idx)
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={24}>{props.nft?.metadata.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text pb={8} color={'gray.300'} fontWeight={600}>
            {props.nft?.metadata.description}
          </Text>
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              {tabList &&
                tabList.length > 0 &&
                tabList.map((txt, i) => (
                  <Tab
                    key={i}
                    fontWeight={500}
                    name={txt}
                    style={{ backgroundColor: txt === tabList[tabList.length - 1] && activeClaimCondition === undefined ? 'gray.500' : '' }}
                    _hover={{
                      cursor: txt === tabList[tabList.length - 1] && activeClaimCondition === undefined ? 'not-allowed' : 'pointer',
                    }}>
                    {txt}
                  </Tab>
                ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <HStack spacing={12} my={4}>
                  <VStack spacing={4} alignItems={'flex-start'} style={{ fontWeight: 600 }}>
                    <span>Token Type: </span>
                    <span>Token ID: </span>
                    <span>Suppy: </span>
                  </VStack>
                  <VStack spacing={4} alignItems={'flex-start'} style={{ fontWeight: 400 }} color={'gray.300'}>
                    <Text>{props.nft?.type}</Text>
                    <Text>{props.nft?.metadata.id}</Text>
                    <Text>{props.nft?.supply}</Text>
                  </VStack>
                </HStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={0} alignItems={'flex-start'} my={4}>
                  {props.isFetching ? (
                    <Spinner
                      my={12}
                      alignSelf={'center'}
                      size="md"
                      thickness="3px"
                      speed="0.5s"
                      emptyColor="gray.200"
                      color={globalTheme.colors.primary}
                    />
                  ) : (
                    props.claimConditions.length > 0 && (
                      <ListClaimConditions
                        nftContract={props.nftContract}
                        nft={props.nft!}
                        claimConditions={props.claimConditions}
                        nftMetadata={props.nftMetadata}
                        addClaimPhase={props.addClaimPhase}
                        setAddClaimPhase={props.setAddClaimPhase}
                      />
                    )
                  )}
                </VStack>

                {props.addClaimPhase && (
                  <SetClaimConditions
                    numberOfClaimsConditonsAvailable={props.claimConditions.length}
                    tokenId={String(props.nft?.metadata.id)}
                    nftMetadata={props.nftMetadata}
                    nftContract={props.nftContract}
                    setAddClaimPhase={props.setAddClaimPhase}
                    claimConditions={props.claimConditions}
                    // onModalOpen={props.isOpen}
                    // getClaimConditionsById={props.getClaimConditionsById}
                  />
                )}
              </TabPanel>
              
              <TabPanel>
                <ClaimNFT nftContract={props.nftContract} tokenId={props.nft?.metadata.id} nftMetadata={props.nftMetadata} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button style={{ backgroundColor: globalTheme.colors.primary }} mr={3} variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
