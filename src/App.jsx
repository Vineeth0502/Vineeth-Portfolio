import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (index) => {
    if (index !== currentSection) {
      setCurrentSection(index)
    }
  }

  const CurrentComponent = sections[currentSection].component

  if (isLoading) return <LoadingScreen />

  return (
    <div>
      <div className="cosmic-portfolio">
        {/* Background Canvas */}
        <div className="fixed inset-0 z-0">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              {/* Add 3D elements here */}
            </Canvas>
          </Suspense>
        </div>

        {/* Navigation */}
        <Navigation 
          sections={sections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />

        {/* Main Content - Instant switching, no transition */}
        <main className="relative z-10 min-h-screen">
          <div className="min-h-screen">
            <CurrentComponent />
          </div>
        </main>

        {/* Cosmic Particles */}
        <div className="fixed inset-0 pointer-events-none z-5">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-float ${2 + Math.random() * 3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
