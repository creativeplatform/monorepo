import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
  useColorModeValue,
  Heading,
  Box,
  useToast,
  useDisclosure,
  VStack,
  HStack,
  Button,
  CloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  chakra,
  LinkBox,
  LinkOverlay,
  Text,
  SimpleGrid,
  Stack,
  Center,
  Divider,
  Image,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  DrawerHeader,
} from '@chakra-ui/react'
import truncateEthAddress from 'truncate-eth-address'
import { ChevronDownIcon, WarningIcon } from '@chakra-ui/icons'
import { RiVideoUploadFill } from 'react-icons/ri'
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { useScroll } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineMenu, AiOutlineDisconnect } from 'react-icons/ai'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { ThemeSwitcher } from './ThemeSwitcher'
import { ConnectWallet, useAddress, useContract, useContractRead, useContractWrite, useDisconnect, useSDK, useSigner } from '@thirdweb-dev/react'
import { SITE_NAME, CREATIVE_ADDRESS, SITE_LOGO, FREE_LOCK_ADDRESS_GOERLI_TESTNET } from 'utils/config'
import { PFP } from 'utils/context'

interface Props {
  className?: string
  icon?: string
  title?: string
  children?: React.ReactNode
}

export function Header({ className }: Props) {
  const styleName = className ?? ''
  const [navIsOpen, setNavIsOpen] = useState(false)
  const ref = useRef(null)
  const router = useRouter()
  const toast = useToast()
  const sdk = useSDK()
  const signer = useSigner()

  const handleNavClick = (url: string, disabled: boolean, isNewTab: boolean, isPlugin: boolean) => {
    if (disabled) {
      return
    }

    if (isNewTab) {
      window.open(url, '_blank')
      if (isPlugin) {
        handleOpenUnlock()
      } else {
        router.push(url)
        setNavIsOpen(false)
      }
    }
  }

  const handleOpenUnlock = () => {
    window?.unlockProtocol && window?.unlockProtocol.loadCheckoutModal()
    setNavIsOpen(false)
  }

  // Currently connected wallet address
  const address = useAddress()
  const [content, setContent] = useState<string | undefined>('')
  const disconnect = useDisconnect()

  // Get the Lock contract we deployed
  const { contract } = useContract(FREE_LOCK_ADDRESS_GOERLI_TESTNET.address)

  // Get the Membership Price
  const { data: price, isLoading: priceLoading } = useContractRead(contract, 'keyPrice')

  /*******  CONTRACT READING ********/
  // Determine whether the connected wallet address has a valid subscription
  const { data: subscribed } = useContractRead(contract, 'getHasValidKey', [address])

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

  const MobileNavContent = (
    <Drawer isOpen={mobileNav.isOpen} placement="right" onClose={mobileNav.onClose} size={{ base: 'full', sm: 'full', md: 'xs' }}>
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
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Button
                    bg={bg}
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
              onClick={() => router.push('/discover')}>
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
              onClick={() => router.push('')}>
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
                    <AccordionIcon />
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
              <ConnectWallet btnTitle={'Sign In'} />
            ) : (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={'#EC407A'}>
                  <Avatar name="creative" src={PFP} />
                </MenuButton>
                {!subscribed ? (
                  <MenuList>
                    <MenuItem icon={<HiOutlineClipboardCopy />} onClick={() => handleCopyAddress()}>
                      {truncateEthAddress(`${address}`)}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<WarningIcon />} onClick={() => handleOpenUnlock()}>
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
                    <MenuItem icon={<HiOutlineClipboardCopy />} onClick={() => handleCopyAddress()}>
                      {truncateEthAddress(address)}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<MdOutlineAccountCircle />} onClick={() => router.push(`/profile/${address}`)}>
                      Profile
                    </MenuItem>
                    <MenuItem icon={<RiVideoUploadFill />} onClick={() => router.push(`/profile/${address}/upload`)}>
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
            )}
          </chakra.p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
  return (
    <>
      <chakra.header
        className={styleName}
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderBottom="6px solid"
        borderBottomColor="brand.400"
        w="full"
        overflowY="hidden">
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
                  fontSize={{ base: '0.85rem', sm: '0.9', md: '16px' }}
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
                  onClick={() => router.push('/discover')}>
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
                <ConnectWallet btnTitle={'Sign In'} />
              ) : (
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={'#EC407A'}>
                    <Avatar name="creative" src={PFP} />
                  </MenuButton>
                  {!subscribed ? (
                    <MenuList>
                      <MenuItem icon={<HiOutlineClipboardCopy />} onClick={() => handleCopyAddress()}>
                        {truncateEthAddress(`${address}`)}
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem icon={<WarningIcon />} onClick={() => handleOpenUnlock()}>
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
                      <MenuItem icon={<HiOutlineClipboardCopy />} onClick={() => handleCopyAddress()}>
                        {truncateEthAddress(address)}
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem icon={<MdOutlineAccountCircle />} onClick={() => router.push(`/profile/${address}`)}>Profile</MenuItem>
                      <MenuItem icon={<RiVideoUploadFill />} onClick={() => router.push(`/profile/${address}/upload`)}>Upload</MenuItem>
                      <MenuItem icon={<RiVideoUploadFill />} onClick={() => router.push(`/profile/${address}/transfer`)}>Xfer</MenuItem>
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
              )}
            </chakra.div>
            <IconButton
              display={{ base: 'flex', md: 'flex', lg: 'none' }}
              variant="outline"
              aria-label="Open menu"
              fontSize="20px"
              colorScheme="white"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </>
  )
}
