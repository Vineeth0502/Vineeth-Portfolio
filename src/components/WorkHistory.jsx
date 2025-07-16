import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Stars, useTexture, Sphere, Float } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { 
  MeshStandardMaterial, 
  SphereGeometry, 
  DoubleSide, 
  ConeGeometry,
  CylinderGeometry,
  PlaneGeometry,
  TextureLoader,
  RepeatWrapping,
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  AdditiveBlending
} from 'three'

// WORK EXPERIENCE DATA
const workExperience = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Saint Louis University',
    period: 'Feb. 2024 - Present',
    location: 'Saint Louis, MO',
    description: 'Led the design and development of an intuitive, user-centric interface using React.js, enhancing platform usability and engagement.',
    achievements: [
      'Created and integrated daily cybersecurity challenges to promote continuous hands-on learning',
      'Built and nurtured a collaborative community feature for knowledge sharing',
      'Implemented secure authentication protocols and encrypted data storage solutions',
      'Developed backend services using Java and Spring Boot',
      'Applied Java multi-threading to optimize backend performance, reducing response time by 20%'
    ],
    color: '#ff6b35'
  },
  {
    id: 2,
    title: 'Machine Learning Researcher',
    company: 'Saint Louis University',
    period: 'Feb. 2024 - Jun. 2024',
    location: 'Saint Louis, MO',
    description: 'Designed and optimized machine learning models using neural networks, TensorFlow, and deep learning techniques.',
    achievements: [
      'Achieved 15% increase in waste sorting efficiency for recyclable solid waste management',
      'Enhanced model performance by 20% through advanced algorithm implementation',
      'Collaborated with multidisciplinary research team of 5 members',
      'Reduced processing time by 30% using emerging technologies',
      'Enhanced model robustness by 40% through rigorous validation procedures'
    ],
    color: '#d2691e'
  },
  {
    id: 3,
    title: 'Full Stack Developer Intern',
    company: 'ThePaperBrains',
    period: 'Jan. 2023 - Aug. 2023',
    location: 'Hyderabad, IND',
    description: 'Built and deployed full-stack web applications tailored to client requirements using HTML, CSS, JavaScript, and Python.',
    achievements: [
      'Led to 30% increase in user engagement and 20% reduction in bounce rates',
      'Orchestrated RESTful APIs, improving application performance by 25%',
      'Provided technical support, resolving 95% of issues within 24 hours',
      'Conducted code reviews, reducing code errors by 40%',
      'Consistently delivered projects on schedule, surpassing client expectations by 15%'
    ],
    color: '#cd853f'
  },
  {
    id: 4,
    title: 'Junior Associate Software Engineer Intern',
    company: 'Digital Zap',
    period: 'Mar. 2022 - Dec. 2022',
    location: 'Hyderabad, IND',
    description: 'Deployed user-friendly WordPress websites, including optimized checkout pages.',
    achievements: [
      'Resulted in 25% increase in user clicks and 33% boost in customer purchases',
      'Identified and rectified defects, leading to 50% improvement in software stability',
      'Worked closely with design team and project manager for timely completion',
      'Cut project delays by 20% through effective collaboration',
      'Mentored junior developers, enhancing their technical skills by 35%'
    ],
    color: '#a0522d'
  }
]

