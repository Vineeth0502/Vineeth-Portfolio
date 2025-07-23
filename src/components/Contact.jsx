import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import controlPanel from '/assets/images/control-panel.jpg'

const contactInfo = {
  email: 'kethamvineeth@gmail.com',
  phone: '(314) 224-2757',
  location: 'St Louis, MO 63108',
  linkedin: 'https://www.linkedin.com/in/vineethketham/',
  github: 'https://github.com/Vineeth0502',
  portfolio: 'https://vineeth0502.github.io/vineeth-ketham-portfolio/'
}

// Neptune Oceanic Background Component
const NeptuneOceanicBackground = () => {
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

    // Neptune oceanic particles
    const particles = []
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.4 + 0.2,
        color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 60}%)`,
        pulse: Math.random() * Math.PI * 2
      })
    }

    // Neptune wave effects
    const waves = []
    for (let i = 0; i < 5; i++) {
      waves.push({
        y: (canvas.height / 6) * i + canvas.height * 0.2,
        speed: 0.3 + Math.random() * 0.7,
        amplitude: 20 + Math.random() * 40,
        frequency: 0.01 + Math.random() * 0.02,
        opacity: 0.05 + Math.random() * 0.15,
        color: i % 2 === 0 ? '#1e40af' : '#3b82f6'
      })
    }

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Neptune gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      )
      gradient.addColorStop(0, '#0f172a')
      gradient.addColorStop(0.3, '#1e293b')
      gradient.addColorStop(0.6, '#0f172a')
      gradient.addColorStop(1, '#020617')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = timestamp * 0.001

      // Neptune wave effects
      waves.forEach((wave, index) => {
        ctx.globalAlpha = wave.opacity
        ctx.fillStyle = wave.color
        
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = wave.y + Math.sin((x * wave.frequency) + (time * wave.speed)) * wave.amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()
      })

      // Neptune oceanic particles
      particles.forEach((particle, index) => {
        particle.pulse += 0.02
        particle.x += particle.speedX + Math.sin(time + index) * 0.2
        particle.y += particle.speedY + Math.cos(time + index) * 0.1

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        const pulseOpacity = particle.opacity * (0.6 + Math.sin(particle.pulse) * 0.4)
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

// Neptune Starfield Component
const NeptuneStarfield = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.4 + 0.2,
      twinkleDelay: Math.random() * 4,
      color: Math.random() > 0.7 ? '#60a5fa' : '#ffffff'
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.twinkleDelay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
    }, 2000)
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: contactInfo.linkedin,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: '#2563eb'
    },
    {
      name: 'GitHub',
      url: contactInfo.github,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: '#1e40af'
    },
    {
      name: 'Portfolio',
      url: contactInfo.portfolio,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      color: '#3b82f6'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Neptune Oceanic Background */}
      <NeptuneOceanicBackground />
      
      {/* Neptune Starfield */}
      <NeptuneStarfield />

      {/* Neptune Scanning Lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20"
            style={{ top: `${15 + i * 12}%` }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'linear'
            }}
          />
        ))}
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
            <motion.div
              className="flex items-center justify-center space-x-4 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-blue-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                  boxShadow: [
                    '0 0 10px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.8)',
                    '0 0 10px rgba(59, 130, 246, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <span className="text-lg font-bold tracking-widest text-blue-300 font-mono uppercase">
                Neptune Deep Space
              </span>
              <motion.div
                className="w-3 h-3 rounded-full bg-blue-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                  boxShadow: [
                    '0 0 10px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.8)',
                    '0 0 10px rgba(59, 130, 246, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
              />
            </motion.div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              NEPTUNE DEPTHS
            </h1>
            <motion.p 
              className="text-xl text-blue-300 mb-2" 
              style={{ fontFamily: 'Exo, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Diving into the oceanic communication channels...
            </motion.p>
            <motion.p 
              className="text-sm text-blue-400/70 font-mono" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Establishing deep-sea transmission protocols across the cosmic ocean
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-slate-900/70 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8"
              style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)' }}
            >
              <h2 
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                OCEANIC TRANSMISSION
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blue-300 text-sm font-bold mb-2">
                      DEEP SEA EXPLORER
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800/60 border border-blue-500/50 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-300 text-sm font-bold mb-2">
                      OCEANIC BEACON
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800/60 border border-blue-500/50 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-blue-300 text-sm font-bold mb-2">
                    DEPTH TRANSMISSION
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800/60 border border-blue-500/50 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors focus:ring-2 focus:ring-blue-400/20"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label className="block text-blue-300 text-sm font-bold mb-2">
                    OCEANIC MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full bg-slate-800/60 border border-blue-500/50 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors resize-none focus:ring-2 focus:ring-blue-400/20"
                    placeholder="Enter your message"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 hover:from-blue-500 hover:to-blue-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span>DIVING DEEP...</span>
                    </div>
                  ) : (
                    'SEND TO DEPTHS'
                  )}
                </motion.button>
              </form>

              {/* Submit Status */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mt-4 p-4 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                        : 'bg-red-500/20 border border-red-500/50 text-red-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                      <span className="font-mono text-sm">
                        {submitStatus === 'success' 
                          ? 'MESSAGE RECEIVED IN NEPTUNE DEPTHS - SIGNAL CONFIRMED'
                          : 'TRANSMISSION LOST IN OCEANIC DEPTHS - RETRY REQUIRED'
                        }
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-8"
            >
              {/* Direct Contact */}
              <div className="bg-slate-900/70 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8">
                <h2 
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  DEEP SEA CHANNELS
                </h2>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-slate-800/40 rounded-lg border border-blue-500/20"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-blue-300 text-sm font-bold">OCEANIC FREQUENCY</div>
                      <div className="text-white">{contactInfo.email}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-slate-800/40 rounded-lg border border-blue-500/20"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-blue-300 text-sm font-bold">SONAR CHANNEL</div>
                      <div className="text-white">{contactInfo.phone}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-slate-800/40 rounded-lg border border-blue-500/20"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-blue-300 text-sm font-bold">OCEANIC COORDINATES</div>
                      <div className="text-white">{contactInfo.location}</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-slate-900/70 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8">
                <h2 
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  DEEP SEA NETWORKS
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-slate-800/40 rounded-lg transition-all duration-300 hover:bg-slate-800/60 border border-blue-500/20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: link.color }}
                      >
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-white font-bold">{link.name}</div>
                        <div className="text-blue-300 text-sm">Navigate to {link.name}</div>
                      </div>
                      <div className="ml-auto">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                          <path d="M7 17L17 7"/>
                          <path d="M7 7h10v10"/>
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Neptune Oceanic Waves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-40 h-40 border border-blue-400/15 rounded-full"
            style={{ transform: 'translate(-50%, -50%)' }}
            animate={{
              scale: [1, 4, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      {/* Neptune Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute w-2 h-2 rounded-full bg-blue-400/30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Contact

