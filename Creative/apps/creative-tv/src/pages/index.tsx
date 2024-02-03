import Featured from 'components/Featured'
import HeroSection from 'components/HeroSection'
import { Head } from 'components/layout/Head'
import type { NextPage } from 'next'
import Carousel from '../components/Carousel'

const Home: NextPage = () => {
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

export default Home
