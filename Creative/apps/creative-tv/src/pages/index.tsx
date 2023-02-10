import { Heading, ListItem, UnorderedList } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { LinkComponent } from 'components/layout/LinkComponent'
import HeroSection from 'components/HeroSection'
import Featured from 'components/Featured'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <HeroSection />
        <Featured />
      </main>
    </>
  )
}
