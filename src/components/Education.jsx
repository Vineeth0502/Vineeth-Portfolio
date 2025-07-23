import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Float, Stars, Sphere, Ring, OrbitControls, useTexture } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import { TextureLoader, Vector3, MeshStandardMaterial } from 'three'

// Global state manager for Earth animation persistence
class EarthStateManager {
  constructor() {
    this.storageKey = 'earthAnimationState'
    this.state = this.loadState()
    this.startTime = Date.now()
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Calculate elapsed time since last save
        const now = Date.now()
        const elapsed = (now - parsed.timestamp) / 1000
        return {
          earthRotationY: (parsed.earthRotationY + elapsed * 0.005) % (Math.PI * 2),
          cloudsRotationY: (parsed.cloudsRotationY + elapsed * 0.007) % (Math.PI * 2),
          atmosphereRotationY: (parsed.atmosphereRotationY + elapsed * 0.003) % (Math.PI * 2),
          particleRotationY: (parsed.particleRotationY + elapsed * 0.001) % (Math.PI * 2),
          ring1RotationZ: (parsed.ring1RotationZ + elapsed * 0.01) % (Math.PI * 2),
          ring2RotationZ: (parsed.ring2RotationZ - elapsed * 0.008) % (Math.PI * 2),
          ring3RotationZ: (parsed.ring3RotationZ + elapsed * 0.012) % (Math.PI * 2),
          timestamp: now
        }
      }
    } catch (error) {
      console.warn('Failed to load Earth state:', error)
    }
    
    return {
      earthRotationY: 0,
      cloudsRotationY: 0,
      atmosphereRotationY: 0,
      particleRotationY: 0,
      ring1RotationZ: 0,
      ring2RotationZ: 0,
      ring3RotationZ: 0,
      timestamp: Date.now()
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state))
    } catch (error) {
      console.warn('Failed to save Earth state:', error)
    }
  }

  updateState(updates) {
    this.state = { ...this.state, ...updates, timestamp: Date.now() }
    this.saveState()
  }

  getElapsedTime() {
    return (Date.now() - this.startTime) / 1000
  }
}

// Create global instance
const earthStateManager = new EarthStateManager()

