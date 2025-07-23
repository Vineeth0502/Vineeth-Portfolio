import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    color: '#ff6b35',
    icon: '/assets/images/control-panel.jpg'
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
    color: '#d2691e',
    icon: '/assets/images/satellite.jpg'
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
    color: '#cd853f',
    icon: '/assets/images/spaceship.jpg'
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
    color: '#a0522d',
    icon: '/assets/images/space-station.jpg'
  }
]

// OPTIMIZED MARS BACKGROUND WITH VISIBLE EFFECTS AND SMALLER PARTICLES
const OptimizedMarsBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const dustParticlesRef = useRef([])
  const emberParticlesRef = useRef([])
  const meteorParticlesRef = useRef([])
  const starParticlesRef = useRef([])
  const volcanoRef = useRef({ erupting: false, intensity: 0 })
  const lightningRef = useRef({ active: false, strikes: [] })

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

    // OPTIMIZED PARTICLE SYSTEMS WITH SMALLER SIZES
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 150; i++) { // Reduced count for performance
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1, // SMALLER: 1-3px instead of 2-8px
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.4, // Visible but not overwhelming
          color: `hsl(${Math.random() * 60 + 10}, 90%, 70%)`,
          pulse: Math.random() * Math.PI * 2,
          trail: []
        })
      }
    }

    const initDustParticles = () => {
      dustParticlesRef.current = []
      for (let i = 0; i < 100; i++) { // Reduced count
        dustParticlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // SMALLER: 0.5-2px instead of 1-5px
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.4 + 0.3,
          color: `rgba(255, 140, 60, ${Math.random() * 0.3 + 0.4})`
        })
      }
    }

    const initEmberParticles = () => {
      emberParticlesRef.current = []
      for (let i = 0; i < 80; i++) { // Reduced count
        emberParticlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1, // SMALLER: 1-4px instead of 3-11px
          speedX: (Math.random() - 0.5) * 1.0,
          speedY: (Math.random() - 0.5) * 1.0,
          opacity: Math.random() * 0.4 + 0.5,
          color: `hsl(${Math.random() * 40 + 5}, 85%, 65%)`,
          life: Math.random() * 150 + 80,
          trail: []
        })
      }
    }

    const initMeteorParticles = () => {
      meteorParticlesRef.current = []
      for (let i = 0; i < 12; i++) { // Reduced count
        meteorParticlesRef.current.push({
          x: Math.random() * canvas.width,
          y: -50,
          size: Math.random() * 4 + 2, // SMALLER: 2-6px instead of 4-14px
          speedX: (Math.random() - 0.5) * 2,
          speedY: Math.random() * 3 + 2,
          opacity: Math.random() * 0.4 + 0.6,
          color: `hsl(${Math.random() * 60 + 15}, 85%, 70%)`,
          life: Math.random() * 200 + 100,
          trail: []
        })
      }
    }

    const initStarParticles = () => {
      starParticlesRef.current = []
      for (let i = 0; i < 60; i++) { // Reduced count
        starParticlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // SMALLER: 0.5-2px instead of 1-4px
          opacity: Math.random() * 0.5 + 0.3,
          color: `hsl(${Math.random() * 60 + 40}, 70%, 80%)`,
          twinkle: Math.random() * Math.PI * 2
        })
      }
    }

    initParticles()
    initDustParticles()
    initEmberParticles()
    initMeteorParticles()
    initStarParticles()

    // OPTIMIZED ANIMATION WITH BETTER VISIBILITY
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // VISIBLE background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.7, 0,
        canvas.width * 0.3, canvas.height * 0.7, canvas.width * 0.8
      )
      gradient.addColorStop(0, '#8b4513')
      gradient.addColorStop(0.3, '#654321')
      gradient.addColorStop(0.6, '#4a2c17')
      gradient.addColorStop(0.8, '#2f1b0c')
      gradient.addColorStop(1, '#1a0f08')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle texture overlay
      ctx.globalAlpha = 0.3
      for (let i = 0; i < 200; i++) { // Reduced texture spots
        ctx.fillStyle = `rgba(${180 + Math.random() * 40}, ${100 + Math.random() * 60}, ${30 + Math.random() * 40}, ${Math.random() * 0.3 + 0.1})`
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 4 + 2, // Smaller texture spots
          Math.random() * 4 + 2
        )
      }
      ctx.globalAlpha = 1

      const time = timestamp * 0.001

      // Twinkling stars with smaller size
      starParticlesRef.current.forEach((star, index) => {
        star.twinkle += 0.03
        const twinkleOpacity = star.opacity * (0.6 + Math.sin(star.twinkle) * 0.4)
        
        ctx.globalAlpha = twinkleOpacity
        ctx.fillStyle = star.color
        ctx.shadowColor = star.color
        ctx.shadowBlur = star.size * 2 // Reduced glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Optimized volcano
      const volcanoX = canvas.width * 0.15
      const volcanoY = canvas.height * 0.75

      // Less frequent eruption for better performance
      if (Math.sin(time * 0.4) > 0.3) {
        volcanoRef.current.erupting = true
        volcanoRef.current.intensity = Math.min(volcanoRef.current.intensity + 0.04, 1)
      } else {
        volcanoRef.current.erupting = false
        volcanoRef.current.intensity = Math.max(volcanoRef.current.intensity - 0.02, 0)
      }

      // Volcano shape
      ctx.fillStyle = '#654321'
      ctx.beginPath()
      ctx.moveTo(volcanoX - 80, volcanoY)
      ctx.lineTo(volcanoX, volcanoY - 120)
      ctx.lineTo(volcanoX + 80, volcanoY)
      ctx.closePath()
      ctx.fill()

      // Volcano glow (optimized)
      if (volcanoRef.current.intensity > 0) {
        const innerGlow = ctx.createRadialGradient(volcanoX, volcanoY - 100, 0, volcanoX, volcanoY - 100, 80)
        innerGlow.addColorStop(0, `rgba(255, 120, 30, ${volcanoRef.current.intensity * 0.8})`)
        innerGlow.addColorStop(0.5, `rgba(255, 160, 60, ${volcanoRef.current.intensity * 0.5})`)
        innerGlow.addColorStop(1, 'rgba(255, 160, 60, 0)')
        
        ctx.fillStyle = innerGlow
        ctx.fillRect(volcanoX - 80, volcanoY - 180, 160, 160)

        // Eruption particles (smaller and fewer)
        if (volcanoRef.current.erupting) {
          for (let i = 0; i < 30; i++) { // Reduced particles
            const px = volcanoX + (Math.random() - 0.5) * 80
            const py = volcanoY - 100 + Math.random() * 40
            const size = Math.random() * 4 + 1 // SMALLER eruption particles
            
            ctx.fillStyle = `rgba(255, ${Math.random() * 40 + 140}, 30, ${Math.random() * 0.4 + 0.5})`
            ctx.beginPath()
            ctx.arc(px, py, size, 0, Math.PI * 2)
            ctx.fill()

            ctx.shadowColor = `rgba(255, ${Math.random() * 40 + 140}, 30, 0.8)`
            ctx.shadowBlur = 8 // Reduced glow
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      }

      // Optimized lightning
      if (Math.random() < 0.004 && volcanoRef.current.erupting) {
        lightningRef.current.strikes.push({
          x: volcanoX + (Math.random() - 0.5) * 160,
          y: volcanoY - 160,
          life: 12,
          branches: Math.floor(Math.random() * 2) + 1
        })
      }

      lightningRef.current.strikes = lightningRef.current.strikes.filter(strike => {
        strike.life--
        if (strike.life > 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${strike.life / 12})`
          ctx.lineWidth = 3
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
          ctx.shadowBlur = 10
          
          for (let b = 0; b < strike.branches; b++) {
            ctx.beginPath()
            ctx.moveTo(strike.x + b * 20, strike.y)
            ctx.lineTo(strike.x + (Math.random() - 0.5) * 120 + b * 20, strike.y + 120)
            ctx.stroke()
          }
          
          ctx.shadowBlur = 0
          return true
        }
        return false
      })

      // Main particles with smaller trails
      particlesRef.current.forEach((particle, index) => {
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 6) particle.trail.shift() // Shorter trails

        particle.pulse += 0.03
        particle.x += particle.speedX + Math.sin(time + index) * 0.2
        particle.y += particle.speedY + Math.cos(time + index) * 0.2

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw smaller trail
        particle.trail.forEach((point, i) => {
          ctx.globalAlpha = (point.opacity * (i / particle.trail.length)) * 0.6
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.shadowBlur = particle.size * 1.5 // Reduced glow
          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        })

        // Main particle
        const pulseOpacity = particle.opacity * (0.8 + Math.sin(particle.pulse) * 0.2)
        ctx.globalAlpha = pulseOpacity
        ctx.fillStyle = particle.color
        
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 3 // Reduced glow
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.shadowBlur = 0
      })

      // Dust particles (smaller)
      dustParticlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX + Math.sin(time * 0.8 + index) * 0.1
        particle.y += particle.speedY + Math.cos(time * 0.8 + index) * 0.1

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 2 // Reduced glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Ember particles (smaller)
      emberParticlesRef.current.forEach((particle, index) => {
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 5) particle.trail.shift() // Shorter trails

        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.life--

        if (particle.life <= 0 || particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = Math.random() * 150 + 80
          particle.trail = []
        }

        // Smaller trail
        particle.trail.forEach((point, i) => {
          ctx.globalAlpha = (particle.opacity * (particle.life / 150)) * (i / particle.trail.length) * 0.7
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.shadowBlur = particle.size * 1.5
          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        })

        ctx.globalAlpha = particle.opacity * (particle.life / 150)
        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 3 // Reduced glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Meteors (smaller)
      meteorParticlesRef.current.forEach((particle, index) => {
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 8) particle.trail.shift() // Shorter trails

        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.life--

        if (particle.life <= 0 || particle.y > canvas.height + 50) {
          particle.x = Math.random() * canvas.width
          particle.y = -50
          particle.life = Math.random() * 200 + 100
          particle.trail = []
        }

        // Smaller meteor trail
        particle.trail.forEach((point, i) => {
          ctx.globalAlpha = (particle.opacity * (particle.life / 200)) * (i / particle.trail.length) * 0.8
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 8 // Reduced trail glow
          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        })

        // Main meteor
        ctx.globalAlpha = particle.opacity * (particle.life / 200)
        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 2 // Reduced glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      ctx.globalAlpha = 1

      // Optimized revolving Mars (smaller)
      const marsX = canvas.width * 0.85
      const marsY = canvas.height * 0.25
      const marsRadius = 60 + Math.sin(time * 0.5) * 10 // Smaller Mars

      const revolutionX = marsX + Math.sin(time * 0.2) * 30
      const revolutionY = marsY + Math.cos(time * 0.15) * 20

      // Fallback Mars (no image loading for better performance)
      const marsGradient = ctx.createRadialGradient(revolutionX - 20, revolutionY - 20, 0, revolutionX, revolutionY, marsRadius)
      marsGradient.addColorStop(0, '#ff9966')
      marsGradient.addColorStop(0.4, '#ff7744')
      marsGradient.addColorStop(0.8, '#cc5522')
      marsGradient.addColorStop(1, '#aa3311')

      ctx.fillStyle = marsGradient
      ctx.shadowColor = '#ff6633'
      ctx.shadowBlur = 15 // Reduced glow
      ctx.beginPath()
      ctx.arc(revolutionX, revolutionY, marsRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Mars atmosphere (smaller)
      for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = 0.2 - i * 0.05
        ctx.fillStyle = '#ff6633'
        ctx.shadowColor = '#ff6633'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(revolutionX, revolutionY, marsRadius + 10 + i * 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

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
        zIndex: -1, // Behind video but visible
        pointerEvents: 'none'
      }}
    />
  )
}

// ENHANCED LOADING SCREEN (ORIGINAL SIZE)
const EnhancedMarsLoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #2d1810 0%, #4a2c1a 25%, #6b3d1f 50%, #4a2c1a 75%, #2d1810 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #ff6b35, #ff8c42, #ffa500, #ff6b35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 0 50px rgba(255, 107, 53, 1.0), 0 0 100px rgba(255, 107, 53, 0.6), 0 0 150px rgba(255, 107, 53, 0.3)'
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
          <motion.div
            animate={{ scale: [0.8, 1.6, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: '#ff4500',
              boxShadow: '0 0 30px #ff4500, 0 0 60px #ff4500, 0 0 90px #ff4500'
            }}
          />
        </div>
      </motion.div>
      
      <motion.h1
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          color: '#ff6b35',
          fontSize: '1.8rem',
          fontFamily: 'Orbitron, monospace',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '0.8rem',
          letterSpacing: '0.1em',
          textShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.4), 0 0 60px rgba(255, 107, 53, 0.2)'
        }}
      >
        MARS SYSTEM LOADING
      </motion.h1>
      
      <motion.p
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{
          color: '#ffa500',
          fontSize: '1rem',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(255, 165, 0, 0.6)'
        }}
      >
        Initializing volcanic environment...
      </motion.p>
    </motion.div>
  )
}

// ENHANCED EXPERIENCE CARD (ORIGINAL SIZE AND EFFECTS)
const EnhancedExperienceCard = ({ job, index, isMobile, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8,
        delay: 3.2 + index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(25px)',
        border: `3px solid ${job.color}60`,
        borderRadius: '1.25rem',
        padding: isMobile ? '1.8rem' : '2.2rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered ? 
          `0 20px 40px ${job.color}60, 0 0 40px ${job.color}40, inset 0 0 25px ${job.color}15` : 
          `0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px ${job.color}20`
      }}
      onClick={() => onSelect(job)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.04,
        y: -10,
        boxShadow: `0 25px 50px ${job.color}70, 0 0 50px ${job.color}50, inset 0 0 30px ${job.color}20`
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${job.color}30, transparent)`,
          pointerEvents: 'none'
        }}
      />

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: isHovered ? [0, 1, 0] : 0,
            scale: isHovered ? [0.5, 1.5, 0.5] : 0.5,
            x: isHovered ? [0, (i - 1) * 25, 0] : 0,
            y: isHovered ? [0, -12 - i * 4, 0] : 0
          }}
          transition={{ 
            duration: 1.8 + i * 0.4, 
            repeat: isHovered ? Infinity : 0,
            delay: i * 0.2
          }}
          style={{
            position: 'absolute',
            top: `${15 + i * 8}px`,
            right: `${10 + i * 6}px`,
            width: '10px',
            height: '10px',
            background: job.color,
            borderRadius: '50%',
            boxShadow: `0 0 20px ${job.color}, 0 0 40px ${job.color}50`,
            pointerEvents: 'none'
          }}
        />
      ))}

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1.3rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '0.9rem' }}>
            <motion.img 
              src={job.icon} 
              alt={job.title}
              style={{
                width: isMobile ? '42px' : '50px',
                height: isMobile ? '42px' : '50px',
                borderRadius: '10px',
                objectFit: 'cover',
                border: `3px solid ${job.color}`,
                boxShadow: `0 0 20px ${job.color}60, 0 0 40px ${job.color}25`
              }}
              whileHover={{ scale: 1.15, rotate: 8 }}
              loading="lazy"
            />
            <h3 style={{
              fontSize: isMobile ? '1.05rem' : '1.25rem',
              fontWeight: '700',
              color: job.color,
              fontFamily: 'Orbitron, monospace',
              textShadow: `0 0 15px ${job.color}70, 0 0 30px ${job.color}35`
            }}>
              {job.title}
            </h3>
          </div>
          <p style={{
            fontSize: isMobile ? '0.85rem' : '1rem',
            color: '#ffffff',
            fontWeight: '600',
            marginBottom: '0.4rem'
          }}>
            {job.company}
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: '#cccccc',
            fontWeight: '400'
          }}>
            {job.period} • {job.location}
          </p>
        </div>
        <motion.div 
          animate={{ 
            height: isHovered ? '75px' : '60px',
            boxShadow: isHovered ? `0 0 25px ${job.color}80` : `0 0 12px ${job.color}40`
          }}
          style={{
            width: '4px',
            background: `linear-gradient(to bottom, ${job.color}, transparent)`,
            borderRadius: '2px'
          }} 
        />
      </div>

      <p style={{
        fontSize: isMobile ? '0.8rem' : '0.95rem',
        color: '#e0e0e0',
        lineHeight: '1.6',
        marginBottom: '1.8rem',
        position: 'relative',
        zIndex: 1
      }}>
        {job.description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.span 
          animate={{ 
            color: isHovered ? job.color : '#cccccc',
            textShadow: isHovered ? `0 0 12px ${job.color}80` : 'none'
          }}
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}
        >
          VIEW ACHIEVEMENTS →
        </motion.span>
        <motion.div
          whileHover={{ scale: 1.25, rotate: 180 }}
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${job.color}, ${job.color}80)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: `0 0 20px ${job.color}70, 0 0 40px ${job.color}35`
          }}
        >
          →
        </motion.div>
      </div>
    </motion.div>
  )
}