// MARS BACKGROUND SURFACE WITH REAL IMAGE
function MarsBackgroundSurface() {
  const surfaceRef = useRef()
  const marsTexture = useTexture('/assets/images/mars-background.jpg')
  
  useEffect(() => {
    if (marsTexture) {
      marsTexture.wrapS = RepeatWrapping
      marsTexture.wrapT = RepeatWrapping
      marsTexture.repeat.set(3, 3)
    }
  }, [marsTexture])
  
  useFrame(() => {
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += 0.0003
    }
  })
  
  return (
    <mesh ref={surfaceRef} position={[0, -30, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[600, 600, 100, 100]} />
      <meshStandardMaterial
        map={marsTexture}
        color="#a0522d"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

// LEFT BOTTOM VOLCANO WITH REAL TEXTURES
function LeftBottomVolcano({ onEruption, onShake }) {
  const volcanoRef = useRef()
  const lavaPoolRef = useRef()
  const explosionRef = useRef()
  const smokeRef = useRef()
  const [isErupting, setIsErupting] = useState(false)
  
  const lavaTexture = useTexture('/assets/images/lava-texture.jpg')
  
  useEffect(() => {
    if (lavaTexture) {
      lavaTexture.wrapS = RepeatWrapping
      lavaTexture.wrapT = RepeatWrapping
      lavaTexture.repeat.set(2, 2)
    }
  }, [lavaTexture])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (volcanoRef.current) {
      volcanoRef.current.rotation.y += 0.002
    }
    
    if (lavaPoolRef.current) {
      lavaPoolRef.current.material.emissiveIntensity = 2.0 + Math.sin(time * 6) * 0.5
      lavaPoolRef.current.position.y = 8 + Math.sin(time * 4) * 0.3
    }
    
    // Eruption cycle every 10 seconds
    const eruptionCycle = (time % 10) / 10
    const shouldErupt = eruptionCycle > 0.6 && eruptionCycle < 0.8
    
    if (shouldErupt && !isErupting) {
      setIsErupting(true)
      onEruption(true)
      onShake(true)
    } else if (!shouldErupt && isErupting) {
      setIsErupting(false)
      onEruption(false)
      onShake(false)
    }
    
    if (explosionRef.current) {
      if (isErupting) {
        explosionRef.current.scale.setScalar(6 + Math.sin(time * 20) * 2)
        explosionRef.current.material.opacity = 0.9 + Math.sin(time * 30) * 0.1
        explosionRef.current.position.y = 15 + Math.sin(time * 25) * 4
      } else {
        explosionRef.current.scale.setScalar(0.1)
        explosionRef.current.material.opacity = 0
      }
    }
    
    if (smokeRef.current) {
      smokeRef.current.rotation.y += 0.03
      smokeRef.current.position.y = 12 + Math.sin(time * 1.2) * 2
      smokeRef.current.material.opacity = 0.4 + Math.sin(time * 2) * 0.2
      smokeRef.current.scale.setScalar(1.5 + Math.sin(time * 1.8) * 0.4)
    }
  })
  
  return (
    <group position={[-50, -25, -20]}>
      {/* Volcano Base */}
      <mesh ref={volcanoRef}>
        <coneGeometry args={[18, 30, 32]} />
        <meshStandardMaterial
          color="#2f1b14"
          roughness={1.0}
          metalness={0.0}
        />
      </mesh>
      
      {/* Lava Pool */}
      <mesh ref={lavaPoolRef} position={[0, 8, 0]}>
        <cylinderGeometry args={[6, 6, 3, 32]} />
        <meshStandardMaterial
          map={lavaTexture}
          color="#ff4500"
          emissive="#ff6347"
          emissiveIntensity={2.0}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Volcanic Smoke */}
      <mesh ref={smokeRef} position={[0, 12, 0]}>
        <sphereGeometry args={[5, 24, 24]} />
        <meshBasicMaterial
          color="#444444"
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Explosion Effect */}
      <mesh ref={explosionRef} position={[0, 15, 0]}>
        <sphereGeometry args={[5, 24, 24]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  )
}

