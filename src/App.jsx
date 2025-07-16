import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import './App.css'

// Import section components
import AboutMeWithSolarSystem from './components/AboutMeWithSolarSystem'
import WorkHistory from './components/WorkHistory'
import Education from './components/Education'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'

const sections = [
  { id: 'about', title: 'Zero Gravity Bio Core', component: AboutMeWithSolarSystem },
  { id: 'work', title: 'Cyberpunk Memory Vault', component: WorkHistory },
  { id: 'education', title: 'Floating Time Temple', component: Education },
  { id: 'projects', title: 'Developer Dockyard', component: Projects },
  { id: 'skills', title: 'Constellation Map', component: Skills },
  { id: 'contact', title: 'Satellite Uplink Console', component: Contact }
]

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (index) => {
    if (index === currentSection) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSection(index)
      setIsTransitioning(false)
    }, 500)
  }

  const CurrentComponent = sections[currentSection].component

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="cosmic-portfolio">
      {/* Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {/* Animated background elements will be added here */}
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation 
        sections={sections}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="min-h-screen"
            >
              <CurrentComponent />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transition Effect */}
        {isTransitioning && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed inset-0 z-50 bg-black rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 0%, black 70%)'
            }}
          />
        )}
      </main>

      {/* Cosmic Particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App

