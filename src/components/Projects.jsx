import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const projects = [
  {
    id: 1,
    title: 'Instabuy',
    subtitle: 'Full Stack E-commerce Platform',
    description: 'Built a full-stack e-commerce app supporting buyers and sellers with JWT auth, Zustand cart/favorites, order tracking, and CSV-based product uploads.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Zustand', 'Tailwind CSS'],
    features: [
      'JWT authentication and authorization',
      'Zustand state management for cart and favorites',
      'Real-time order tracking system',
      'CSV-based product upload functionality',
      'Seller dashboards with inventory management',
      'RESTful APIs with modular backend architecture'
    ],
    color: '#ff9500',
    status: 'Deployed',
    link: 'https://github.com/Vineeth0502/Instabuy.git',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Recyclable Waste Identification',
    subtitle: 'ML Model for Waste Management',
    description: 'Developed and optimized machine learning models using TensorFlow and neural networks for recyclable solid waste identification.',
    technologies: ['Python', 'TensorFlow', 'Neural Networks', 'OpenCV', 'Scikit-learn', 'Pandas'],
    features: [
      '15% increase in waste sorting efficiency',
      'Enhanced model accuracy by 15%',
      'Reduced false positives by 10%',
      '30% reduction in processing time',
      'Advanced deep learning techniques',
      'Feature engineering and selection methods'
    ],
    color: '#d2691e',
    status: 'Research',
    link: 'https://github.com/yourusername/recyclable-waste-ml',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Community Lost & Found',
    subtitle: 'Real-time Community Application',
    description: 'Architected a full-stack application to connect users with their lost items, featuring responsive UI and real-time notifications.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
    features: [
      'Responsive user interface with React.js',
      'Real-time notifications via Socket.io',
      'Efficient data storage and retrieval',
      'User authentication and authorization',
      'Image upload and management',
      'Location-based item matching'
    ],
    color: '#ffa500',
    status: 'Completed',
    link: 'https://github.com/Vineeth0502/lost-found.git',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Realtime Collaborative Coding',
    subtitle: 'Multi-user Development Platform',
    description: 'Developed a real-time collaborative coding platform enabling simultaneous code editing with live updates and syntax highlighting.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Monaco Editor', 'Git API'],
    features: [
      'Real-time multi-user code editing',
      'Live syntax highlighting and updates',
      'Collaborative debugging features',
      'Version control integration',
      'Breakpoints and variable inspection',
      'Seamless developer experience'
    ],
    color: '#cd853f',
    status: 'Active',
    link: 'https://github.com/Vineeth0502/Realtime-Collaborative-Coding-Platform.git',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'LEO - AI Virtual Assistant',
    subtitle: 'Voice-Controlled AI Assistant',
    description: 'Engineered an AI-powered virtual assistant with advanced speech recognition and intuitive GUI built with PyQt5.',
    technologies: ['Python', 'PyQt5', 'Speech Recognition', 'NLP', 'Machine Learning', 'APIs'],
    features: [
      'Advanced speech recognition capabilities',
      'Intuitive graphical user interface',
      'Voice command automation',
      'Task execution and productivity features',
      'Natural language processing',
      'Seamless integration with daily tasks'
    ],
    color: '#daa520',
    status: 'Prototype',
    link: 'https://github.com/Vineeth0502/Leo.git',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'BaatCheeth',
    subtitle: 'Real-Time Android Chat App',
    description: 'Developed a high-performance real-time chat application leveraging Firebase for backend services and Java for Android development.',
    technologies: ['Java', 'Android', 'Firebase', 'Real-time Database', 'Authentication', 'Cloud Storage'],
    features: [
      'Real-time messaging capabilities',
      'Firebase backend integration',
      'Secure user authentication',
      'Cloud storage for user data',
      'Scalable and responsive design',
      'Cross-device synchronization'
    ],
    color: '#b8860b',
    status: 'Mobile',
    link: 'https://github.com/Vineeth0502/BaatCheeth.git',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop'
  }
]

