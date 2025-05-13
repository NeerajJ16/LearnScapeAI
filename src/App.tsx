import { useState } from "react"
import { About } from "./components/About"
import { Cta } from "./components/Cta"
import { FAQ } from "./components/FAQ"
import { Footer } from "./components/Footer"
import { Hero } from "./components/Hero"
import { HowItWorks } from "./components/HowItWorks"
import { Navbar } from "./components/Navbar"
import { ScrollToTop } from "./components/ScrollToTop"
import { Services } from "./components/Services"
import AuthModal from "./components/AuthModal"
import "./App.css"

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <Navbar openAuthModal={openAuthModal} />
      <Hero />
      <About />
      <HowItWorks />
      <Services />
      <Cta openAuthModal={openAuthModal} />
      <FAQ />
      <Footer />
      <ScrollToTop />

      <AuthModal
        isOpen={isAuthModalOpen}
        mode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSwitchMode={setAuthMode}
      />
    </>
  )
}

export default App
