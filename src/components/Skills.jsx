import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { motion, AnimatePresence } from 'framer-motion'

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    color: '#e6e6e6',
    icon: '⚛️',
    position: [1.8, 0.5, 0],
    skills: [
      { name: 'React.js', level: 95, description: 'Advanced component architecture and hooks' },
      { name: 'JavaScript (ES6+)', level: 90, description: 'Modern JS features and async programming' },
      { name: 'HTML/CSS', level: 95, description: 'Semantic markup and responsive design' },
      { name: 'Tailwind CSS', level: 85, description: 'Utility-first CSS framework' },
      { name: 'Bootstrap', level: 80, description: 'Component-based UI framework' },
      { name: 'TypeScript', level: 75, description: 'Type-safe JavaScript development' },
      { name: 'Next.js', level: 80, description: 'Full-stack React framework' },
      { name: 'Vue.js', level: 70, description: 'Progressive JavaScript framework' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Development',
    color: '#d3d3d3',
    icon: '⚙️',
    position: [-1.8, 0.5, 0],
    skills: [
      { name: 'Java', level: 95, description: 'Enterprise application development' },
      { name: 'Spring Boot', level: 90, description: 'Microservices and REST APIs' },
      { name: 'Node.js', level: 85, description: 'Server-side JavaScript runtime' },
      { name: 'Express.js', level: 85, description: 'Web application framework' },
      { name: 'Python', level: 80, description: 'Scripting and web development' },
      { name: 'RESTful APIs', level: 90, description: 'API design and implementation' },
      { name: 'GraphQL', level: 75, description: 'Query language for APIs' },
      { name: 'Microservices', level: 80, description: 'Distributed system architecture' }
    ]
  },
  {
    id: 'database',
    name: 'Database Systems',
    color: '#aaaaaa',
    icon: '🗄️',
    position: [0, -1.8, 0],
    skills: [
      { name: 'MongoDB', level: 90, description: 'NoSQL document database' },
      { name: 'MySQL', level: 85, description: 'Relational database management' },
      { name: 'PostgreSQL', level: 80, description: 'Advanced SQL features' },
      { name: 'Redis', level: 75, description: 'In-memory data structure store' },
      { name: 'JDBC', level: 85, description: 'Java database connectivity' },
      { name: 'Mongoose', level: 80, description: 'MongoDB object modeling' },
      { name: 'Prisma', level: 70, description: 'Next-generation ORM' }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    color: '#888888',
    icon: '☁️',
    position: [0, 1.8, 0],
    skills: [
      { name: 'Google Cloud Platform', level: 80, description: 'Cloud infrastructure and services' },
      { name: 'AWS', level: 75, description: 'Amazon web services' },
      { name: 'Docker', level: 80, description: 'Containerization platform' },
      { name: 'Kubernetes', level: 70, description: 'Container orchestration' },
      { name: 'GitHub Actions', level: 75, description: 'CI/CD automation' },
      { name: 'Vercel', level: 85, description: 'Frontend deployment platform' },
      { name: 'Netlify', level: 80, description: 'JAMstack deployment' }
    ]
  },
  {
    id: 'tools',
    name: 'Development Tools',
    color: '#666666',
    icon: '🛠️',
    position: [1.2, -1.2, 0.8],
    skills: [
      { name: 'Git/GitHub', level: 90, description: 'Version control and collaboration' },
      { name: 'VS Code', level: 95, description: 'Code editor and extensions' },
      { name: 'Postman', level: 85, description: 'API testing and development' },
      { name: 'Maven', level: 80, description: 'Java project management' },
      { name: 'JUnit', level: 80, description: 'Java unit testing framework' },
      { name: 'Webpack', level: 75, description: 'Module bundler' },
      { name: 'Vite', level: 80, description: 'Fast build tool' }
    ]
  }
]

// NEW: Unique Saturn Ring Loading Animation (retained)
const UniqueSaturnRingLoading = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-80 h-80">
        {/* Central Saturn Planet */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #888888, #444444, #222222)',
            boxShadow: '0 0 30px rgba(136, 136, 136, 0.5), inset -5px -5px 10px rgba(0,0,0,0.3)'
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Animated Saturn Rings */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              borderColor: `rgba(${200 - i * 30}, ${200 - i * 30}, ${200 - i * 30}, ${0.8 - i * 0.1})`,
              borderStyle: 'dashed',
              borderDasharray: `${10 + i * 5} ${5 + i * 2}`
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { 
                duration: 6 + i * 2, 
                repeat: Infinity, 
                ease: "linear" 
              },
              scale: { 
                duration: 3 + i, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }
            }}
          />
        ))}

        {/* Orbiting Skill Points */}
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: category.color,
              boxShadow: `0 0 10px ${category.color}`,
              top: '50%',
              left: '50%',
              transformOrigin: '0 0'
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.5, 1]
            }}
            transition={{
              rotate: {
                duration: 4 + index,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }
            }}
            transform={`translate(-50%, -50%) translateY(-${80 + index * 20}px)`}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              opacity: 0.6
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Loading Text with Typewriter Effect */}
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div className="text-gray-300 text-xl font-mono tracking-wider mb-2">
            Saturn Cyclone
          </motion.div>
          <motion.div
            className="text-gray-500 text-sm font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Initializing Orbital Matrix...
          </motion.div>
          
          {/* Progress Rings */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// NEW: Subtle Saturn Atmospheric Background Component
const SubtleSaturnBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId = null

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Subtle atmospheric particles
    const particles = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        color: `hsl(${Math.random() * 30 + 200}, 30%, 70%)`,
        pulse: Math.random() * Math.PI * 2
      })
    }

    // Subtle ring effects
    const rings = []
    for (let i = 0; i < 3; i++) {
      rings.push({
        y: (canvas.height / 4) * i + canvas.height * 0.3,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.03 + Math.random() * 0.07,
        color: (i % 2 === 0) ? '#e6e6e6' : '#d3d3d3'
      })
    }

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.6
      )
      gradient.addColorStop(0, '#1a1a1a')
      gradient.addColorStop(0.5, '#0f0f0f')
      gradient.addColorStop(1, '#000000')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = timestamp * 0.001

      // Subtle ring effects
      rings.forEach((ring, index) => {
        ctx.globalAlpha = ring.opacity
        ctx.fillStyle = ring.color
        
        const waveOffset = Math.sin(time * 0.2 + index * 0.5) * 8
        const ringHeight = canvas.height / 30
        
        ctx.fillRect(0, ring.y + waveOffset, canvas.width, ringHeight)
      })

      // Subtle atmospheric particles
      particles.forEach((particle, index) => {
        particle.pulse += 0.01
        particle.x += particle.speedX + Math.sin(time + index) * 0.1
        particle.y += particle.speedY + Math.cos(time + index) * 0.05

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        const pulseOpacity = particle.opacity * (0.7 + Math.sin(particle.pulse) * 0.3)
        ctx.globalAlpha = pulseOpacity
        ctx.fillStyle = particle.color
        
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 2
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.shadowBlur = 0
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  )
}

