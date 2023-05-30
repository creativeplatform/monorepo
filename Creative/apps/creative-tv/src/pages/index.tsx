import { Head } from 'components/layout/Head'
import { LinkComponent } from 'components/layout/LinkComponent'
import HeroSection from 'components/HeroSection'
import Featured from 'components/Featured'
import Carousel from '../components/Carousel'

export default function Home() {
  return (
    <>
      <Head />

      <main>
        <HeroSection />
        <Featured />
        <Carousel />
      </main>
    </>
  )
}
