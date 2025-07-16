import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Float, Stars, useTexture } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import nebulaBackground from '../assets/images/nebula-bg.jpg'
import profileImg from '../assets/images/profile.png'

// Orbiting Planet Component
const OrbitingPlanet = ({ radius, size, speed, color }) => {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  )
}

// Profile Image Orb Component
const ProfileOrb = () => {
  const texture = useTexture(profileImg)
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1.5, 64, 64]} position={[0, 1, 0]}>
        <meshStandardMaterial map={texture} roughness={0.2} metalness={0.9} />
      </Sphere>
    </Float>
  )
}

const AboutMe = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${nebulaBackground})`,
          filter: 'brightness(0.3)'
        }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <Stars radius={300} depth={60} count={1200} factor={7} />
            <ProfileOrb />
            <OrbitingPlanet radius={3} size={0.3} speed={0.5} color="#38bdf8" />
            <OrbitingPlanet radius={4} size={0.4} speed={0.3} color="#f472b6" />
            <OrbitingPlanet radius={5} size={0.5} speed={0.2} color="#facc15" />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8"
            style={{ fontFamily: 'Orbitron, monospace' }}

          >
            VINEETH KETHAM
          </motion.h2>

          {/* Bio Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 mx-auto max-w-3xl"
            style={{
              boxShadow: '0 0 50px rgba(59, 130, 246, 0.3)',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3" />
                <span className="text-green-400 text-sm font-mono">SOLAR SYSTEM ONLINE</span>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Exo, sans-serif' }}>
                Results-driven Computer Science graduate with proven experience in software development, 
                machine learning, and full-stack web application design. Skilled in building scalable 
                systems using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Java 
                (including Spring Boot, multithreading, and RESTful APIs).
              </p>

              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Exo, sans-serif' }}>
                Strong foundation in object-oriented programming, data analysis, cloud platforms like GCP, 
                and Agile methodologies. Demonstrated success in leading technical projects, contributing 
                to open-source initiatives, and delivering robust backend services and responsive user interfaces.
              </p>

              <motion.div
                className="flex justify-center space-x-8 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">2+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">6+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">10+</div>
                  <div className="text-sm text-gray-400">Technologies Mastered</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mission Status */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-mono text-sm">
                ACTIVELY SEEKING OPPORTUNITIES TO CONTRIBUTE TO DYNAMIC ENGINEERING TEAMS
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
