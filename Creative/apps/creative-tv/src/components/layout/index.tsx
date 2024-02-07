import { Box, Center, Container, Spinner } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import Footer from './Footer'
import { Header } from './Header'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoadingProcess = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 900)
  }

  return (
    <Box margin="0 auto" minH="100vh" overflow="hidden">
      <Header handleLoading={handleLoadingProcess} />
      {loading ? (
        <Center marginTop="4rem">
          <Spinner size="xl" thickness="4px" />
        </Center>
      ) : (
        <>
          <Container maxW="container.lg">{props.children}</Container>
          <Footer />
        </>
      )}
    </Box>
  )
}
