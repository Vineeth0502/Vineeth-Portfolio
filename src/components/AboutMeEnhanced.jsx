import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import SolarSystem3D from './SolarSystem3D'

function AboutMeEnhanced() {
  const [showBio, setShowBio] = useState(false)

  const bioData = {
    title: "COMMANDER VINEETH KETHAM",
    subtitle: "Full Stack Developer & AI Researcher",
    description: "Results-driven Computer Science graduate with proven experience in software development, machine learning, and full-stack web application design. Skilled in building scalable systems using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Java (including Spring Boot, multithreading, and RESTful APIs).",
    additionalInfo: "Strong foundation in object-oriented programming, data analysis, cloud platforms like GCP, and Agile methodologies. Demonstrated success in leading technical projects, contributing to open-source initiatives, and delivering robust backend services and responsive user interfaces.",
    stats: [
      { label: "Years Experience", value: "2+", color: "#00d4ff" },
      { label: "Projects Completed", value: "6+", color: "#ff6b6b" },
      { label: "Technologies Mastered", value: "10+", color: "#4ecdc4" }
    ],
    skills: [
      "Full Stack Development",
      "Machine Learning",
      "Cloud Computing",
      "System Architecture",
      "API Development",
      "Database Design"
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center pt-8 pb-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 font-orbitron mb-2">
            ZERO GRAVITY BIO CORE
          </h1>
          <p className="text-gray-300 text-lg font-exo">
            Exploring the universe of possibilities...
          </p>
        </motion.div>

        {/* 3D Solar System */}
        <div className="flex-1 relative">
          <SolarSystem3D />
        </div>

        {/* Bio Toggle Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          onClick={() => setShowBio(!showBio)}
          className="absolute top-20 right-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl z-20"
        >
          {showBio ? 'HIDE BIO' : 'SHOW BIO'}
        </motion.button>

        {/* Bio Information Modal */}
        <AnimatePresence>
          {showBio && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center p-4"
              onClick={() => setShowBio(false)}
            >
              <motion.div
                initial={{ scale: 0, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0, rotateY: 90 }}
                transition={{ type: "spring", damping: 15 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Bio Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-cyan-400 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">VK</span>
                    </div>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-orbitron mb-2">
                    {bioData.title}
                  </h2>
                  <p className="text-cyan-300 text-lg font-exo">{bioData.subtitle}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {bioData.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="text-center bg-black/40 rounded-lg p-4 border border-white/10"
                    >
                      <div 
                        className="text-3xl font-bold font-orbitron mb-1"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-orbitron">MISSION PROFILE</h3>
                  <p className="text-gray-300 leading-relaxed mb-4 font-exo">
                    {bioData.description}
                  </p>
                  <p className="text-gray-300 leading-relaxed font-exo">
                    {bioData.additionalInfo}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-orbitron">CORE COMPETENCIES</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {bioData.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg px-4 py-2 text-center"
                      >
                        <span className="text-white font-medium text-sm">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowBio(false)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300"
                  >
                    CLOSE TRANSMISSION
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Status Indicator */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md rounded-lg p-4 border border-green-400/30"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold text-sm font-orbitron">SYSTEM ONLINE</span>
          </div>
          <div className="text-gray-300 text-xs mt-1">
            Solar System Initialized • All Planets Operational
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutMeEnhanced

