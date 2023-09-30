import { Head } from 'components/layout/Head'
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
