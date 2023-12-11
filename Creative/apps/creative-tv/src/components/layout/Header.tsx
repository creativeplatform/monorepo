import React, { use, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  VStack,
  Stack,
  Text,
  chakra,
  useColorModeValue,
  useDisclosure,
  useToast,
  MenuGroup,
} from '@chakra-ui/react'
import Unlock from '../../utils/fetchers/Unlock.json'
import { ConnectWallet, useAddress, useSmartWallet, useSigner, useUser, embeddedWallet, Web3Button, useWallet } from '@thirdweb-dev/react'
import { utils } from 'ethers'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { Paywall } from '@unlock-protocol/paywall'
import networks from '@unlock-protocol/networks'
import { useScroll } from 'framer-motion'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AiOutlineDisconnect, AiOutlineMenu } from 'react-icons/ai'
import usePurchaseNFT from 'hooks/usePurchaseNFT'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { RiVideoUploadFill } from 'react-icons/ri'
import { SITE_LOGO, SITE_NAME, LOCK_ADDRESS_MUMBAI_TESTNET, ACCOUNT_FACTORY_TESTNET, CREATIVE_ADDRESS } from '../../utils/config'
import { ThemeSwitcher } from './ThemeSwitcher'
import WertPurchaseNFT from 'components/WertPurchaseNFT'
import BuyCrypto from 'components/BuyCrypto'


interface Props {
  className?: string
  icon?: string
  title?: string
  children?: React.ReactNode
  handleLoading?: () => void
}

