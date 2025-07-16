import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { motion } from 'framer-motion'

// Import planet textures
import sunTexture from '../assets/images/sun.jpg'
import mercuryTexture from '../assets/images/mercury.jpg'
import venusTexture from '../assets/images/venus.jpg'
import earthTexture from '../assets/images/earth.jpg'
import marsTexture from '../assets/images/mars.jpg'
import jupiterTexture from '../assets/images/jupiter.jpg'
import saturnTexture from '../assets/images/saturn.png'
import uranusTexture from '../assets/images/uranus.jpg'
import neptuneTexture from '../assets/images/neptune.jpg'
import profileImage from '../assets/images/profile-placeholder.png'

// Planet data with realistic orbital properties
const planetData = [
  { name: 'Mercury', texture: mercuryTexture, size: 0.15, distance: 2, speed: 0.04, color: '#8C7853' },
  { name: 'Venus', texture: venusTexture, size: 0.18, distance: 2.8, speed: 0.035, color: '#FFC649' },
  { name: 'Earth', texture: earthTexture, size: 0.2, distance: 3.6, speed: 0.03, color: '#6B93D6' },
  { name: 'Mars', texture: marsTexture, size: 0.16, distance: 4.4, speed: 0.025, color: '#CD5C5C' },
  { name: 'Jupiter', texture: jupiterTexture, size: 0.4, distance: 5.8, speed: 0.02, color: '#D8CA9D' },
  { name: 'Saturn', texture: saturnTexture, size: 0.35, distance: 7.2, speed: 0.015, color: '#FAD5A5' },
  { name: 'Uranus', texture: uranusTexture, size: 0.25, distance: 8.6, speed: 0.012, color: '#4FD0E7' },
  { name: 'Neptune', texture: neptuneTexture, size: 0.24, distance: 10, speed: 0.01, color: '#4B70DD' }
]

// Individual Planet Component
function Planet({ data, time }) {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, data.texture)
  
  const angle = time * data.speed
  const x = Math.cos(angle) * data.distance
  const z = Math.sin(angle) * data.distance
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.set(x, 0, z)
    }
  })

  return (
    <mesh ref={meshRef} position={[x, 0, z]}>
      <sphereGeometry args={[data.size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

// Orbit Ring Component
function OrbitRing({ radius }) {
  const points = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    points.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
  }

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(points)}
          count={points.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" opacity={0.1} transparent />
    </line>
  )
}

// Central Sun Component
function CentralSun() {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, sunTexture)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        map={texture} 
        emissive="#ff6600" 
        emissiveIntensity={0.3}
      />
      <pointLight intensity={2} distance={20} color="#ffaa00" />
    </mesh>
  )
}

// 3D Scene Component
function SolarSystemScene() {
  const [time, setTime] = useState(0)
  
  useFrame((state, delta) => {
    setTime(prev => prev + delta)
  })

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Central Sun */}
      <CentralSun />
      
      {/* Orbit rings */}
      {planetData.map((planet, index) => (
        <OrbitRing key={`orbit-${index}`} radius={planet.distance} />
      ))}
      
      {/* Planets */}
      {planetData.map((planet, index) => (
        <Planet key={index} data={planet} time={time} />
      ))}
      
      {/* Starfield background */}
      <mesh>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial color="#000011" side={2} />
      </mesh>
    </>
  )
}

// Main Solar System Component
function SolarSystem3D() {
  const [selectedPlanet, setSelectedPlanet] = useState(null)

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 8, 12], fov: 60 }}
        className="w-full h-full"
      >
        <SolarSystemScene />
      </Canvas>
      
      {/* Profile Image Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-2xl overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 p-1">
            <img
              src={profileImage}
              alt="Vineeth Ketham"
              className="w-full h-full rounded-full object-cover bg-gray-800"
            />
          </div>
          
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50"></div>
          
          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-300/30"
          />
        </div>
      </motion.div>
      
      {/* Planet Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md rounded-lg p-6 border border-white/20"
      >
        <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">
          SOLAR SYSTEM PORTFOLIO
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {planetData.map((planet, index) => (
            <motion.div
              key={planet.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 rounded p-2 transition-colors"
              onClick={() => setSelectedPlanet(planet)}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span className="text-white text-sm font-medium">{planet.name}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-300 text-sm">
            🌟 Each planet represents a different aspect of my professional journey
          </p>
        </div>
      </motion.div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default SolarSystem3D

