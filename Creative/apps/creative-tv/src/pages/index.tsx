import { Head } from 'components/layout/Head'
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