// Luminous Shimmer Swirling Particles Effect Component
const LuminousShimmerParticles = ({ position = [0, 0], size = 200, intensity = 1 }) => {
  const containerRef = useRef()
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      angle: (i / 80) * Math.PI * 2,
      radius: 50 + Math.random() * 100,
      speed: 0.02 + Math.random() * 0.03,
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.7,
      sparkIntensity: Math.random(),
      color: Math.random() > 0.5 ? '#00ff88' : '#0088ff',
      shimmerPhase: Math.random() * Math.PI * 2
    }))
    setParticles(initialParticles)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{
        left: position[0],
        top: position[1],
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Main swirling particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            filter: 'blur(0.5px)'
          }}
          animate={{
            x: [
              Math.cos(particle.angle) * particle.radius,
              Math.cos(particle.angle + Math.PI * 2) * particle.radius
            ],
            y: [
              Math.sin(particle.angle) * particle.radius,
              Math.sin(particle.angle + Math.PI * 2) * particle.radius
            ],
            opacity: [
              particle.opacity * 0.3,
              particle.opacity,
              particle.opacity * 0.3
            ],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 8 + particle.sparkIntensity * 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Flying sparks */}
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute rounded-full"
          style={{
            width: '1px',
            height: '1px',
            background: i % 2 === 0 ? '#44ddff' : '#00ffaa',
            boxShadow: `0 0 8px ${i % 2 === 0 ? '#44ddff' : '#00ffaa'}`
          }}
          animate={{
            x: [
              Math.cos(i * 0.157) * 30,
              Math.cos(i * 0.157 + Math.PI * 4) * 150,
              Math.cos(i * 0.157 + Math.PI * 8) * 30
            ],
            y: [
              Math.sin(i * 0.157) * 30,
              Math.sin(i * 0.157 + Math.PI * 4) * 150,
              Math.sin(i * 0.157 + Math.PI * 8) * 30
            ],
            opacity: [0, 1, 0],
            scale: [0, 2, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Central shimmer core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '20px',
          height: '20px',
          background: 'radial-gradient(circle, rgba(0,255,136,0.8), rgba(0,136,255,0.4), transparent)',
          borderRadius: '50%',
          filter: 'blur(2px)'
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 1, 0.5],
          rotate: 360
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

// Enhanced Earth Loading Screen with Waves Theme
const WavesEarthLoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f766e 50%, #1e293b 75%, #0f172a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      {/* Wave Animation */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, #0f766e, transparent)',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 0 80%)'
        }}
        animate={{
          clipPath: [
            'polygon(0 100%, 100% 100%, 100% 60%, 0 80%)',
            'polygon(0 100%, 100% 100%, 100% 80%, 0 60%)',
            'polygon(0 100%, 100% 100%, 100% 60%, 0 80%)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating Earth with Wave Particles */}
      <motion.div
        style={{
          position: 'relative',
          width: '150px',
          height: '150px',
          marginBottom: '2rem'
        }}
      >
        {/* Earth Core */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #3b82f6, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.8), 0 0 80px rgba(16, 185, 129, 0.4)'
          }}
        >
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #065f46, #047857, #059669)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ocean waves simulation */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                width: '100%',
                height: '100%',
                background: `
                  radial-gradient(circle at 30% 40%, #047857 20%, transparent 25%),
                  radial-gradient(circle at 70% 60%, #065f46 15%, transparent 20%),
                  radial-gradient(circle at 50% 20%, #059669 10%, transparent 15%)
                `,
                borderRadius: '50%'
              }}
            />
          </div>
        </motion.div>

        {/* Wave Particles around Earth */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              rotate: { duration: 6 + i * 0.2, repeat: Infinity, ease: "linear" },
              scale: { duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '4px',
              background: '#10b981',
              borderRadius: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 18}deg) translateY(-${60 + Math.random() * 30}px)`,
              boxShadow: '0 0 10px #10b981'
            }}
          />
        ))}

        {/* Add Luminous Shimmer Particles to Loading Screen */}
        <LuminousShimmerParticles position={[75, 75]} size={300} intensity={1.5} />
      </motion.div>
      
      <motion.h1
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          color: '#10b981',
          fontSize: '1.8rem',
          fontFamily: 'Orbitron, monospace',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '0.8rem',
          letterSpacing: '0.1em',
          textShadow: '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4)'
        }}
      >
        WAVES EARTH LOADING
      </motion.h1>
      
      <motion.p
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{
          color: '#06b6d4',
          fontSize: '1rem',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(6, 182, 212, 0.6)'
        }}
      >
        Initializing wave environment...
      </motion.p>
    </motion.div>
  )
}

// Enhanced Earth Component with Persistent State
const WaveEarth = ({ position = [0, 0, 0] }) => {
  const earthRef = useRef()
  const atmosphereRef = useRef()
  const cloudsRef = useRef()
  const particleGroupRef = useRef()
  
  // Load Earth textures
  const earthTexture = useLoader(TextureLoader, '/assets/images/earth.jpg')
  const earthNormal = useLoader(TextureLoader, '/assets/images/earth-normal.jpg')
  const earthSpecular = useLoader(TextureLoader, '/assets/images/earth-specular.jpg')
  const cloudsTexture = useLoader(TextureLoader, '/assets/images/earth-clouds.jpg')

  // Initialize with saved state
  useEffect(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y = earthStateManager.state.earthRotationY
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = earthStateManager.state.cloudsRotationY
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = earthStateManager.state.atmosphereRotationY
    }
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = earthStateManager.state.particleRotationY
    }
  }, [])

  useFrame((state) => {
    const elapsedTime = earthStateManager.getElapsedTime()
    
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005
      earthRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.3
      
      // Update state manager
      earthStateManager.updateState({
        earthRotationY: earthRef.current.rotation.y
      })
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.007
      earthStateManager.updateState({
        cloudsRotationY: cloudsRef.current.rotation.y
      })
    }
    
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.003
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.02
      atmosphereRef.current.scale.setScalar(scale)
      
      earthStateManager.updateState({
        atmosphereRotationY: atmosphereRef.current.rotation.y
      })
    }
    
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y += 0.001
      particleGroupRef.current.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1
      
      earthStateManager.updateState({
        particleRotationY: particleGroupRef.current.rotation.y
      })
    }
  })

  return (
    <group position={position}>
      {/* Earth Core */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <meshPhysicalMaterial
          map={earthTexture}
          normalMap={earthNormal}
          roughnessMap={earthSpecular}
          roughness={0.7}
          metalness={0.1}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.52, 64, 64]} />
        <meshBasicMaterial
          map={cloudsTexture}
          transparent
          opacity={0.4}
          alphaTest={0.1}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent
          opacity={0.15}
          side={2}
        />
      </mesh>

      {/* Wave Particle Field */}
      <group ref={particleGroupRef}>
        {[...Array(100)].map((_, i) => {
          const radius = 3.5 + Math.random() * 2
          const theta = Math.random() * Math.PI * 2
          const phi = Math.random() * Math.PI
          const x = radius * Math.sin(phi) * Math.cos(theta)
          const y = radius * Math.sin(phi) * Math.sin(theta)
          const z = radius * Math.cos(phi)
          
          return (
            <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.5}>
              <mesh position={[x, y, z]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial
                  color="#00ffaa"
                  transparent
                  opacity={0.6 + Math.random() * 0.4}
                />
              </mesh>
            </Float>
          )
        })}
      </group>
    </group>
  )
}

// Orbital Ring System with Persistent State
const OrbitalRings = () => {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  // Initialize with saved state
  useEffect(() => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = earthStateManager.state.ring1RotationZ
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = earthStateManager.state.ring2RotationZ
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = earthStateManager.state.ring3RotationZ
    }
  }, [])

  useFrame((state) => {
    const elapsedTime = earthStateManager.getElapsedTime()
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.01
      ring1Ref.current.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1
      
      earthStateManager.updateState({
        ring1RotationZ: ring1Ref.current.rotation.z
      })
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.008
      ring2Ref.current.rotation.y += 0.005
      
      earthStateManager.updateState({
        ring2RotationZ: ring2Ref.current.rotation.z
      })
    }
    
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += 0.012
      ring3Ref.current.rotation.x = Math.cos(elapsedTime * 0.3) * 0.15
      
      earthStateManager.updateState({
        ring3RotationZ: ring3Ref.current.rotation.z
      })
    }
  })

  return (
    <group>
      {/* Inner Ring */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[4, 4.2, 64]} />
        <meshBasicMaterial
          color="#00ffaa"
          transparent
          opacity={0.6}
          side={2}
        />
      </mesh>

      {/* Middle Ring */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[5.5, 5.8, 64]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.4}
          side={2}
        />
      </mesh>

      {/* Outer Ring */}
      <mesh ref={ring3Ref}>
        <ringGeometry args={[7, 7.5, 64]} />
        <meshBasicMaterial
          color="#44ddff"
          transparent
          opacity={0.3}
          side={2}
        />
      </mesh>
    </group>
  )
}

// Main 3D Scene (No Revolving Objects)
const WaveEarthScene = () => {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffaa00" />
      
      <Stars radius={300} depth={60} count={5000} factor={4} saturation={0} fade />
      
      <WaveEarth position={[0, 0, 0]} />
      <OrbitalRings />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

// Rotating Circle Background
const RotatingCircle = () => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: '800px',
        height: '800px',
        border: '2px solid rgba(16, 185, 129, 0.2)',
        borderRadius: '50%',
        zIndex: 1
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '600px',
          height: '600px',
          border: '1px solid rgba(6, 182, 212, 0.15)',
          borderRadius: '50%',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Add Luminous Shimmer Particles to Rotating Circle */}
      <LuminousShimmerParticles position={[400, 400]} size={400} intensity={0.8} />
    </motion.div>
  )
}

// Earth Rings Background Component for Small Devices
const EarthRingsBackground = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="relative"
        style={{
          width: '300px',
          height: '300px',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Inner Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '120px',
            height: '120px',
            border: '3px solid rgba(0, 255, 170, 0.6)',
            borderRadius: '50%',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '180px',
            height: '180px',
            border: '2px solid rgba(0, 136, 255, 0.4)',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Outer Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '240px',
            height: '240px',
            border: '1px solid rgba(68, 221, 255, 0.3)',
            borderRadius: '50%',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Central Earth */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '60px',
            height: '60px',
            background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #3b82f6, #10b981)',
            borderRadius: '50%',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.8)',
          }}
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Add Luminous Shimmer Particles to Earth Rings Background */}
        <LuminousShimmerParticles position={[150, 150]} size={250} intensity={1} />
      </motion.div>
    </div>
  )
}

// Education data
const education = [
  {
    id: 1,
    degree: 'Master of Science',
    field: 'Computer Science',
    institution: 'Saint Louis University',
    location: 'St Louis, MO',
    period: 'Graduated May 2025',
    status: 'Completed',
    description: 'Advanced studies in software engineering, machine learning, and distributed systems with focus on sustainable technology solutions.',
    highlights: [
      'Sustainable Software Engineering & Green Computing',
      'AI for Environmental Impact Assessment',
      'Distributed Systems for Climate Data Processing',
      'Advanced Algorithms for Resource Optimization'
    ],
    color: '#00ff88',
    icon: '🌍'
  },
  {
    id: 2,
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    institution: 'Nalla Malla Reddy Engineering College',
    location: 'Hyderabad, IND',
    period: 'Graduated Jun 2023',
    status: 'Completed',
    description: 'Comprehensive foundation in computer science with emphasis on environmental applications and sustainable development.',
    highlights: [
      'Environmental Data Analysis & Visualization',
      'Sustainable Database Design Principles',
      'Green Software Development Practices',
      'Renewable Energy Systems Integration'
    ],
    color: '#0088ff',
    icon: '🌱'
  }
]

const Education = () => {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2800)
    
    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Save state before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      earthStateManager.saveState()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <>
      <AnimatePresence>
        <WavesEarthLoadingScreen isLoading={isLoading} />
      </AnimatePresence>

      {/* Hide scrollbar globally */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none; /* WebKit */
        }
        
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        *::-webkit-scrollbar {
          display: none; /* WebKit */
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
        {/* Earth Mode Indicator - Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 3.2 }}
          className="fixed top-4 left-4 z-50"
        >
          <div className="bg-black/40 backdrop-blur-lg border border-emerald-400/50 rounded-2xl p-3 shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" 
                   style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.9)' }} />
              <span className="text-emerald-400 text-sm font-mono font-bold tracking-wider">
                EARTH MODE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Wave Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/images/wave.mp4" type="video/mp4" />
        </video>

        {/* Animated Background Overlay */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ y: backgroundY, zIndex: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-teal-500/20" />
          {/* Floating wave particles */}
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Rotating Circle Background - Hidden on small screens */}
        <div className="hidden lg:block">
          <RotatingCircle />
        </div>

        {/* Earth Rings Background - Visible only on small screens */}
        <div className="block lg:hidden">
          <EarthRingsBackground />
        </div>

        {/* Centered Heading with Luminous Shimmer Particles */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="absolute top-8 left-0 right-0 z-30 text-center"
        >
          <div className="relative">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative z-10"
              style={{
                background: 'linear-gradient(45deg, #00ff88, #0088ff, #44ddff, #00ff88)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Orbitron, monospace',
                textShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              EDUCATION
            </motion.h1>
            
            {/* Luminous Shimmer Particles around the title */}
            <LuminousShimmerParticles position={[0, 0]} size={400} intensity={1.2} />
          </div>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-emerald-300 px-4 mt-2"
            style={{ fontFamily: 'Exo, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            Riding the waves of knowledge and innovation
          </motion.p>
        </motion.div>

        {/* Main Layout Container - Responsive */}
        <div className="relative z-20 min-h-screen flex flex-col lg:flex-row">
          {/* Left Side - 3D Earth Scene (Hidden on small screens, 60% width on large screens) */}
          <div className="hidden lg:flex lg:w-3/5 h-screen items-center justify-center">
            <div className="w-full h-full relative">
              <Canvas 
                camera={{ position: [0, 0, 12], fov: 60 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Suspense fallback={null}>
                  <WaveEarthScene />
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Right Side - Content (Full width on small screens, 40% width on large screens) */}
          <div className="w-full lg:w-2/5 min-h-screen flex flex-col justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
            <div className="max-w-2xl w-full mx-auto">
              {/* Education Cards */}
              <div className="space-y-4 sm:space-y-6 mt-20 lg:mt-20">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: 100, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 4.5 + index * 0.3,
                      type: 'spring',
                      stiffness: 100
                    }}
                    className="relative group"
                    style={{
                      transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                    }}
                    onMouseEnter={() => setHoveredCard(edu.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Container */}
                    <motion.div
                      className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-xl border-2 overflow-hidden"
                      style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderColor: edu.color,
                        boxShadow: `0 0 40px ${edu.color}40, inset 0 0 40px rgba(255, 255, 255, 0.1)`,
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: `0 0 60px ${edu.color}60, inset 0 0 60px rgba(255, 255, 255, 0.2)`,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Wave Pattern Background */}
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${edu.color}40, transparent 70%)`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />

                      {/* Luminous Shimmer Particles on each card */}
                      <LuminousShimmerParticles 
                        position={[0, 0]} 
                        size={200} 
                        intensity={0.6} 
                      />

                      {/* Status Badge */}
                      <motion.div
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5 + index * 0.3 }}
                      >
                        <motion.div
                          className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 w-fit"
                          style={{
                            background: `${edu.color}20`,
                            color: edu.color,
                            border: `2px solid ${edu.color}50`,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-base sm:text-lg">{edu.icon}</span>
                          <span>{edu.status}</span>
                        </motion.div>
                        <div className="text-left sm:text-right">
                          <div className="text-emerald-400 font-semibold text-xs sm:text-sm">{edu.period}</div>
                          <div className="text-gray-400 text-xs">{edu.location}</div>
                        </div>
                      </motion.div>

                      {/* Degree Information */}
                      <motion.div 
                        className="mb-3 sm:mb-4 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 5.2 + index * 0.3 }}
                      >
                        <h2 
                          className="text-xl sm:text-2xl font-bold mb-2"
                          style={{ 
                            color: edu.color,
                            fontFamily: 'Orbitron, monospace',
                            textShadow: `0 0 20px ${edu.color}60`,
                          }}
                        >
                          {edu.degree}
                        </h2>
                        <h3 className="text-base sm:text-lg text-white mb-2 font-semibold">
                          {edu.field}
                        </h3>
                        <p className="text-sm sm:text-base text-emerald-200 font-medium">
                          {edu.institution}
                        </p>
                      </motion.div>

                      <motion.p 
                        className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5.4 + index * 0.3 }}
                      >
                        {edu.description}
                      </motion.p>

                      {/* Hover Effect for Core Focus Areas */}
                      <AnimatePresence>
                        {hoveredCard === edu.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden relative z-10"
                          >
                            <h4 
                              className="text-xs sm:text-sm font-bold mb-2 sm:mb-3"
                              style={{ 
                                color: edu.color,
                                fontFamily: 'Orbitron, monospace',
                                textShadow: `0 0 15px ${edu.color}60`,
                              }}
                            >
                              CORE FOCUS AREAS
                            </h4>
                            <div className="space-y-1 sm:space-y-2">
                              {edu.highlights.map((highlight, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center space-x-2 sm:space-x-3 group/item"
                                >
                                  <motion.div 
                                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: edu.color }}
                                    animate={{
                                      scale: [1, 1.3, 1],
                                      boxShadow: [
                                        `0 0 10px ${edu.color}60`,
                                        `0 0 20px ${edu.color}80`,
                                        `0 0 10px ${edu.color}60`,
                                      ],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: idx * 0.3,
                                    }}
                                  />
                                  <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300 text-xs sm:text-sm">
                                    {highlight}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Wave Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                        style={{
                          background: `linear-gradient(45deg, transparent, ${edu.color}20, transparent)`,
                        }}
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 6 }}
                className="text-center mt-6 sm:mt-8"
              >
                <motion.div
                  className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-xl border-2 relative"
                  style={{
                    background: 'rgba(0, 255, 136, 0.1)',
                    borderColor: '#00ff88',
                    boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 50px rgba(0, 255, 136, 0.5)',
                  }}
                >
                  <motion.div
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-emerald-300 font-mono text-xs sm:text-sm tracking-wider">
                    SURFING THE WAVES OF TECHNOLOGICAL INNOVATION
                  </span>
                  
                  {/* Luminous Shimmer Particles around CTA */}
                  <LuminousShimmerParticles position={[0, 0]} size={150} intensity={0.4} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Education

