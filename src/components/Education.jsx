import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import ancientTempleSpace from '/assets/images/ancient-temple-space.jpg'

// 3D Pedestal Component
const Pedestal = ({ position, delay = 0 }) => {
  const meshRef = useRef()

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        {/* Base */}
        <mesh ref={meshRef} position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1, 1.2, 0.3, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Column */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1, 8]} />
          <meshStandardMaterial color="#b8860b" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Top */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[1, 0.8, 0.2, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

const education = [
  {
    id: 1,
    degree: 'Master of Science',
    field: 'Computer Science',
    institution: 'Saint Louis University',
    location: 'St Louis, MO',
    period: 'Expected May 2025',
    status: 'In Progress',
    description: 'Advanced studies in software engineering, machine learning, and distributed systems.',
    highlights: [
      'Focus on Full-Stack Development and Backend Performance',
      'Research in Machine Learning and AI Applications',
      'Advanced Algorithms and Data Structures',
      'Cloud Computing and Distributed Systems'
    ]
  },
  {
    id: 2,
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    institution: 'Nalla Malla Reddy Engineering College',
    location: 'Hyderabad, IND',
    period: 'Graduated Jun 2023',
    status: 'Completed',
    description: 'Comprehensive foundation in computer science principles, programming, and software development.',
    highlights: [
      'Strong Foundation in Programming Languages',
      'Database Management and Design',
      'Software Engineering Principles',
      'Web Development Technologies'
    ]
  }
]

const Education = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${ancientTempleSpace})`,
          filter: 'brightness(0.4) sepia(0.3) hue-rotate(30deg)'
        }}
      />

      {/* Golden Light Rays */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-1 bg-gradient-to-b from-yellow-400/30 to-transparent"
            style={{
              left: `${10 + i * 10}%`,
              height: '100%',
              transformOrigin: 'top center',
              transform: `rotate(${-45 + i * 10}deg)`
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} color="#ffd700" />
            <pointLight position={[0, 10, 0]} intensity={2} color="#ffd700" />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffeb3b" />
            <Stars radius={400} depth={80} count={800} factor={6} />
            <Pedestal position={[-3, 0, 0]} delay={0} />
            <Pedestal position={[3, 0, 0]} delay={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              TIME TEMPLE
            </h1>
            <p className="text-xl text-yellow-300" style={{ fontFamily: 'Exo, sans-serif' }}>
              Chronicling the journey of knowledge acquisition...
            </p>
          </motion.div>

          {/* Education Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.5,
                  type: 'spring',
                  stiffness: 80
                }}
                className="relative"
              >
                {/* Floating Degree Container */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-md border-2 border-yellow-500/50 rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)'
                  }}
                >
                  {/* Ancient Patterns */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, #ffd700 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, #ffd700 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px'
                    }} />
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        edu.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                      }`}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      {edu.status}
                    </motion.div>
                    <div className="text-right">
                      <div className="text-yellow-400 text-sm">{edu.period}</div>
                      <div className="text-gray-400 text-xs">{edu.location}</div>
                    </div>
                  </div>

                  {/* Degree Info */}
                  <div className="mb-6">
                    <h2 
                      className="text-3xl font-bold text-yellow-300 mb-2"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {edu.degree}
                    </h2>
                    <h3 className="text-xl text-orange-300 mb-3">
                      {edu.field}
                    </h3>
                    <p className="text-lg text-yellow-200 font-semibold">
                      {edu.institution}
                    </p>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-lg font-bold text-yellow-300 mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
                      KEY HIGHLIGHTS
                    </h4>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.5 + idx * 0.1 + 1 }}
                          className="flex items-start space-x-3"
                        >
                          <motion.div 
                            className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: idx * 0.3
                            }}
                          />
                          <span className="text-gray-300">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Mystical Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent 70%)'
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.95, 1.05, 0.95]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 2
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education

