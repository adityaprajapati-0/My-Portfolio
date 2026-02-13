import React from 'react'
import SpaceBackground from './components/SpaceBackground'
import Hero from './components/Hero'
import ScrollBundles from './components/ScrollBundles'
import About from './components/About'
import TechIcons from './components/TechIcons'
import Services from './components/Services'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import FadeInSection from './components/FadeInSection'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'

import { ReactLenis } from '@studio-freight/react-lenis'

function App() {
  return (
    <ReactLenis root>
      <SpaceBackground />
      <main>
        <Hero />
        <FadeInSection><ScrollBundles /></FadeInSection>
        <FadeInSection><About /></FadeInSection>
        <FadeInSection><TechIcons /></FadeInSection>
        <FadeInSection><Services /></FadeInSection>
        <FadeInSection><Reviews /></FadeInSection>
        <Projects />
        <FadeInSection><Certificates /></FadeInSection>
        <FadeInSection><Contact /></FadeInSection>
        <Footer />
      </main>
      <Chatbot />
    </ReactLenis>
  )
}

export default App