export function Header({ className, handleLoading }: Props) {
  const styleName = className ?? '';
  const ref = useRef(null);
  const router = useRouter();
  const toast = useToast();
  const address = useAddress() || '';
  const { isLoggedIn } = useUser();
  const signer = useSigner();
  const emailLogin = useWallet("embeddedWallet"); 

  const { connect } = useSmartWallet(embeddedWallet(), {
    factoryAddress: ACCOUNT_FACTORY_TESTNET,
    gasless: true,
  });

  useEffect(() => {
    const getEmail = async () => {
      if (emailLogin) {
        const email = await emailLogin.getEmail();
        // Use the email address here
        console.log(email);
        return email;
      }
    };
    getEmail();
  }, [address]);


  const onConnect = async () => {
    await connect({
      connectPersonalWallet: async (embeddedWallet) => {
        // login with google and connect the embedded wallet
        const authResult = await embeddedWallet.authenticate({
          strategy: "google",
        });
        await embeddedWallet.connect({ authResult });
      },
    });
  };

  const [subscribed, setSubscribed] = useState(false)

  const connector = useColorModeValue('light', 'dark')

  // const [creatorPaywallConfig, setCreatorPaywallConfig] = useState(null);

  // const handleButtonClick = () => {
  //   if (handleLoading) {
  //     handleLoading();
  //   }
  // };

  const sdkSigner = signer && ThirdwebSDK.fromSigner(signer);

  const paywallConfig = {
    "pessimistic": true,
    "locks": {
      "0x9a9280897c123b165e23f77cf4c58292d6ab378d": {
        "network": 80001,
        "name": "DAO Membership"
      }
    },
    "icon": "https://bafkreiehm3yedt4cmtckelgfwqtgfvp6bolvk5nx2esle4tnwe7mi5q43q.ipfs.nftstorage.link/",
    "metadataInputs": [
      {
        "name": "Name",
        "type": "text",
        "required": true
      },
      {
        "name": "Email",
        "defaultValue": emailLogin ? emailLogin.getEmail() : '',
        "type": "email",
        "required": true
      }
    ]
  }

  const networkConfigs = {
    80001: {
      
    }
  }
  
  /*******  CONTRACT READING ********/
  // useEffect(() => {
  //   if (!address || !sdkSigner || !Unlock.abi) return
  //   const getSubscribedData = async () => {
  //       const unlockContract = await sdkSigner?.getContractFromAbi(
  //         '0x9a9280897c123b165e23f77cf4c58292d6ab378d',
  //         Unlock.abi,
  //       );
  //       return await unlockContract?.call(
  //         "getHasValidKey", // Name of your function as it is on the smart contract
  //         // Arguments to your function, in the same order they are on your smart contract
  //         [
  //           address
  //         ],
  //       )
  //     }
  //     getSubscribedData().then((res) => {
  //       console.log(res, 'Are you a subscriber?')
  //       setSubscribed(res)
  //     })
  //   }, [address, sdkSigner, Unlock.abi])


  const [y, setY] = useState(0)
  const { scrollY } = useScroll()
  const mobileNav = useDisclosure()
  const cbg = useColorModeValue('#F0F0F0', 'brand.100')
  const cl = useColorModeValue('gray.900', 'white')

  useEffect(() => {
    function updateScrollY() {
      setY(scrollY.get())
    }
    const unsubscribeY = scrollY.on('change', updateScrollY)
    return unsubscribeY
  }, [scrollY])

  const { height } = ref.current ? ref.current : { height: 0 }

  const Section = ({ icon, title, children }: Props) => {
    const ic = useColorModeValue('brand.600', 'brand.300')
    const hbg = useColorModeValue('gray.100', 'brand.100')
    const tcl = useColorModeValue('gray.900', 'brand.400')
    const dcl = useColorModeValue('gray.500', 'gray.100')
    return (
      <Box display="flex" alignItems="start" rounded="lg" _hover={{ bg: hbg, cursor: 'pointer' }}>
        <chakra.svg
          flexShrink={0}
          h={6}
          w={6}
          color={ic}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          {icon}
        </chakra.svg>
        <Box pl={4}>
          <Text size="sm" fontWeight="700" color={tcl}>
            {title}
          </Text>
          <chakra.div mt={1} fontSize="sm" color={dcl}>
            {children}
          </chakra.div>
        </Box>
      </Box>
    )
  }

  const Features = (props: any) => {
    const hbg = useColorModeValue('gray.100', 'brand.100')
    const hbgh = useColorModeValue('brand.400', 'brand.300')
    const tcl = useColorModeValue('brand.100', 'brand.600')
    return (
      <>
        <SimpleGrid columns={props.h ? { base: 1, md: 3, lg: 5 } : 1} pos="relative" gap={{ base: 6, sm: 8 }} px={5} py={6} p={{ sm: 8 }}>
          <LinkBox color={tcl}>
            <Section title="How It Works">
              <LinkOverlay href="https://creativeplatform.xyz/docs/intro" target={'_blank'}>
                <Text>Documentation on how the Creative platform works</Text>
              </LinkOverlay>
            </Section>
          </LinkBox>
          <LinkBox color={tcl}>
            <Section title="CREATIVE Platform">
              <LinkOverlay href="https://creativeplatform.xyz">
                <Text>
                  Creatives want the ability to create great content and profits when they want without having to shell out 💰 to do it. So we built
                  our own solution.
                </Text>
              </LinkOverlay>
            </Section>
          </LinkBox>
          <LinkBox color={tcl}>
            <Section title="CREATIVE Stageverse">
              <LinkOverlay href="https://alpha.stageverse.com/#/space/63291415ea801e00094ebbd0/1014-26" target={'_blank'}>
                <Text>Our metaverse playground for interacting with all of our digital collectibles.</Text>
              </LinkOverlay>
            </Section>
          </LinkBox>

          <LinkBox color={tcl}>
            <Section title="DAO Proposals">
              <LinkOverlay href="https://dao.creativeplatform.xyz" target={'_blank'}>
                <Text>
                  Looking for a way to help liven up our community? Introducing DAO Proposals! Our community is managed via a DAO and all that action
                  happens here. From exciting new features to heated debates on the best way to run things, it&rsquo;s all happening on DAO Proposals.
                  So come join us and see what all the fuss is about!
                </Text>
              </LinkOverlay>
            </Section>
          </LinkBox>

          <LinkBox color={tcl}>
            <Section title="Bugs/Feature Suggestions">
              <LinkOverlay href="https://feedback.creativeplatform.xyz" target={'_blank'}>
                <Text>Suggest a feature to the Creative community for the good of the platform.</Text>
              </LinkOverlay>
            </Section>
          </LinkBox>
        </SimpleGrid>
        <Box px={{ base: 5, sm: 8 }} py={5} bg={hbg} display={{ sm: 'flex' }}>
          <Stack direction={{ base: 'row' }} spacing={{ base: 6, sm: 10 }}>
            <Box display="flow-root">
              <LinkBox m={-3} p={3} display="flex" alignItems="center" rounded="md" fontSize="md" color={tcl} _hover={{ bg: hbgh }}>
                <chakra.svg
                  flexShrink={0}
                  h={6}
                  w={6}
                  color="inherit"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </chakra.svg>
                <LinkOverlay href="https://app.clarity.so/creativeOrg/docs/d259949c-fc14-484c-a53f-f6e80ce0ce04" target={'_blank'}>
                  <chakra.span ml={3}>Watch Demo</chakra.span>
                </LinkOverlay>
              </LinkBox>
            </Box>

            <Box display="flow-root">
              <LinkBox m={-3} p={3} display="flex" alignItems="center" rounded="md" fontSize="md" color={tcl} _hover={{ bg: hbgh }}>
                <chakra.svg
                  flexShrink={0}
                  h={6}
                  w={6}
                  color="inherit"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </chakra.svg>
                <LinkOverlay href="mailto:sales@creativeplatform.xyz" target={'_blank'}>
                  <chakra.span ml={3}>Contact Sales</chakra.span>
                </LinkOverlay>
              </LinkBox>
            </Box>
          </Stack>
        </Box>
      </>
    )
  }

  const MobileNavContent = (props: any) => {
    const connector = useColorModeValue('light', 'dark')
    return (
      <Drawer isOpen={mobileNav.isOpen} placement="top" onClose={mobileNav.onClose} size={{ base: 'full', sm: 'full', md: 'xs' }}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <p>
            <Accordion allowToggle px="0px" my={4}>
              <AccordionItem>
                <AccordionButton>
                  <Button
                    color="black.700"
                    display="inline-flex"
                    alignItems="center"
                    px="0"
                    fontSize="sm"
                    fontWeight={700}
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}>
                    Free Channels
                  </Button>
                  <AccordionIcon display={{ base: 'none', sm: 'none', md: 'block' }} />
                </AccordionButton>
                <AccordionPanel>
                  <LinkBox as='article' maxW='sm' p='4' borderWidth='1px' rounded='md'>
                    <Box as='time' dateTime='2023-11-09 15:30:00 +0000 UTC'>
                      Exclusive
                    </Box>
                    <Heading size='md' my='2'>
                      <LinkOverlay as={NextLink} href='https://kidz.creativeplatform.xyz' target='_blank'>
                        New Year, New Beginnings: Creative Kidz
                      </LinkOverlay>
                    </Heading>
                    <Text>
                      Catch up on what’s been cookin’ at CREATIVE Kidz, equiping underserved kids with digital art tools via Nouns NFT auctions and T-Mobile.
                    </Text>
                  </LinkBox>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </p>
          <chakra.p paddingLeft={15.9}>
            <Button
              color="black.700"
              display="inline-flex"
              alignItems="center"
              fontSize="14px"
              px="0"
              my={4}
              fontWeight={700}
              _hover={{ color: cl }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                mobileNav.onClose()
                router.push('/discover')
              }}>
              Discover
            </Button>
          </chakra.p>
          <chakra.p paddingLeft={15.9}>
            <Button
              color="black.700"
              display="inline-flex"
              alignItems="center"
              fontSize="14px"
              px="0"
              my={4}
              fontWeight={700}
              _hover={{ color: cl }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                mobileNav.onClose()
                router.push('/events')
              }}>
              Events
            </Button>
          </chakra.p>
          <p>
            <Accordion allowToggle my={4}>
              <AccordionItem>
                <AccordionButton>
                  <Button
                    display="inline-flex"
                    alignItems="center"
                    fontSize="14px"
                    px="0"
                    fontWeight={700}
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}>
                    Community
                    <AccordionIcon display={{ base: 'none', sm: 'none', md: 'block' }} />
                  </Button>
                </AccordionButton>
                <AccordionPanel>
                  <Features />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </p>
          <chakra.p my={4}>
            {!isLoggedIn ? (
              <ConnectWallet
                welcomeScreen={{
                  title: "CREATIVE TV",
                  subtitle: "The Way Content Should Be",
                  img: {
                    src: "https://bafybeifvsvranpnmujrpcry6lqssxtyfdvqz64gty4vpkhvcncuqd5uimi.ipfs.w3s.link/logo-tv.gif",
                    width: 250,
                    height: 250,
                  },
                }}
                termsOfServiceUrl="https://creativeplatform.xyz/docs/legal/terms-conditions"
                privacyPolicyUrl="https://creativeplatform.xyz/docs/legal/privacy-policy"
                switchToActiveChain={true}
                modalSize={"wide"}
                theme={connector} 
                btnTitle={'Link Account'}
                modalTitle={'Login'}
                dropdownPosition={{
                  side: "bottom", // "top" | "bottom" | "left" | "right";
                  align: "end", // "start" | "center" | "end";
                }} 
              />
            ) : (
              <ButtonGroup>
              <ConnectWallet
                theme={connector}  
              />
              <Menu>
                <MenuButton mx={4} mb={2} as={Button} rightIcon={<ChevronDownIcon />} color={'#EC407A'}>
                  User Menu
                </MenuButton>
                {!subscribed ? (
                  <MenuList>
                    <MenuGroup title='Wallet Options'>
                      <MenuItem>
                        <BuyCrypto />
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='Creator Access'>
                      <VStack direction={'column'} spacing={2}>
                        <WertPurchaseNFT />
                        <Web3Button
                        contractAddress={LOCK_ADDRESS_MUMBAI_TESTNET.address} // Your smart contract address
                        action={async (contract) => {
                          await contract.call('purchase', [["1000000000000000000"], [address], [CREATIVE_ADDRESS], [CREATIVE_ADDRESS], ['0x']], { value: utils.parseEther("1.0")});
                        }} 
                        >
                          Buy with Crypto
                        </Web3Button>
                        </VStack>
                    </MenuGroup>
                  </MenuList>
                ) : (
                  <MenuList>
                    <MenuItem
                      icon={<MdOutlineAccountCircle />}
                      onClick={() => {
                        mobileNav.onClose()
                        router.push(`/profile/${address}`)
                      }}>
                      Profile
                    </MenuItem>
                    <MenuItem
                      icon={<RiVideoUploadFill />}
                      onClick={() => {
                        mobileNav.onClose()
                        router.push(`/profile/${address}/upload`)
                      }}>
                      Upload
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
              </ButtonGroup>
            )}
          </chakra.p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    )
  }
    
  return (
    <chakra.header
      className={styleName}
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition="box-shadow 0.2s"
      bg={cbg}
      borderBottom="6px solid"
      borderBottomColor="brand.400"
      w="full"
      overflow="hidden">
      <chakra.div h="84px" mx="auto" maxW="1770px" px="0.89rem">
        <Flex minWidth="max-content" h="full" alignItems="center" justifyContent="space-between">
          <Flex align="flex-start">
            <HStack p={2}>
              <Button
                bg={cbg}
                px="0px"
                color="black.900"
                display="inline-flex"
                alignItems="center"
                fontSize={{ base: '0.85rem', sm: '0.9rem', md: '16px' }}
                _hover={{ color: 'black' }}
                _focus={{ boxShadow: 'none', color: 'black.500' }}
                onClick={() => router.push('/')}>
                <Image src={SITE_LOGO} alt="Creative Logo" boxSize={'4rem'} objectFit="contain" />
                <Heading color={useColorModeValue('black.900', 'white')} as="h1" size="16px" fontWeight={900} gap={5}>
                  {SITE_NAME}
                </Heading>
              </Button>
            </HStack>
          </Flex>
          <Flex>
            <HStack spacing="1" gap={10} display={{ base: 'none', md: 'none', lg: 'flex' }}>
              <Popover>
                <PopoverTrigger>
                  <Button
                    color="black.700"
                    display="inline-flex"
                    alignItems="center"
                    px="0"
                    fontSize="14px"
                    fontWeight={700}
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                    rightIcon={<IoIosArrowDown />}>
                    Free Channels
                  </Button>
                </PopoverTrigger>
                <PopoverContent w="18vw" maxW="md" _focus={{ boxShadow: 'md' }} className="content-items">
                <LinkBox as='article' maxW='sm' p='4' borderWidth='1px' rounded='md'>
                    <Box as='time' dateTime='2023-11-09 15:30:00 +0000 UTC'>
                      Exclusive
                    </Box>
                    <Heading size='md' my='2'>
                      <LinkOverlay as={NextLink} href='https://kidz.creativeplatform.xyz' target='_blank'>
                        New Year, New Beginnings: Creative Kidz
                      </LinkOverlay>
                    </Heading>
                    <Text>
                      Catch up on what’s been cookin’ at CREATIVE Kidz, equiping underserved kids with digital art tools via Nouns NFT auctions and T-Mobile.
                    </Text>
                  </LinkBox>
                </PopoverContent>
              </Popover>
              <Button
                color="black.700"
                display="inline-flex"
                alignItems="center"
                fontSize="14px"
                px="0"
                fontWeight={700}
                _hover={{ color: cl }}
                _focus={{ boxShadow: 'none' }}
                onClick={() => {
                  router.push('/discover')
                }}>
                Discover
              </Button>
              <Button
                color="black.700"
                display="inline-flex"
                alignItems="center"
                fontSize="14px"
                px="0"
                fontWeight={700}
                _hover={{ color: cl }}
                _focus={{ boxShadow: 'none' }}
                onClick={() => router.push('https://vote.creativeplatform.xyz')}>
                Vote
              </Button>
              <Center height="50px">
                <Divider orientation="vertical" />
              </Center>
              <Popover>
                <PopoverTrigger>
                  <Button
                    display="inline-flex"
                    alignItems="center"
                    fontSize="14px"
                    px="0"
                    fontWeight={700}
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                    rightIcon={<IoIosArrowDown />}>
                    Community
                  </Button>
                </PopoverTrigger>
                <PopoverContent w="22vw" maxW="md" _focus={{ boxShadow: 'md' }}>
                  <Features />
                </PopoverContent>
              </Popover>
              <Center height="50px">
                <Divider orientation="vertical" />
              </Center>
              <ThemeSwitcher />
            </HStack>
          </Flex>
          <chakra.div display={{ base: 'none', md: 'none', lg: 'block' }}>
            {!address ? (
              <ConnectWallet
              welcomeScreen={{
                title: "CREATIVE TV",
                subtitle: "The Way Content Should Be",
                img: {
                  src: "https://bafybeifvsvranpnmujrpcry6lqssxtyfdvqz64gty4vpkhvcncuqd5uimi.ipfs.w3s.link/logo-tv.gif",
                  width: 250,
                  height: 250,
                },
              }}
              termsOfServiceUrl="https://creativeplatform.xyz/docs/legal/terms-conditions"
              privacyPolicyUrl="https://creativeplatform.xyz/docs/legal/privacy-policy"
              theme={connector} 
              btnTitle={'Link Account'}
              modalTitle={'Login'}
              switchToActiveChain={true}
              modalSize={"wide"}
              dropdownPosition={{
                side: "bottom", // "top" | "bottom" | "left" | "right";
                align: "end", // "start" | "center" | "end";
              }} 
              />
            ) : (
              <ButtonGroup>
              <ConnectWallet
                theme={connector} 
              />
              <Menu>
                <MenuButton mx={4} as={Button} rightIcon={<ChevronDownIcon />} color={'#EC407A'}>
                  User Menu
                </MenuButton>                
                  {!subscribed ? (
                    <MenuList>
                      <MenuGroup title='Wallet Options'>
                        <MenuItem>
                          <BuyCrypto />
                        </MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title='Creator Access'>
                        <VStack direction={'column'} spacing={2}>
                          <WertPurchaseNFT />
                          <Web3Button
                          contractAddress={LOCK_ADDRESS_MUMBAI_TESTNET.address} // Your smart contract address
                          action={async (contract) => {
                            await contract.call('purchase', [["1000000000000000000"], [address], [CREATIVE_ADDRESS], [CREATIVE_ADDRESS], ['0x']], { value: utils.parseEther("1.0")});
                          }} 
                          >
                            Buy with Crypto
                          </Web3Button>
                        </VStack>
                      </MenuGroup>
                    </MenuList>
                  ) : (
                    <MenuList>
                        <MenuItem
                          icon={<MdOutlineAccountCircle />}
                          onClick={() => {
                            router.push(`/profile/${address}`)
                          }}>
                          Profile
                        </MenuItem>
                        <MenuItem
                          icon={<RiVideoUploadFill />}
                          onClick={() => {
                            router.push(`/profile/${address}/upload`)
                          }}>
                          Upload
                        </MenuItem>
                      </MenuList>
                  )}
              </Menu>
              </ButtonGroup>
            )}
          </chakra.div>
          <Flex gap="1.2rem" display={{ base: 'flex', md: 'flex', lg: 'none' }}>
            <Center>
              <ThemeSwitcher />
            </Center>
            <IconButton
              variant="outline"
              aria-label="Open menu"
              fontSize="20px"
              colorScheme="white"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
          </Flex>
        </Flex>
        {<MobileNavContent />}
      </chakra.div>
    </chakra.header>
  )
}