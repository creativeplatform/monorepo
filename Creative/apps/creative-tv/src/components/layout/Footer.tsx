import { Box, Container, Flex, Image, Link, SimpleGrid, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { SOCIAL_DISCORD, SOCIAL_EMAIL, SOCIAL_GITHUB, SOCIAL_LENS, SOCIAL_LINKEDIN, SOCIAL_TWITTER, SITE_COPYRIGHT } from 'utils/config'
import { CREATIVE_ICON, FOOTER_LINKS } from 'utils/context'

interface Props {
  className?: string
}

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export default function Footer(props: Props): JSX.Element {
  const className = props.className ?? ''
  return (
    <Box className={className} bg={useColorModeValue('gray.50', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link href={FOOTER_LINKS.whitepaper} target={'_blank'}>
              Overview
            </Link>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Link href={FOOTER_LINKS.releases}>Features</Link>
              <Tag size={'sm'} bg={useColorModeValue('green.300', 'green.800')} ml={2} color={'white'}>
                New
              </Tag>
            </Stack>
            <Link href={FOOTER_LINKS.tutorial} target={'_blank'}>
              Tutorials
            </Link>
            <Link href={FOOTER_LINKS.pricing} target={'_blank'}>
              Pricing
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={FOOTER_LINKS.about_us} target={'_blank'}>
              About Us
            </Link>
            <Link href={FOOTER_LINKS.blog} target={'_blank'}>
              Blog
            </Link>
            <Link href={SOCIAL_LINKEDIN} target={'_blank'}>
              Careers
            </Link>
            <Link href={SOCIAL_EMAIL} target={'_blank'}>
              Contact Us
            </Link>
            <Link href={'#'}>Partners</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={FOOTER_LINKS.cookie_policy} target={'_blank'}>Cookies Policy</Link>
            <Link href={FOOTER_LINKS.privacy_policy} target={'_blank'}>Privacy Policy</Link>
            <Link href={FOOTER_LINKS.terms_and_conditions} target={'_blank'}>Terms of Service</Link>
            <Link href={FOOTER_LINKS.status} target={'_blank'}>Status</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={SOCIAL_LENS} target={'_blank'}>
              Lens
            </Link>
            <Link href={SOCIAL_TWITTER} target={'_blank'}>
              Twitter
            </Link>
            <Link href={SOCIAL_GITHUB} target={'_blank'}>
              Github
            </Link>
            <Link href={SOCIAL_DISCORD} target={'_blank'}>
              Discord
            </Link>
            <Link href={SOCIAL_LINKEDIN} target={'_blank'}>
              LinkedIn
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Image src={CREATIVE_ICON} alt="Creative Logo" width={250} height={'auto'} boxSize="100px" objectFit="contain" />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          {SITE_COPYRIGHT}
        </Text>
      </Box>
    </Box>
  )
}