// NEW: Refined Starfield with subtle twinkling
const RefinedStarfield = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      twinkleDelay: Math.random() * 3
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: star.twinkleDelay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Refined Saturn Planet with symbol and dot effect on hover
function RefinedSaturnPlanet({ onSkillClick, hoveredSkill, setHoveredSkill, selectedCategory, isPanelOpen }) {
  const planetRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const ring4Ref = useRef()
  const ring5Ref = useRef()
  const skillRefs = useRef([])

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002
      planetRef.current.rotation.x += 0.0005
    }
    
    // Subtle ring animations
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.008
    if (ring2Ref.current) ring2Ref.current.rotation.z -= 0.006
    if (ring3Ref.current) ring3Ref.current.rotation.z += 0.005
    if (ring4Ref.current) ring4Ref.current.rotation.z -= 0.004
    if (ring5Ref.current) ring5Ref.current.rotation.z += 0.003

    // Subtle skill point animations
    skillRefs.current.forEach((ref, index) => {
      if (ref) {
        const time = state.clock.elapsedTime
        ref.rotation.y += 0.01
        ref.position.y += Math.sin(time * 1.5 + index) * 0.005
        ref.position.x += Math.cos(time * 1.2 + index) * 0.003
      }
    })
  })

  return (
    <group>
      {/* Main Saturn Planet - Refined */}
      <mesh ref={planetRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshStandardMaterial 
          color="#666666" 
          transparent 
          opacity={0.9} 
          wireframe={false}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Saturn Wireframe Overlay - Subtle */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.85, 32, 32]} />
        <meshBasicMaterial color="#aaaaaa" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Refined Saturn Ring System - 5 Rings */}
      
      {/* Ring 1 - Innermost */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.2, 0.05, 8, 120]} />
        <meshBasicMaterial color="#e6e6e6" transparent opacity={0.8} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.1, 0, Math.PI / 8]}>
        <torusGeometry args={[4.8, 0.04, 8, 120]} />
        <meshBasicMaterial color="#d3d3d3" transparent opacity={0.6} />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 1.9, 0, Math.PI / 6]}>
        <torusGeometry args={[5.4, 0.03, 8, 120]} />
        <meshBasicMaterial color="#aaaaaa" transparent opacity={0.5} />
      </mesh>

      {/* Ring 4 */}
      <mesh ref={ring4Ref} rotation={[Math.PI / 1.8, 0, Math.PI / 4]}>
        <torusGeometry args={[6.0, 0.025, 8, 120]} />
        <meshBasicMaterial color="#888888" transparent opacity={0.4} />
      </mesh>

      {/* Ring 5 - Outermost */}
      <mesh ref={ring5Ref} rotation={[Math.PI / 1.7, 0, Math.PI / 3]}>
        <torusGeometry args={[6.6, 0.02, 8, 120]} />
        <meshBasicMaterial color="#666666" transparent opacity={0.3} />
      </mesh>

      {/* Reverted Skill Category Points with Symbol and Dot on Hover */}
      {!isPanelOpen && skillCategories.map((category, index) => (
        <group 
          key={category.id}
          ref={(el) => skillRefs.current[index] = el}
          position={category.position}
        >
          <mesh
            onClick={() => onSkillClick(category)}
            onPointerEnter={() => setHoveredSkill(category.id)}
            onPointerLeave={() => setHoveredSkill(null)}
          >
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshBasicMaterial 
              color={
                selectedCategory?.id === category.id 
                  ? category.color 
                  : hoveredSkill === category.id 
                    ? category.color 
                    : "#ffffff"
              } 
              transparent
              opacity={
                selectedCategory?.id === category.id 
                  ? 1 
                  : hoveredSkill === category.id 
                    ? 0.9 
                    : 0.7
              }
            />
          </mesh>
          
          {/* Reverted Elegant Hover Effect - Subtle Glow Ring */}
          {hoveredSkill === category.id && selectedCategory?.id !== category.id && (
            <>
              {/* Single elegant ring */}
              <mesh>
                <torusGeometry args={[0.35, 0.015, 8, 32]} />
                <meshBasicMaterial 
                  color={category.color} 
                  transparent 
                  opacity={0.6}
                />
              </mesh>
              
              {/* Subtle outer glow */}
              <mesh>
                <torusGeometry args={[0.5, 0.008, 8, 32]} />
                <meshBasicMaterial 
                  color={category.color} 
                  transparent 
                  opacity={0.3}
                />
              </mesh>
            </>
          )}

          {/* Reverted HTML Label with Symbol and Dot on Hover */}
          <Html position={[0, 0.6, 0]} center>
            <motion.div 
              className="relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onSkillClick(category)
              }}
              onMouseEnter={() => setHoveredSkill(category.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              animate={{
                scale: (hoveredSkill === category.id && selectedCategory?.id !== category.id) ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: (selectedCategory?.id !== category.id) ? 1.15 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Reverted Subtle Glow Background */}
              <motion.div
                className="absolute inset-0 rounded-xl blur-lg"
                style={{ 
                  backgroundColor: category.color,
                  opacity: (hoveredSkill === category.id && selectedCategory?.id !== category.id) ? 0.3 : 0.1
                }}
                animate={{
                  opacity: (hoveredSkill === category.id && selectedCategory?.id !== category.id) ? [0.3, 0.5, 0.3] : 0.1
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Reverted Main Container - Symbol and Dot Logic */}
              <div 
                className="relative bg-black/80 px-4 py-3 rounded-xl backdrop-blur-md border"
                style={{ 
                  borderColor: (hoveredSkill === category.id && selectedCategory?.id !== category.id) 
                    ? category.color 
                    : selectedCategory?.id === category.id
                      ? category.color
                      : 'rgba(255,255,255,0.1)',
                  boxShadow: (hoveredSkill === category.id && selectedCategory?.id !== category.id) 
                    ? `0 0 20px ${category.color}30, inset 0 0 10px ${category.color}10`
                    : selectedCategory?.id === category.id
                      ? `0 0 10px ${category.color}20, inset 0 0 5px ${category.color}05`
                      : '0 0 8px rgba(0,0,0,0.4)'
                }}
              >
                <AnimatePresence>
                  {(hoveredSkill === category.id && selectedCategory?.id !== category.id) ? (
                    <motion.span 
                      key="icon"
                      className="text-2xl filter grayscale-0"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {category.icon}
                    </motion.span>
                  ) : (
                    <motion.div 
                      key="dot"
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </Html>

          {/* Reverted Refined Hover Tooltip */}
          {hoveredSkill === category.id && selectedCategory?.id !== category.id && (
            <Html position={[0, -0.8, 0]} center>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {/* Subtle Glow Background */}
                <div
                  className="absolute inset-0 rounded-xl blur-md"
                  style={{ 
                    backgroundColor: category.color,
                    opacity: 0.15
                  }}
                />
                
                {/* Main Tooltip - Refined */}
                <div 
                  className="relative text-white text-sm font-mono bg-black/90 px-4 py-3 rounded-xl backdrop-blur-md border whitespace-nowrap"
                  style={{ 
                    borderColor: `${category.color}40`,
                    boxShadow: `0 0 10px ${category.color}15`
                  }}
                >
                  <div className="font-semibold text-base mb-1">{category.name}</div>
                  <div className="text-gray-300 text-xs">{category.skills.length} Skills • Expert Level</div>
                </div>
              </motion.div>
            </Html>
          )}
        </group>
      ))}

      {/* Refined Saturn Moons */}
      <mesh position={[4, -2.5, 3]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#888888" transparent opacity={0.8} />
      </mesh>

      <mesh position={[-3.5, 3, -2.5]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#aaaaaa" transparent opacity={0.7} />
      </mesh>

      <mesh position={[2.5, 3.5, 2]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#cccccc" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

// NEW: Compact Skills Display Panel (retained)
const CompactSkillsPanel = ({ category, onClose, filteredSkills }) => {
  if (!category) return null

  const displaySkills = filteredSkills || category.skills

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 h-2/3 z-50 overflow-y-auto"
        style={{
          background: `
            linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%)
          `,
          backdropFilter: 'blur(20px)',
          borderTop: `3px solid ${category.color}`,
          borderRadius: '20px 20px 0 0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          {/* Compact Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg"
                style={{
                  backgroundColor: `${category.color}20`,
                  borderColor: category.color,
                  boxShadow: `0 0 20px ${category.color}30`
                }}
              >
                <span>{category.icon}</span>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white font-mono">{category.name}</h3>
                <p className="text-sm text-gray-400 font-mono">{displaySkills.length} Skills</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-lg">×</span>
            </motion.button>
          </motion.div>

          {/* Compact Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displaySkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
              >
                <motion.div 
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-gray-800/50 hover:border-gray-700/70"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold text-lg font-mono">{skill.name}</h4>
                    <span 
                      className="text-sm font-mono px-2 py-1 rounded-full border"
                      style={{ 
                        color: category.color,
                        borderColor: `${category.color}40`,
                        backgroundColor: `${category.color}10`
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Compact Progress Bar */}
                  <div className="w-full h-2 bg-gray-900/70 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: category.color
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-400 leading-relaxed font-mono">{skill.description}</p>

                  {/* Skill Level Indicator */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.floor(skill.level / 20) ? 'bg-gray-300' : 'bg-gray-700'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.03 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Compact Category Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 rounded-xl border border-gray-800/40"
            style={{
              background: `linear-gradient(135deg, ${category.color}05 0%, transparent 100%)`,
              borderColor: `${category.color}30`
            }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <motion.div 
                  className="text-2xl font-bold text-gray-300 font-mono"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  {Math.round(displaySkills.reduce((sum, skill) => sum + skill.level, 0) / displaySkills.length)}%
                </motion.div>
                <div className="text-xs text-gray-500 font-mono">Average</div>
              </div>
              <div>
                <motion.div 
                  className="text-2xl font-bold text-gray-300 font-mono"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  {displaySkills.length}
                </motion.div>
                <div className="text-xs text-gray-500 font-mono">Skills</div>
              </div>
              <div>
                <motion.div 
                  className="text-2xl font-bold text-gray-300 font-mono"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                >
                  {displaySkills.filter(skill => skill.level >= 80).length}
                </motion.div>
                <div className="text-xs text-gray-500 font-mono">Expert+</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [filteredSkills, setFilteredSkills] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleSkillClick = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null)
      setFilteredSkills(null)
    } else {
      setSelectedCategory(category)
      setFilteredSkills(category.skills)
    }
  }

  // Loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000) // 4 seconds for the new loading animation

    return () => clearTimeout(timer)
  }, [])

  // Hide scrollbar globally
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      html, body {
        overflow-x: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      html::-webkit-scrollbar, body::-webkit-scrollbar {
        display: none;
      }
      
      * {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      *::-webkit-scrollbar {
        display: none;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden relative">
      {/* NEW: Unique Saturn Ring Loading Animation */}
      <AnimatePresence>
        {isLoading && <UniqueSaturnRingLoading />}
      </AnimatePresence>

      {/* Subtle Saturn Atmospheric Background */}
      <SubtleSaturnBackground />
      
      {/* Refined Starfield */}
      <RefinedStarfield />

      {/* Navigation Dots (Left Side) - Fixed positioning */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
      </div>
      
      {/* FIXED: RE-INTEGRATED VIDEO BACKGROUND with improved visibility */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.25 
        }}
      >
        <source src="/assets/images/saturn-vortex.mp4" type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-8 left-8 z-10"
      >
        <motion.div
          className="flex items-center space-x-4 px-6 py-2.5 rounded-2xl border border-gray-500/40 bg-black/80 backdrop-blur-md"
          animate={{
            boxShadow: [
              '0 0 12px rgba(200, 200, 200, 0.15)',
              '0 0 24px rgba(255, 255, 255, 0.25)',
              '0 0 12px rgba(200, 200, 200, 0.15)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="w-[10px] h-[10px] rounded-full bg-gray-300"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
              backgroundColor: ['#c7c7c7', '#ffffff', '#c7c7c7'],
              boxShadow: [
                '0 0 8px rgba(200, 200, 200, 0.5)',
                '0 0 16px rgba(255, 255, 255, 0.8)',
                '0 0 8px rgba(200, 200, 200, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <span className="text-base font-bold tracking-widest text-gray-100 font-mono uppercase">
            Saturn Mode
          </span>
        </motion.div>
      </motion.div>

      {/* Refined Main Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-20 left-0 right-0 z-10"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center leading-none tracking-wider font-mono drop-shadow-2xl">
          SATURN CYCLONE
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-300 text-lg font-mono text-center mt-4 drop-shadow-lg"
        >
          Orbiting Through the Spiral of Technical Expertise
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-gray-400 text-sm font-mono text-center mt-2 drop-shadow-lg"
        >
          Each skill represents a category ring. Spinning through the storm of Saturn's atmosphere.
        </motion.p>
      </motion.div>

      {/* Left Panel - Refined positioning */}
      <div className="absolute left-8 bottom-32 z-10">
        <div className="space-y-3 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-gray-600/30">
          <div>
            <div className="text-xs font-mono text-gray-400 mb-1">ORBITAL VIEWPORT</div>
            <div className="text-xl font-bold text-white">SKILLS MATRIX</div>
            <div className="text-sm font-mono text-gray-300">S19.25</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Refined Instructions */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="border border-gray-600/30 rounded-xl p-4 bg-black/80 backdrop-blur-lg max-w-xs"
        >
          <div className="text-orange-400 text-xs font-mono mb-3">NAVIGATION PROTOCOL:</div>
          <div className="space-y-2 text-xs font-mono text-gray-200">
            <div>1. HOVER OVER SKILL POINTS TO VIEW DETAILS</div>
            <div>2. CLICK TO EXPLORE SKILL CATEGORIES</div>
            <div>3. USE MOUSE TO ROTATE AND EXPLORE SATURN</div>
            <div>4. ZOOM IN/OUT FOR DETAILED INSPECTION</div>
          </div>
        </motion.div>
      </div>

      {/* FIXED: Bottom Center Instructions - Enhanced visibility */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl border border-gray-600/20"
      >
        <div className="text-center text-sm font-mono text-gray-200">
          <div>Move your mouse to explore • Click skill points to view details</div>
          <div className="text-xs mt-1 text-gray-300">Experience the gravitational pull of knowledge</div>
        </div>
      </motion.div>

      {/* Bottom Right Indicator - Refined */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 right-8 z-10"
      >
        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div 
            className="w-3 h-3 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Refined 3D Scene */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} className="absolute inset-0">
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[15, 15, 15]} intensity={0.4} />
        <pointLight position={[-15, -15, -15]} intensity={0.2} color="#888888" />
        <pointLight position={[0, 0, 20]} intensity={0.3} color="#aaaaaa" />

        <RefinedSaturnPlanet 
          onSkillClick={handleSkillClick}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
          selectedCategory={selectedCategory}
          isPanelOpen={!!selectedCategory} // Pass isPanelOpen prop
        />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.2}
          minDistance={6}
          maxDistance={20}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>

      {/* NEW: Compact Skills Display Panel (retained) */}
      {selectedCategory && (
        <CompactSkillsPanel 
          category={selectedCategory}
          onClose={() => {
            setSelectedCategory(null)
            setFilteredSkills(null)
          }}
          filteredSkills={filteredSkills}
        />
      )}
    </div>
  )
}




