import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import WertWidget from '@wert-io/widget-initializer';
import { Goerli } from '@thirdweb-dev/chains'
import { ConnectWallet, useAddress, useContract, useContractRead, useDisconnect, useSigner } from '@thirdweb-dev/react'
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
import { Paywall } from '@unlock-protocol/paywall'
import networks from '@unlock-protocol/networks'
import { useScroll } from 'framer-motion'
import { ChevronDownIcon, WarningIcon } from '@chakra-ui/icons'
import { AiOutlineDisconnect, AiOutlineMenu } from 'react-icons/ai'
import usePurchaseNFT from 'hooks/usePurchaseNFT'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { RiVideoUploadFill } from 'react-icons/ri'
import truncateEthAddress from 'truncate-eth-address'
import { PFP } from 'utils/context'
import { FREE_LOCK_ADDRESS_GOERLI_TESTNET, SITE_LOGO, SITE_NAME, WERT_PRIVATE_KEY, WERT_PARTNER_ID } from '../../utils/config'
import { ThemeSwitcher } from './ThemeSwitcher'
import { creatorPaywallConfig } from 'utils/checkoutConfig'



interface Props {
  className?: string
  icon?: string
  title?: string
  children?: React.ReactNode
  handleLoading?: () => void
}

export function Header({ className, handleLoading }: Props) {
  const styleName = className ?? ''
  const [navIsOpen, setNavIsOpen] = useState(false)
  const ref = useRef(null)
  const router = useRouter()
  const toast = useToast()
  const address = useAddress() || ''

  // WERT SIGNER HELPER
  const signedData = signSmartContractData({
    address: address,
    commodity: "TTG",
    network: "goerli",
    commodity_amount: 1,
    sc_address: "0xc9bdfa5f177961d96f137c42241e8ecbca605781",
    sc_input_data: "0x",
  }, `${WERT_PRIVATE_KEY}`);

  const wertOptions = {
    partner_id: "01FGKYK638SV618KZHAVEY7P79",
    origin: "https://sandbox.wert.io",
    lang: 'en',
    commodity: "TTG",
    sc_address: "0xc9bdfa5f177961d96f137c42241e8ecbca605781",
    sc_input_data: "0x",
    signature: signedData,


  }

  const wertWidget = new WertWidget({
    ...signedData,
    ...wertOptions,
});

  const connector = useColorModeValue('light', 'dark')

  const [creatorPaywallConfig, setCreatorPaywallConfig] = useState(null);

  const handleButtonClick = () => {
    if (handleLoading) {
      handleLoading()
    }
  }

  const paywall = new Paywall(networks) 
    
  function handleCreatorCheckout() {
      paywall.loadCheckoutModal(creatorPaywallConfig)
  }

  const { purchaseNFT } = usePurchaseNFT()

  // Currently connected wallet address
  
  console.log(address, 'addy')
  const [content, setContent] = useState<string | undefined>('')
  const disconnect = useDisconnect()
  const lockAbi = [{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  // Get the Lock contract we deployed
  const { contract, isLoading, error } = useContract('0xC9bdfA5f177961D96F137C42241e8EcBCa605781', lockAbi)
  // Get the Membership Price
  const { data: price, isLoading: priceLoading } = useContractRead(contract, 'keyPrice')

  /*******  CONTRACT READING ********/
  // Determine whether the connected wallet address has a valid subscription
  const { data: subscribed } = useContractRead(contract, 'getHasValidKey', [address])

  console.log('isSubcribed: ', subscribed)

  // Native Token
  // const { data: tokenBalance, isLoading: tokenLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address ?? '')
    // Optionally, you can show a success message or perform any other actions
    console.log('Address copied:', address)
    toast({
      title: 'Address Copied',
      description: 'Successfully Copied ' + truncateEthAddress(`${address}`),
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  // Configure networks to use
  // You can also use @unlock-protocol/networks for convenience...

  // Pass a provider. You can also use a provider from a library such as Magic.link or privy.io
  // If no provider is set, the library uses window.ethereum

  // Loads the checkout UI
  const handlePaywallCheckout = async () => {
    const provider = 'goerli.rpc.thirdweb.com'

    const paywall = new Paywall()
    paywall.connect(provider) // provider from Thirdweb
    paywall.loadCheckoutModal({
      locks: {
        [FREE_LOCK_ADDRESS_GOERLI_TESTNET.address]: {
          network: Goerli,
        },
      },
      pessimistic: true,
      recipient: address, // from new SmartWallet(config);
    })

    try {
      const response = await paywall.loadCheckoutModal()
      // Handle the response from the paywall modal
      console.log(response)
      toast({
        title: 'Welcome Creative',
        description: 'Successfully Subscribed 🎉',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      // Handle any errors that occur during the checkout process
      console.error(error)
      toast({
        title: 'Error',
        description: `${error}`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const [y, setY] = useState(0)
  const { scrollY } = useScroll()
  const mobileNav = useDisclosure()
  const bg = useColorModeValue('#F0F0F0', 'gray.900')
  const cl = useColorModeValue('gray.800', 'white')

  useEffect(() => {
    function updateScrollY() {
      setY(scrollY.get())
    }
    const unsubscribeY = scrollY.on('change', updateScrollY)
    return unsubscribeY
  }, [scrollY])

  const { height } = ref.current ? ref.current : { height: 0 }

  const Section = ({ icon, title, children }: Props) => {
    const ic = useColorModeValue('brand.600', 'brand.200')
    const hbg = useColorModeValue('gray.100', 'brand.400')
    const tcl = useColorModeValue('gray.900', 'brand.100')
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
    const hbg = useColorModeValue('gray.50', 'brand.400')
    const hbgh = useColorModeValue('gray.400', 'pink.800')
    const tcl = useColorModeValue('gray.900', 'gray.50')
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
                  <Button
                    bg={bg}
                    color="black.700"
                    px="2"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="14px"
                    fontWeight={700}
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                    onClick={() => {
                      mobileNav.onClose()
                      router.push('https://kidz.creativeplatform.xyz')
                    }}>
                    CREATIVE Kidz ⌐◨-◨
                  </Button>
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
                handleButtonClick()
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
                handleButtonClick()
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
                    color="black.700"
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
            {!address ? (
              <ConnectWallet
                welcomeScreen={{
                  title: "Creative TV",
                  subtitle: "The Way Content Should Be",
                  img: {
                    src: "https://bafkreiehm3yedt4cmtckelgfwqtgfvp6bolvk5nx2esle4tnwe7mi5q43q.ipfs.nftstorage.link/",
                    width: 300,
                    height: 50,
                  },
                }}
                theme={connector} 
                btnTitle={'Link Account'}
                modalTitle={'Login'}
                dropdownPosition={{
                  side: "bottom", // "top" | "bottom" | "left" | "right";
                  align: "end", // "start" | "center" | "end";
                }} 
              />
            ) : (
              <>
              <ConnectWallet
                theme={connector}  
              />
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={'#EC407A'}>
                  <Avatar mb={6} size={'md'} name="creative" src={PFP} />
                </MenuButton>
                {!subscribed ? (
                  <MenuList>
                    <MenuItem icon={<WarningIcon />} onClick={() => wertWidget.mount()}>
                      Subscribe for ${price?.toString()}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      icon={<AiOutlineDisconnect />}
                      onClick={() => {
                        disconnect()
                        router.push('/')
                        toast({
                          title: 'Sign Out',
                          description: 'Successfully signed out.',
                          status: 'info',
                          duration: 5000,
                          isClosable: true,
                        })
                      }}>
                      Sign Out
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList>
                    <MenuItem
                      icon={<MdOutlineAccountCircle />}
                      onClick={() => {
                        handleButtonClick()
                        mobileNav.onClose()
                        router.push(`/profile/${address}`)
                      }}>
                      Profile
                    </MenuItem>
                    <MenuItem
                      icon={<RiVideoUploadFill />}
                      onClick={() => {
                        handleButtonClick()
                        mobileNav.onClose()
                        router.push(`/profile/${address}/upload`)
                      }}>
                      Upload
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      icon={<AiOutlineDisconnect />}
                      onClick={() => {
                        disconnect()
                        router.push('/')
                        toast({
                          title: 'Sign Out',
                          description: 'Successfully signed out.',
                          status: 'info',
                          duration: 5000,
                          isClosable: true,
                        })
                      }}>
                      Sign Out
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
              </>
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
      bg={bg}
      borderBottom="6px solid"
      borderBottomColor="brand.400"
      w="full"
      overflow="hidden">
      <chakra.div h="84px" mx="auto" maxW="1770px" px="0.89rem">
        <Flex minWidth="max-content" h="full" alignItems="center" justifyContent="space-between">
          <Flex align="flex-start">
            <HStack p={2}>
              <Button
                bg={bg}
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
                  <Button
                    color="black.700"
                    px="0"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="14px"
                    fontWeight={700}
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                    onClick={() => router.push('https://kidz.creativeplatform.xyz')}>
                    CREATIVE Kidz ⌐◨-◨
                  </Button>
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
                  handleButtonClick()
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
                    color="black.700"
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
                theme={connector} 
                btnTitle={'Link Account'}
                modalTitle={'Login'}
              />
            ) : (
              <>
              <ConnectWallet
                theme={connector} 
                dropdownPosition={{
                  side: "bottom", // "top" | "bottom" | "left" | "right";
                  align: "end", // "start" | "center" | "end";
                }}
              />
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={'#EC407A'}>
                  <Avatar mb={6} size={'lg'} name="creative" src={PFP} />
                </MenuButton>

                <MenuList>
                  {!subscribed ? (
                    <>
                      <MenuItem icon={<WarningIcon />} onClick={() => wertWidget.mount()}>
                        Subscribe for ${price?.toString()}
                      </MenuItem>
                      <MenuDivider />
                    </>
                  ) : (
                    <>
                      <MenuItem
                        icon={<MdOutlineAccountCircle />}
                        onClick={() => {
                          handleButtonClick()
                          router.push(`/profile/${address}`)
                        }}>
                        Profile
                      </MenuItem>
                      <MenuItem
                        icon={<RiVideoUploadFill />}
                        onClick={() => {
                          handleButtonClick()
                          router.push(`/profile/${address}/upload`)
                        }}>
                        Upload
                      </MenuItem>
                      <MenuDivider />
                    </>
                  )}
                  <MenuItem
                    icon={<AiOutlineDisconnect />}
                    onClick={() => {
                      disconnect()
                      router.push('/')
                      toast({
                        title: 'Sign Out',
                        description: 'Successfully signed out.',
                        status: 'info',
                        duration: 5000,
                        isClosable: true,
                      })
                    }}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
              </>
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