// LAVA FLOWS FROM LEFT BOTTOM VOLCANO
function LeftBottomLavaFlows() {
  const lavaFlowRefs = useRef([])
  const lavaTexture = useTexture('/assets/images/lava-texture.jpg')
  
  useEffect(() => {
    if (lavaTexture) {
      lavaTexture.wrapS = RepeatWrapping
      lavaTexture.wrapT = RepeatWrapping
      lavaTexture.repeat.set(1, 4)
    }
  }, [lavaTexture])
  
  const flows = useMemo(() => [
    { start: [-50, -25, -20], end: [-35, -28, -10], width: 2.0 },
    { start: [-50, -25, -20], end: [-60, -28, -15], width: 1.5 },
    { start: [-50, -25, -20], end: [-45, -28, -30], width: 1.8 },
    { start: [-50, -25, -20], end: [-55, -28, -25], width: 1.6 }
  ], [])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    lavaFlowRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.material.emissiveIntensity = 1.5 + Math.sin(time * 5 + index) * 0.6
        ref.material.opacity = 0.95 + Math.sin(time * 4 + index) * 0.05
      }
    })
  })
  
  return (
    <group>
      {flows.map((flow, index) => {
        const length = Math.sqrt(
          Math.pow(flow.end[0] - flow.start[0], 2) +
          Math.pow(flow.end[1] - flow.start[1], 2) +
          Math.pow(flow.end[2] - flow.start[2], 2)
        )
        
        return (
          <mesh
            key={index}
            ref={(el) => (lavaFlowRefs.current[index] = el)}
            position={[
              (flow.start[0] + flow.end[0]) / 2,
              (flow.start[1] + flow.end[1]) / 2,
              (flow.start[2] + flow.end[2]) / 2
            ]}
            rotation={[
              0,
              0,
              Math.atan2(flow.end[1] - flow.start[1], flow.end[0] - flow.start[0])
            ]}
          >
            <cylinderGeometry args={[flow.width, flow.width * 0.3, length, 16]} />
            <meshStandardMaterial
              map={lavaTexture}
              color="#ff4500"
              emissive="#dc143c"
              emissiveIntensity={1.5}
              transparent
              opacity={0.95}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// VOLCANIC PARTICLES CONCENTRATED AROUND LEFT BOTTOM VOLCANO
function LeftBottomVolcanicParticles({ isErupting }) {
  const particlesRef = useRef()
  const particleCount = 300
  
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      // Concentrate particles around left bottom volcano
      positions[i * 3] = -50 + (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = -20 + Math.random() * 20
      positions[i * 3 + 2] = -20 + (Math.random() - 0.5) * 12
      
      // Volcanic particle colors
      colors[i * 3] = 0.8 + Math.random() * 0.2
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
      colors[i * 3 + 2] = 0.1 + Math.random() * 0.2
      
      sizes[i] = Math.random() * 1.5 + 0.5
    }
    
    return { positions, colors, sizes }
  }, [])
  
  useEffect(() => {
    if (!particlesRef.current) return
    
    particlesRef.current.geometry.setAttribute('position', new BufferAttribute(positions, 3))
    particlesRef.current.geometry.setAttribute('color', new BufferAttribute(colors, 3))
    particlesRef.current.geometry.setAttribute('size', new BufferAttribute(sizes, 1))
  }, [positions, colors, sizes])
  
  useFrame((state) => {
    if (!particlesRef.current) return
    
    const positionArray = particlesRef.current.geometry.attributes.position.array
    const time = state.clock.elapsedTime
    
    const intensity = isErupting ? 2.0 : 0.8
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Particle movement
      positionArray[i3] += Math.sin(time * 0.8 + i * 0.03) * 0.02 * intensity
      positionArray[i3 + 1] += 0.05 * intensity
      positionArray[i3 + 2] += Math.cos(time * 0.6 + i * 0.02) * 0.015 * intensity
      
      // Reset particles that go too high
      if (positionArray[i3 + 1] > 15) {
        positionArray[i3] = -50 + (Math.random() - 0.5) * 15
        positionArray[i3 + 1] = -20 + Math.random() * 3
        positionArray[i3 + 2] = -20 + (Math.random() - 0.5) * 12
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={1.0}
        vertexColors
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

// MARS PLANET 3D COMPONENT
function Mars3D() {
  const marsRef = useRef()
  const marsTexture = useTexture('/assets/images/mars-background.jpg')
  
  useEffect(() => {
    if (marsTexture) {
      marsTexture.wrapS = RepeatWrapping
      marsTexture.wrapT = RepeatWrapping
    }
  }, [marsTexture])
  
  useFrame((state) => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.008
      marsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.8
    }
  })
  
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={marsRef} position={[40, 8, -18]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          map={marsTexture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}

// MARS MOONS
function MarsMoons() {
  const phobosRef = useRef()
  const deimosRef = useRef()
  
  useFrame((state) => {
    if (phobosRef.current) {
      const time = state.clock.elapsedTime
      phobosRef.current.position.x = 40 + Math.cos(time * 1.0) * 10
      phobosRef.current.position.z = -18 + Math.sin(time * 1.0) * 10
      phobosRef.current.position.y = 8 + Math.sin(time * 1.0) * 1.5
    }
    
    if (deimosRef.current) {
      const time = state.clock.elapsedTime
      deimosRef.current.position.x = 40 + Math.cos(time * 0.5) * 15
      deimosRef.current.position.z = -18 + Math.sin(time * 0.5) * 15
      deimosRef.current.position.y = 8 + Math.cos(time * 0.5) * 1.2
    }
  })
  
  return (
    <group>
      <mesh ref={phobosRef}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>
      <mesh ref={deimosRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#a0522d" roughness={0.9} />
      </mesh>
    </group>
  )
}

// MARS ATMOSPHERE
function MarsAtmosphere() {
  const atmosphereRef = useRef()
  
  useFrame((state) => {
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.003
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.08
      atmosphereRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <mesh ref={atmosphereRef} position={[40, 8, -18]}>
      <sphereGeometry args={[5.5, 32, 32]} />
      <meshStandardMaterial
        color="#ff6b35"
        transparent
        opacity={0.15}
        side={DoubleSide}
      />
    </mesh>
  )
}

// CAMERA CONTROLLER WITH SHAKE
function CameraController({ shakeIntensity }) {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 0, 25)
    camera.lookAt(0, 0, 0)
  }, [camera])
  
  useFrame(() => {
    // Screen shake during eruptions
    const shakeX = (Math.random() - 0.5) * shakeIntensity * 0.12
    const shakeY = (Math.random() - 0.5) * shakeIntensity * 0.06
    
    camera.position.set(shakeX, shakeY, 25)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// 3D SCENE COMPONENT
function Mars3DScene({ shakeIntensity, setShakeIntensity }) {
  const [isErupting, setIsErupting] = useState(false)
  
  const handleEruption = (erupting) => {
    setIsErupting(erupting)
  }
  
  const handleShake = (shaking) => {
    setShakeIntensity(shaking ? 0.25 : 0)
  }
  
  return (
    <>
      <CameraController shakeIntensity={shakeIntensity} />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.5} color="#ff6347" />
      <pointLight position={[25, 25, 25]} intensity={2.0} color="#ffa500" />
      <directionalLight position={[-25, 15, 15]} intensity={1.2} color="#ff6b35" />
      <pointLight position={[-50, 20, -20]} intensity={6} color="#ff4500" />
      <spotLight
        position={[-50, 50, -20]}
        angle={0.25}
        penumbra={0.4}
        intensity={5}
        color="#ff6347"
        target-position={[-50, -25, -20]}
      />
      
      <Stars
        radius={400}
        depth={200}
        count={4000}
        factor={10}
        saturation={0.8}
        fade
        speed={0.15}
      />
      
      <MarsBackgroundSurface />
      <LeftBottomVolcano onEruption={handleEruption} onShake={handleShake} />
      <LeftBottomLavaFlows />
      <LeftBottomVolcanicParticles isErupting={isErupting} />
      <Mars3D />
      <MarsMoons />
      <MarsAtmosphere />
      
      {/* Atmospheric Fog */}
      <fog attach="fog" args={['#1a0f0a', 50, 150]} />
    </>
  )
}

// MARS LOADING SCREEN
function MarsLoadingScreen({ isLoading }) {
  if (!isLoading) return null
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 25%, #4a2c1a 50%, #2d1810 75%, #1a0f0a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      {/* Mars Loading Animation */}
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
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #ff6b35, #d2691e, #cd853f, #a0522d, #ff6b35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
          boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)'
        }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b4513, #a0522d)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2d1810, #1a0f0a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ff4500',
                boxShadow: '0 0 15px #ff4500'
              }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Loading Text */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          color: '#ff6b35',
          fontSize: '1.8rem',
          fontFamily: 'Orbitron, monospace',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1rem',
          letterSpacing: '0.1em',
          textShadow: '0 0 20px rgba(255, 107, 53, 0.5)'
        }}
      >
        MARS SYSTEM INITIALIZING
      </motion.div>
      
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{
          color: '#ffa500',
          fontSize: '1.1rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400',
          textAlign: 'center',
          opacity: 0.8
        }}
      >
        Loading volcanic environment...
      </motion.div>
      
      {/* Loading Progress Bar */}
      <div style={{
        width: '300px',
        height: '4px',
        background: 'rgba(255, 107, 53, 0.2)',
        borderRadius: '2px',
        marginTop: '2rem',
        overflow: 'hidden'
      }}>
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)',
            borderRadius: '2px'
          }}
        />
      </div>
    </motion.div>
  )
}

