import Header from '@/components/site/Header'
import Hero from '@/components/site/Hero'
import Features from '@/components/site/Features'
import Roles from '@/components/site/Roles'
import Scenarios from '@/components/site/Scenarios'
import Process from '@/components/site/Process'
import Effects from '@/components/site/Effects'
import Security from '@/components/site/Security'
import Architecture from '@/components/site/Architecture'
import Contact from '@/components/site/Contact'
import Footer from '@/components/site/Footer'
import ChatWidget from '@/components/site/ChatWidget'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Roles />
        <Scenarios />
        <Process />
        <Effects />
        <Security />
        <Architecture />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