// Jupiter Storm Swirling Particles Effect Component
const JupiterStormParticles = ({ position = [0, 0], size = 300, intensity = 1 }) => {
  const containerRef = useRef()
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate storm particles with swirling motion
    const initialParticles = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      angle: (i / 120) * Math.PI * 2,
      radius: 20 + Math.random() * 120,
      speed: 0.015 + Math.random() * 0.025,
      size: 1.5 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.6,
      color: Math.random() > 0.6 ? '#ff9500' : Math.random() > 0.3 ? '#d2691e' : '#ffa500',
      stormPhase: Math.random() * Math.PI * 2,
      layer: Math.floor(Math.random() * 3) // Different storm layers
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
      {/* Main swirling storm particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            filter: 'blur(0.5px)'
          }}
          animate={{
            x: [
              Math.cos(particle.angle) * particle.radius + Math.sin(particle.stormPhase) * 30,
              Math.cos(particle.angle + Math.PI * 2) * particle.radius + Math.sin(particle.stormPhase + Math.PI) * 30
            ],
            y: [
              Math.sin(particle.angle) * particle.radius * 0.6 + Math.cos(particle.stormPhase) * 20,
              Math.sin(particle.angle + Math.PI * 2) * particle.radius * 0.6 + Math.cos(particle.stormPhase + Math.PI) * 20
            ],
            opacity: [
              particle.opacity * 0.4,
              particle.opacity,
              particle.opacity * 0.4
            ],
            scale: [0.6, 1.3, 0.6]
          }}
          transition={{
            duration: 12 + particle.layer * 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Great Red Spot simulation */}
      {Array.from({ length: 60 }, (_, i) => (
        <motion.div
          key={`spot-${i}`}
          className="absolute rounded-full"
          style={{
            width: '2px',
            height: '2px',
            background: i % 3 === 0 ? '#ff4500' : i % 3 === 1 ? '#ff6500' : '#ff8500',
            boxShadow: `0 0 10px ${i % 3 === 0 ? '#ff4500' : i % 3 === 1 ? '#ff6500' : '#ff8500'}`
          }}
          animate={{
            x: [
              Math.cos(i * 0.105) * 40 + Math.sin(i * 0.2) * 80,
              Math.cos(i * 0.105 + Math.PI * 6) * 40 + Math.sin(i * 0.2 + Math.PI * 3) * 80
            ],
            y: [
              Math.sin(i * 0.105) * 25 + Math.cos(i * 0.15) * 50,
              Math.sin(i * 0.105 + Math.PI * 6) * 25 + Math.cos(i * 0.15 + Math.PI * 3) * 50
            ],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Jupiter bands simulation */}
      {Array.from({ length: 5 }, (_, bandIndex) => (
        <motion.div
          key={`band-${bandIndex}`}
          className="absolute"
          style={{
            width: '100%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${bandIndex % 2 === 0 ? '#d2691e' : '#ffa500'}, transparent)`,
            top: `${20 + bandIndex * 15}%`,
            left: 0
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 6 + bandIndex * 2,
            repeat: Infinity,
            delay: bandIndex * 1.5,
            ease: "linear"
          }}
        />
      ))}

      {/* Central storm core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '30px',
          height: '30px',
          background: 'radial-gradient(circle, rgba(255,149,0,0.9), rgba(210,105,30,0.6), transparent)',
          borderRadius: '50%',
          filter: 'blur(3px)'
        }}
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.6, 1, 0.6],
          rotate: 360
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

// Enhanced Jupiter Loading Screen
const JupiterStormLoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 25%, #4a2c1a 50%, #2d1810 75%, #1a0f0a 100%)'
      }}
    >
      {/* Swirling gas bands animation */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, rgba(255,149,0,0.1) 20%, transparent 40%),
            linear-gradient(90deg, transparent 20%, rgba(210,105,30,0.1) 60%, transparent 80%),
            linear-gradient(90deg, transparent 40%, rgba(255,165,0,0.1) 80%, transparent 100%)
          `
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Rotating Jupiter with Storm System */}
      <motion.div className="relative w-48 h-48 mb-8">
        {/* Jupiter Core */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: `
              conic-gradient(from 0deg, 
                #ff9500 0deg, 
                #d2691e 60deg, 
                #ffa500 120deg, 
                #cd853f 180deg, 
                #daa520 240deg, 
                #b8860b 300deg, 
                #ff9500 360deg
              )
            `,
            boxShadow: '0 0 60px rgba(255, 149, 0, 0.8), 0 0 120px rgba(255, 149, 0, 0.4)'
          }}
        >
          <div 
            className="w-24 h-24 rounded-full relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at 30% 30%, #ff9500, #d2691e 40%, #cd853f 70%, #8b4513 100%)`
            }}
          >
            {/* Great Red Spot */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-2/5 right-1/5 w-6 h-4 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, #ff4500, #ff6500)',
                boxShadow: '0 0 15px #ff4500'
              }}
            />
            
            {/* Gas bands */}
            {Array.from({ length: 4 }, (_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: ['-100%', '100%']
                }}
                transition={{ 
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.5
                }}
                className="absolute w-full h-1"
                style={{
                  top: `${20 + i * 15}%`,
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#d2691e' : '#ffa500'}, transparent)`,
                  opacity: 0.7
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Storm particles around Jupiter */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              rotate: { duration: 10 + i * 0.3, repeat: Infinity, ease: "linear" },
              scale: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? '#ff9500' : i % 3 === 1 ? '#d2691e' : '#ffa500',
              transform: `translate(-50%, -50%) rotate(${i * 12}deg) translateY(-${80 + Math.random() * 40}px)`,
              boxShadow: `0 0 12px ${i % 3 === 0 ? '#ff9500' : i % 3 === 1 ? '#d2691e' : '#ffa500'}`
            }}
          />
        ))}

        {/* Add Jupiter Storm Particles to Loading Screen */}
        <JupiterStormParticles position={[96, 96]} size={350} intensity={1.8} />
      </motion.div>
      
      <motion.h1
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-3xl font-bold text-center mb-4"
        style={{
          color: '#ff9500',
          fontFamily: 'Orbitron, monospace',
          letterSpacing: '0.1em',
          textShadow: '0 0 25px rgba(255, 149, 0, 0.8), 0 0 50px rgba(255, 149, 0, 0.4)'
        }}
      >
        JUPITER STORM LOADING
      </motion.h1>
      
      <motion.p
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="text-lg text-center"
        style={{
          color: '#d2691e',
          fontFamily: 'Inter, sans-serif',
          textShadow: '0 0 12px rgba(210, 105, 30, 0.6)'
        }}
      >
        Initializing gas giant environment...
      </motion.p>
    </motion.div>
  )
}