// MAIN COMPONENT
const MarsWorkExperienceLeftBottomVolcanoComponent = () => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shakeIntensity, setShakeIntensity] = useState(0)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    // Loading timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      clearTimeout(loadingTimer)
    }
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      
      .mars-gradient {
        background: linear-gradient(135deg, #1a0f0a 0%, #2d1810 25%, #4a2c1a 50%, #2d1810 75%, #1a0f0a 100%);
      }
      
      .glass-effect {
        backdrop-filter: blur(20px);
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 107, 53, 0.2);
      }
      
      .experience-card {
        transition: all 0.3s ease;
      }
      
      .experience-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
      }
      
      .shake-effect {
        transform: ${shakeIntensity > 0 ? `translate(${(Math.random() - 0.5) * shakeIntensity * 10}px, ${(Math.random() - 0.5) * shakeIntensity * 5}px)` : 'none'};
        transition: transform 0.1s ease-out;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [shakeIntensity])

  return (
    <>
      <AnimatePresence>
        <MarsLoadingScreen isLoading={isLoading} />
      </AnimatePresence>
      
      <div className="mars-gradient" style={{
        minHeight: '100vh',
        position: 'relative',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* 3D Background */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          <Canvas
            camera={{ position: [0, 0, 25], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Mars3DScene 
                shakeIntensity={shakeIntensity}
                setShakeIntensity={setShakeIntensity}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Mars Mode Indicator */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 30
        }} className="shake-effect">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 4.5 }}
            className="glass-effect"
            style={{
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <div style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#ff6b35',
              borderRadius: '50%',
              animation: 'pulse 2s infinite',
              boxShadow: '0 0 10px #ff6b35'
            }} />
            <span style={{
              color: '#ff6b35',
              fontSize: '1rem',
              fontFamily: 'Orbitron, monospace',
              fontWeight: '700',
              letterSpacing: '0.05em'
            }}>
              MARS MODE ON
            </span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }} className="shake-effect">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.8 }}
            style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}
          >
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '900',
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(45deg, #ff6b35, #ffa500, #ff8c42)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
              textShadow: '0 0 30px rgba(255, 107, 53, 0.5)'
            }}>
              WORK EXPERIENCE
            </h1>
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.5rem',
              color: '#ffa500',
              fontWeight: '300',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Professional Journey Through Mars Volcanic Terrain
            </p>
          </motion.div>

          {/* Experience Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {workExperience.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 5.2 + index * 0.2 }}
                className="experience-card glass-effect"
                style={{
                  borderRadius: '1rem',
                  padding: '2rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => setSelectedJob(job)}
              >
                {/* Card Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: job.color,
                      marginBottom: '0.5rem',
                      fontFamily: 'Orbitron, monospace'
                    }}>
                      {job.title}
                    </h3>
                    <p style={{
                      fontSize: '1.125rem',
                      color: '#ffffff',
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {job.company}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#cccccc',
                      fontWeight: '400'
                    }}>
                      {job.period} • {job.location}
                    </p>
                  </div>
                  <div style={{
                    width: '4px',
                    height: '60px',
                    background: `linear-gradient(to bottom, ${job.color}, transparent)`,
                    borderRadius: '2px'
                  }} />
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '1rem',
                  color: '#e0e0e0',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {job.description}
                </p>

                {/* Key Achievements Preview */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: job.color,
                    fontWeight: '500'
                  }}>
                    VIEW ACHIEVEMENTS →
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: `linear-gradient(45deg, ${job.color}, transparent)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      color: 'white'
                    }}
                  >
                    →
                  </motion.div>
                </div>

                {/* Hover Effect Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${job.color}10, transparent)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: '1rem',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '1rem' : '2rem'
              }}
              onClick={() => setSelectedJob(null)}
              className="shake-effect"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-effect"
                style={{
                  borderRadius: '1.5rem',
                  padding: isMobile ? '2rem' : '3rem',
                  width: '100%',
                  maxWidth: '600px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  border: `2px solid ${selectedJob.color}40`
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: isMobile ? '1.75rem' : '2.25rem',
                      fontWeight: '700',
                      color: selectedJob.color,
                      marginBottom: '0.5rem',
                      fontFamily: 'Orbitron, monospace'
                    }}>
                      {selectedJob.title}
                    </h2>
                    <p style={{
                      fontSize: '1.25rem',
                      color: '#ffffff',
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {selectedJob.company}
                    </p>
                    <p style={{
                      color: '#cccccc',
                      fontSize: '1rem'
                    }}>
                      {selectedJob.period} • {selectedJob.location}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#cccccc',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      padding: '0.5rem'
                    }}
                  >
                    ✕
                  </button>
                </div>

                <p style={{
                  fontSize: '1.125rem',
                  color: '#e0e0e0',
                  lineHeight: '1.7',
                  marginBottom: '2rem'
                }}>
                  {selectedJob.description}
                </p>

                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: selectedJob.color,
                    marginBottom: '1.5rem',
                    fontFamily: 'Orbitron, monospace'
                  }}>
                    Key Achievements
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {selectedJob.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          marginBottom: '1rem',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.5rem',
                          border: `1px solid ${selectedJob.color}20`
                        }}
                      >
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: selectedJob.color,
                          borderRadius: '50%',
                          marginTop: '0.5rem',
                          marginRight: '1rem',
                          flexShrink: 0
                        }} />
                        <span style={{
                          color: '#e0e0e0',
                          fontSize: '1rem',
                          lineHeight: '1.6'
                        }}>
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default MarsWorkExperienceLeftBottomVolcanoComponent

