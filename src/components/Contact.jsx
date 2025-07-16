import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import controlPanel from '/assets/images/control-panel.jpg'

const contactInfo = {
  email: 'kethamvineeth@gmail.com',
  phone: '(314) 224-2757',
  location: 'St Louis, MO 63108',
  linkedin: 'https://www.linkedin.com/in/vineethketham/',
  github: 'https://github.com/Vineeth0502',
  portfolio: 'https://vineeth0502.github.io/vineeth-ketham-portfolio/'
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
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      url: contactInfo.github,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: '#333'
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
      color: '#00d4ff'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${controlPanel})`,
          filter: 'brightness(0.3) contrast(1.2)'
        }}
      />

      {/* Scanning Lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.8,
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
            <h1 
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              UPLINK CONSOLE
            </h1>
            <p className="text-xl text-cyan-300" style={{ fontFamily: 'Exo, sans-serif' }}>
              Establishing communication protocols...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8"
              style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)' }}
            >
              <h2 
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                TRANSMISSION FORM
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-300 text-sm font-bold mb-2">
                      SENDER ID
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-300 text-sm font-bold mb-2">
                      SIGNAL SOURCE
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm font-bold mb-2">
                    TRANSMISSION SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm font-bold mb-2">
                    MESSAGE PAYLOAD
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
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
                      <span>TRANSMITTING...</span>
                    </div>
                  ) : (
                    'SEND TRANSMISSION'
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
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                        : 'bg-red-500/20 border border-red-500/50 text-red-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                      <span className="font-mono text-sm">
                        {submitStatus === 'success' 
                          ? 'TRANSMISSION SUCCESSFUL - SIGNAL RECEIVED'
                          : 'TRANSMISSION FAILED - RETRY REQUIRED'
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
              <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
                <h2 
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  DIRECT CHANNELS
                </h2>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-cyan-300 text-sm font-bold">EMAIL FREQUENCY</div>
                      <div className="text-white">{contactInfo.email}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-cyan-300 text-sm font-bold">VOICE CHANNEL</div>
                      <div className="text-white">{contactInfo.phone}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-cyan-300 text-sm font-bold">COORDINATES</div>
                      <div className="text-white">{contactInfo.location}</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8">
                <h2 
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  NETWORK NODES
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg transition-all duration-300 hover:bg-black/50"
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
                        <div className="text-gray-400 text-sm">Connect on {link.name}</div>
                      </div>
                      <div className="ml-auto">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
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

      {/* Signal Waves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-32 h-32 border border-cyan-400/20 rounded-full"
            style={{ transform: 'translate(-50%, -50%)' }}
            animate={{
              scale: [1, 3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Contact