// Jupiter Atmospheric Background Component - Fixed and Fitted
const JupiterAtmosphericBackground = () => {
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

    // Jupiter atmospheric particles
    const particles = []
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        color: `hsl(${Math.random() * 60 + 20}, 85%, 65%)`,
        pulse: Math.random() * Math.PI * 2
      })
    }

    // Gas bands
    const gasBands = []
    for (let i = 0; i < 6; i++) {
      gasBands.push({
        y: (canvas.height / 6) * i,
        speed: 0.3 + Math.random() * 0.8,
        opacity: 0.08 + Math.random() * 0.12,
        color: i % 2 === 0 ? '#ff9500' : '#d2691e'
      })
    }

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Jupiter atmospheric gradient - fitted to screen
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, Math.min(canvas.width, canvas.height) * 0.6
      )
      gradient.addColorStop(0, 'rgba(255, 149, 0, 0.3)')
      gradient.addColorStop(0.3, 'rgba(210, 105, 30, 0.2)')
      gradient.addColorStop(0.6, 'rgba(139, 69, 19, 0.15)')
      gradient.addColorStop(0.8, 'rgba(101, 67, 33, 0.1)')
      gradient.addColorStop(1, 'rgba(47, 27, 12, 0.05)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = timestamp * 0.001

      // Animated gas bands
      gasBands.forEach((band, index) => {
        ctx.globalAlpha = band.opacity
        ctx.fillStyle = band.color
        
        const waveOffset = Math.sin(time * 0.3 + index * 0.5) * 15
        const bandHeight = canvas.height / 10
        
        ctx.fillRect(0, band.y + waveOffset, canvas.width, bandHeight)
      })

      // Atmospheric particles
      particles.forEach((particle, index) => {
        particle.pulse += 0.015
        particle.x += particle.speedX + Math.sin(time + index) * 0.2
        particle.y += particle.speedY + Math.cos(time + index) * 0.15

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        const pulseOpacity = particle.opacity * (0.7 + Math.sin(particle.pulse) * 0.3)
        ctx.globalAlpha = pulseOpacity
        ctx.fillStyle = particle.color
        
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 3
        
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
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

// Enhanced Scroll to Top Button Component with Main Heading Visibility Detection
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMainHeadingVisible, setIsMainHeadingVisible] = useState(true)
  const mainHeadingRef = useRef(null)

  useEffect(() => {
    // Create intersection observer for main heading
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        setIsMainHeadingVisible(entry.isIntersecting)
      },
      { 
        threshold: 0.1, // Trigger when 10% of the heading is visible
        rootMargin: '0px 0px -50px 0px' // Add some margin to trigger earlier
      }
    )

    // Find the main heading element (assuming it has a specific class or ID)
    const mainHeading = document.querySelector('[data-main-heading]') || 
                       document.querySelector('h1') || 
                       document.querySelector('.main-heading')
    
    if (mainHeading) {
      mainHeadingRef.current = mainHeading
      headingObserver.observe(mainHeading)
    }

    // Scroll position observer
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      if (mainHeadingRef.current) {
        headingObserver.unobserve(mainHeadingRef.current)
      }
      headingObserver.disconnect()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Show button only when scrolled down AND main heading is not visible
  const shouldShowButton = isVisible && !isMainHeadingVisible

  return (
    <AnimatePresence>
      {shouldShowButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full backdrop-blur-xl border-2 cursor-pointer"
          style={{
            background: 'rgba(255, 149, 0, 0.15)',
            borderColor: '#ff9500',
            boxShadow: '0 0 30px rgba(255, 149, 0, 0.4)',
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 40px rgba(255, 149, 0, 0.6)',
            background: 'rgba(255, 149, 0, 0.25)'
          }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Animated Arrow */}
          <motion.div
            className="w-6 h-6 flex items-center justify-center"
            animate={{
              y: [0, -3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M12 4L12 20M12 4L6 10M12 4L18 10"
                stroke="#ff9500"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 149, 0, 0.8))'
                }}
              />
            </svg>
          </motion.div>

          {/* Pulsing Ring Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: '#ff9500'
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />

          {/* Jupiter Storm Particles around button */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: '#ff9500',
                boxShadow: '0 0 6px #ff9500',
                left: '50%',
                top: '50%'
              }}
              animate={{
                x: [0, Math.cos(i * 0.785) * 25],
                y: [0, Math.sin(i * 0.785) * 25],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Sequential Project Card Component (No Stacking)
const SequentialProjectCard = ({ project, index, isMobile }) => {
  const cardRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  // Scroll-triggered animation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="mb-16" // Changed from sticky to regular margin for sequential layout
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "easeOut"
        }
      } : {}}
    >
      <motion.div
        className={`mx-auto max-w-6xl ${isMobile ? 'px-4' : 'px-8'}`}
        animate={isInView ? {
          y: [0, -10, 0],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }}
      >
        <motion.div
          className="relative p-8 rounded-3xl backdrop-blur-xl border-2 overflow-hidden"
          style={{
            background: 'rgba(139, 69, 19, 0.3)',
            borderColor: project.color,
            boxShadow: `0 20px 60px ${project.color}40, inset 0 0 60px rgba(255, 255, 255, 0.08)`,
            minHeight: isMobile ? '600px' : '700px'
          }}
        >
          {/* Left-to-Right Transition Effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${project.color}40 50%, transparent 100%)`,
              width: '200%',
              left: '-100%'
            }}
            animate={isInView ? {
              left: ['-100%', '100%']
            } : {}}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.5 + index * 0.2
            }}
          />

          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 opacity-15 rounded-3xl"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, ${project.color}50, transparent 70%),
                radial-gradient(circle at 70% 70%, ${project.color}30, transparent 70%),
                linear-gradient(135deg, ${project.color}20, transparent, ${project.color}20)
              `,
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Morphing Border Effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(45deg, ${project.color}60, transparent, ${project.color}60)`,
              backgroundSize: '200% 200%',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '2px'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          <div className="relative z-10">
            {/* Header Section */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'} mb-8`}>
              {/* Project Info */}
              <div className="flex flex-col justify-center">
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  {/* Project Number */}
                  <motion.div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{ 
                      background: `linear-gradient(135deg, ${project.color}40, ${project.color}70)`,
                      color: project.color,
                      border: `2px solid ${project.color}80`
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>

                  {/* Status Badge */}
                  <motion.div 
                    className="px-6 py-3 rounded-full text-sm font-bold"
                    style={{ 
                      background: `${project.color}25`,
                      color: project.color,
                      border: `2px solid ${project.color}60`
                    }}
                  >
                    {project.status}
                  </motion.div>
                </motion.div>

                {/* Title and Subtitle */}
                <motion.h2 
                  className={`${isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'} font-bold mb-4`}
                  style={{ 
                    fontFamily: 'Orbitron, monospace',
                    background: `linear-gradient(135deg, ${project.color}, #ffffff, ${project.color})`,
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + index * 0.1,
                    backgroundPosition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                  }}
                >
                  {project.title}
                </motion.h2>

                <motion.h3 
                  className={`${isMobile ? 'text-xl' : 'text-2xl lg:text-3xl'} text-gray-300 mb-6 font-semibold`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  {project.subtitle}
                </motion.h3>

                <motion.p 
                  className={`text-gray-400 ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed mb-6`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  {project.description}
                </motion.p>

                {/* Project Link */}
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 w-fit ${isMobile ? 'text-sm' : 'text-base'}`}
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                    color: project.color,
                    border: `2px solid ${project.color}60`,
                    boxShadow: `0 0 20px ${project.color}30`
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 30px ${project.color}50`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Project</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>

              {/* Project Image */}
              <motion.div
                className={`${isMobile ? 'order-first' : ''} relative`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <div 
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    height: isMobile ? '250px' : '350px',
                    border: `2px solid ${project.color}40`,
                    boxShadow: `0 0 30px ${project.color}30`
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(45deg, ${project.color}20, transparent, ${project.color}20)`
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Content Grid */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'lg:grid-cols-2 gap-8'}`}>
              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              >
                <h4 
                  className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`}
                  style={{ 
                    color: project.color,
                    fontFamily: 'Inter, sans-serif',
                    textShadow: `0 0 20px ${project.color}60`,
                  }}
                >
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className={`px-4 py-3 rounded-xl ${isMobile ? 'text-sm' : 'text-base'} font-medium border`}
                      style={{
                        background: `${project.color}15`,
                        color: project.color,
                        borderColor: `${project.color}50`
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1
                      } : {}}
                      transition={{ 
                        delay: 0.8 + index * 0.1 + idx * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              >
                <h4 
                  className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`}
                  style={{ 
                    color: project.color,
                    fontFamily: 'Inter, sans-serif',
                    textShadow: `0 0 20px ${project.color}60`,
                  }}
                >
                  KEY FEATURES
                </h4>
                <div className="space-y-4">
                  {project.features.slice(0, 4).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 + idx * 0.1 }}
                    >
                      <motion.div 
                        className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: project.color }}
                        animate={{
                          boxShadow: [
                            `0 0 10px ${project.color}60`,
                            `0 0 25px ${project.color}80`,
                            `0 0 10px ${project.color}60`,
                          ],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3,
                        }}
                      />
                      <span 
                        className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Jupiter Storm Particles */}
          <JupiterStormParticles 
            position={[0, 0]} 
            size={isMobile ? 200 : 300} 
            intensity={0.3} 
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Enhanced Main Heading Component with data attribute for targeting
const EnhancedMainHeading = ({ isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 3.8 }}
      className="text-center mb-16 relative"
      data-main-heading // Add this attribute for targeting by the scroll button
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse at center, #ff9500 0%, transparent 70%)',
            'radial-gradient(ellipse at center, #d2691e 0%, transparent 70%)',
            'radial-gradient(ellipse at center, #ffa500 0%, transparent 70%)',
            'radial-gradient(ellipse at center, #ff9500 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h1 
        className={`${isMobile ? 'text-5xl' : 'text-7xl md:text-8xl lg:text-9xl'} font-bold mb-6 relative z-10`}
        style={{ 
          fontFamily: 'Orbitron, monospace',
          background: 'linear-gradient(45deg, #ff9500, #d2691e, #ffa500, #cd853f, #daa520, #ff9500)',
          backgroundSize: '400% 400%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 60px rgba(255, 149, 0, 0.8)',
          filter: 'drop-shadow(0 0 30px rgba(255, 149, 0, 0.6))'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 60px rgba(255, 149, 0, 0.8)',
              '0 0 80px rgba(255, 149, 0, 1)',
              '0 0 60px rgba(255, 149, 0, 0.8)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          DEVELOPER
        </motion.span>
        <br />
        <motion.span
          animate={{
            textShadow: [
              '0 0 60px rgba(210, 105, 30, 0.8)',
              '0 0 80px rgba(210, 105, 30, 1)',
              '0 0 60px rgba(210, 105, 30, 0.8)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          DOCKYARD
        </motion.span>
      </motion.h1>

      <motion.div
        className="flex items-center justify-center gap-4 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 4.2 }}
      >
        <motion.div
          className="w-16 h-1 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #ff9500, transparent)' }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="w-4 h-4 rounded-full"
          style={{ background: '#ff9500', boxShadow: '0 0 20px #ff9500' }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="w-16 h-1 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #ff9500, transparent)' }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>

      <motion.p 
        className={`${isMobile ? 'text-lg px-4' : 'text-xl lg:text-2xl'} text-orange-300 relative z-10`} 
        style={{ 
          fontFamily: 'Exo, sans-serif',
          textShadow: '0 0 20px rgba(255, 165, 0, 0.6)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.5 }}
      >
        Navigating through the gas giant's storm systems of innovation
      </motion.p>

      {/* Floating particles around heading */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 3 === 0 ? '#ff9500' : i % 3 === 1 ? '#d2691e' : '#ffa500',
            boxShadow: `0 0 15px ${i % 3 === 0 ? '#ff9500' : i % 3 === 1 ? '#d2691e' : '#ffa500'}`,
            left: `${10 + (i * 7)}%`,
            top: `${20 + Math.sin(i) * 30}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}

// Main Projects Component with Fixed Background and Sequential Cards
const JupiterProjects = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3200)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      clearTimeout(loadingTimer)
    }
  }, [])

  // Hide scrollbar globally
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      html, body {
        overflow-x: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        scroll-behavior: smooth;
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
    <>
      <AnimatePresence>
        <JupiterStormLoadingScreen isLoading={isLoading} />
      </AnimatePresence>

      <div className="min-h-screen relative">
        {/* Jupiter Mode Indicator - Fixed Position */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 3.5 }}
          className="fixed top-4 left-4 z-50"
        >
          <div className="bg-black/60 backdrop-blur-lg border border-orange-400/50 rounded-2xl p-3 shadow-2xl">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-3 h-3 bg-orange-400 rounded-full" 
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(255, 149, 0, 0.6)',
                    '0 0 25px rgba(255, 149, 0, 1)',
                    '0 0 10px rgba(255, 149, 0, 0.6)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-orange-400 text-sm font-mono font-bold tracking-wider">
                JUPITER MODE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Scroll to Top Button */}
        <ScrollToTopButton />

        {/* Fixed Jupiter Atmospheric Background */}
        <JupiterAtmosphericBackground />

        {/* Fixed Gas Giant Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/assets/images/thunderstorm.mp4" type="video/mp4" />
        </video>

        {/* Fixed Dark Overlay */}
        <div 
          className="fixed inset-0"
          style={{ 
            background: 'rgba(0, 0, 0, 0.75)',
            zIndex: -1
          }}
        />

        {/* Scrollable Content */}
        <div className="relative z-10">
          {/* Hero Section with Enhanced Heading */}
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <EnhancedMainHeading isMobile={isMobile} />
            
            <motion.div
              className="text-orange-400 text-lg font-mono mt-12"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓ SCROLL TO EXPLORE PROJECTS ↓
            </motion.div>
          </div>

          {/* Sequential Projects Section */}
          <div className="relative">
            {projects.map((project, index) => (
              <SequentialProjectCard
                key={project.id}
                project={project}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Footer */}
          <motion.div
            className="text-center py-20 px-4 relative z-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center space-x-4 px-8 py-4 rounded-full backdrop-blur-xl border-2"
              style={{
                background: 'rgba(255, 149, 0, 0.1)',
                borderColor: '#ff9500',
                boxShadow: '0 0 40px rgba(255, 149, 0, 0.3)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 60px rgba(255, 149, 0, 0.5)',
              }}
            >
              <motion.div
                className="w-3 h-3 bg-orange-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="text-orange-300 font-mono text-sm tracking-wider">
                POWERED BY JUPITER'S LIGHTNING STORMS
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  )
}

export default JupiterProjects