// MAIN COMPONENT
const FinalMarsWorkExperienceComponent = () => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2800)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      clearTimeout(loadingTimer)
    }
  }, [])

  const styles = useMemo(() => ({
    container: {
      minHeight: '100vh',
      position: 'relative',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      padding: isMobile ? '1.8rem 1rem' : '2.5rem 1.8rem',
      maxWidth: '1400px',
      margin: '0 auto',
      paddingTop: isMobile ? '1rem' : '1.5rem' // Reduced top padding to move content up
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem', // Reduced margin to move content up
      marginTop: isMobile ? '1.5rem' : '0.5rem' // Reduced top margin to move header up
    },
    title: {
      fontSize: isMobile ? '2rem' : '3.5rem',
      fontWeight: '900',
      fontFamily: 'Orbitron, monospace',
      background: 'linear-gradient(45deg, #ff6b35, #ffa500, #ff8c42, #ff6b35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% 200%',
      marginBottom: '0.7rem', // Reduced margin
      textShadow: '0 0 40px rgba(255, 107, 53, 0.8), 0 0 80px rgba(255, 107, 53, 0.4)',
      animation: 'gradientShift 4s ease-in-out infinite'
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.25rem',
      color: '#ffa500',
      fontWeight: '300',
      maxWidth: '750px',
      margin: '0 auto',
      lineHeight: '1.6',
      textShadow: '0 0 15px rgba(255, 165, 0, 0.5)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(460px, 1fr))',
      gap: '2.2rem',
      marginBottom: '2.5rem'
    },
    marsIndicator: {
      position: 'absolute',
      top: '1.8rem',
      left: '1.8rem',
      zIndex: 30
    },
    indicatorContent: {
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(25px)',
      border: '3px solid rgba(255, 107, 53, 0.6)',
      borderRadius: '0.7rem',
      padding: '0.9rem 1.3rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.7rem',
      boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
    },
    pulseIndicator: {
      width: '12px',
      height: '12px',
      backgroundColor: '#ff6b35',
      borderRadius: '50%',
      boxShadow: '0 0 20px #ff6b35, 0 0 40px #ff6b35, 0 0 60px #ff6b35',
      animation: 'pulse 2s infinite'
    },
    indicatorText: {
      color: '#ff6b35',
      fontSize: '0.85rem',
      fontFamily: 'Orbitron, monospace',
      fontWeight: '700',
      letterSpacing: '0.05em',
      textShadow: '0 0 10px rgba(255, 107, 53, 0.6)'
    }
  }), [isMobile])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        background: #1a0f0a;
      }
      
      /* Hide scrollbar but maintain functionality */
      html, body {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        overflow-y: auto;
      }
      
      html::-webkit-scrollbar, body::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none; /* Chrome, Safari, Opera */
      }
      
      * {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      *::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes pulse {
        0%, 100% { 
          opacity: 1; 
          transform: scale(1); 
          box-shadow: 0 0 20px #ff6b35, 0 0 40px #ff6b35, 0 0 60px #ff6b35;
        }
        50% { 
          opacity: 0.8; 
          transform: scale(1.3); 
          box-shadow: 0 0 30px #ff6b35, 0 0 60px #ff6b35, 0 0 90px #ff6b35;
        }
      }
      
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
        overflow: hidden;
      }
      .no-scrollbar::-webkit-scrollbar { 
        display: none;
        width: 0;
        height: 0;
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
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
        <EnhancedMarsLoadingScreen isLoading={isLoading} />
      </AnimatePresence>

      <OptimizedMarsBackground />
      
      <div style={styles.container} className="no-scrollbar">
        {/* RE-INTEGRATED VIDEO BACKGROUND */}
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
            zIndex: 0, // Above canvas but below content
            opacity: 0.6 // Slightly transparent to blend with canvas
          }}
        >
          <source src="/assets/images/volcano-eruption.mp4" type="video/mp4" />
        </video>

        <div style={styles.marsIndicator}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 3.2 }}
            style={styles.indicatorContent}
          >
            <div style={styles.pulseIndicator} />
            <span style={styles.indicatorText}>
              MARS MODE 
            </span>
          </motion.div>
        </div>

        <div style={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
            style={styles.header}
          >
            <h1 style={styles.title}>
              WORK EXPERIENCE
            </h1>
            <p style={styles.subtitle}>
              Professional Journey Through Mars Volcanic Terrain
            </p>
          </motion.div>

          <div style={styles.grid}>
            {workExperience.map((job, index) => (
              <EnhancedExperienceCard
                key={job.id}
                job={job}
                index={index}
                isMobile={isMobile}
                onSelect={setSelectedJob}
              />
            ))}
          </div>
        </div>

        {/* ORIGINAL MODAL */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '1rem' : '1.5rem'
              }}
              onClick={() => setSelectedJob(null)}
              className="no-scrollbar"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 100 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(30px)',
                  border: `4px solid ${selectedJob.color}80`,
                  borderRadius: '1.5rem',
                  padding: isMobile ? '1.5rem' : '2rem',
                  width: '100%',
                  maxWidth: '700px',
                  maxHeight: '85vh',
                  position: 'relative',
                  boxShadow: `0 0 60px ${selectedJob.color}60, 0 0 120px ${selectedJob.color}30, inset 0 0 30px ${selectedJob.color}15`,
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
                className="no-scrollbar"
              >
                <motion.div
                  animate={{
                    background: [
                      `radial-gradient(circle at 25% 25%, ${selectedJob.color}20, transparent 55%)`,
                      `radial-gradient(circle at 75% 75%, ${selectedJob.color}25, transparent 55%)`,
                      `radial-gradient(circle at 25% 25%, ${selectedJob.color}20, transparent 55%)`
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1.5rem',
                    pointerEvents: 'none'
                  }}
                />

                {/* HEADER */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  zIndex: 1,
                  flexShrink: 0
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <motion.img 
                      src={selectedJob.icon} 
                      alt={selectedJob.title}
                      style={{
                        width: '55px',
                        height: '55px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                        border: `3px solid ${selectedJob.color}`,
                        boxShadow: `0 0 25px ${selectedJob.color}70, 0 0 50px ${selectedJob.color}35`
                      }}
                      whileHover={{ scale: 1.1, rotate: 6 }}
                    />
                    <div>
                      <h2 style={{
                        fontSize: isMobile ? '1.3rem' : '1.6rem',
                        fontWeight: '700',
                        color: selectedJob.color,
                        marginBottom: '0.3rem',
                        fontFamily: 'Orbitron, monospace',
                        textShadow: `0 0 15px ${selectedJob.color}60, 0 0 30px ${selectedJob.color}30`
                      }}>
                        {selectedJob.title}
                      </h2>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#ffffff',
                        fontWeight: '600',
                        marginBottom: '0.2rem'
                      }}>
                        {selectedJob.company}
                      </p>
                      <p style={{
                        color: '#cccccc',
                        fontSize: '0.8rem'
                      }}>
                        {selectedJob.period} • {selectedJob.location}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 180, color: selectedJob.color }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedJob(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#cccccc',
                      fontSize: '1.3rem',
                      cursor: 'pointer',
                      padding: '0.6rem',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* DESCRIPTION */}
                <p style={{
                  fontSize: '0.9rem',
                  color: '#e0e0e0',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  zIndex: 1,
                  flexShrink: 0
                }}>
                  {selectedJob.description}
                </p>

                {/* ACHIEVEMENTS */}
                <div style={{ 
                  position: 'relative', 
                  zIndex: 1,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: selectedJob.color,
                    marginBottom: '1rem',
                    fontFamily: 'Orbitron, monospace',
                    textShadow: `0 0 12px ${selectedJob.color}60, 0 0 24px ${selectedJob.color}30`,
                    flexShrink: 0
                  }}>
                    Key Achievements
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7rem',
                    flex: 1,
                    minHeight: 0
                  }}>
                    {selectedJob.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          padding: '0.8rem',
                          background: 'rgba(255, 255, 255, 0.12)',
                          borderRadius: '0.7rem',
                          border: `2px solid ${selectedJob.color}35`,
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}
                        whileHover={{
                          background: 'rgba(255, 255, 255, 0.18)',
                          borderColor: `${selectedJob.color}50`,
                          scale: 1.01,
                          boxShadow: `0 6px 20px ${selectedJob.color}35, 0 0 15px ${selectedJob.color}20`
                        }}
                      >
                        <motion.div
                          whileHover={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(45deg, transparent, ${selectedJob.color}12, transparent)`,
                            pointerEvents: 'none'
                          }}
                        />
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: selectedJob.color,
                          borderRadius: '50%',
                          marginTop: '0.4rem',
                          marginRight: '0.9rem',
                          flexShrink: 0,
                          boxShadow: `0 0 12px ${selectedJob.color}, 0 0 24px ${selectedJob.color}50`,
                          position: 'relative',
                          zIndex: 1
                        }} />
                        <span style={{
                          color: '#e0e0e0',
                          fontSize: '0.8rem',
                          lineHeight: '1.5',
                          position: 'relative',
                          zIndex: 1
                        }}>
                          {achievement}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default FinalMarsWorkExperienceComponent

