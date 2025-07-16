import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import constellationMap from '/assets/images/constellation-map.jpg'

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend Constellation',
    color: '#00d4ff',
    position: { x: 20, y: 25 },
    skills: [
      { name: 'React.js', level: 95, position: { x: 18, y: 20 } },
      { name: 'JavaScript (ES6+)', level: 90, position: { x: 22, y: 18 } },
      { name: 'HTML/CSS', level: 95, position: { x: 25, y: 22 } },
      { name: 'Tailwind CSS', level: 85, position: { x: 20, y: 28 } },
      { name: 'Bootstrap', level: 80, position: { x: 16, y: 25 } },
      { name: 'AngularJS', level: 75, position: { x: 24, y: 30 } }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Nebula',
    color: '#ff6b35',
    position: { x: 70, y: 30 },
    skills: [
      { name: 'Java', level: 95, position: { x: 68, y: 25 } },
      { name: 'Spring Boot', level: 90, position: { x: 72, y: 28 } },
      { name: 'Node.js', level: 85, position: { x: 75, y: 32 } },
      { name: 'Express.js', level: 85, position: { x: 70, y: 35 } },
      { name: 'Python', level: 80, position: { x: 66, y: 30 } },
      { name: 'RESTful APIs', level: 90, position: { x: 73, y: 22 } }
    ]
  },
  {
    id: 'database',
    name: 'Data Galaxy',
    color: '#4ecdc4',
    position: { x: 45, y: 60 },
    skills: [
      { name: 'MongoDB', level: 90, position: { x: 43, y: 55 } },
      { name: 'MySQL', level: 85, position: { x: 47, y: 58 } },
      { name: 'PostgreSQL', level: 80, position: { x: 50, y: 62 } },
      { name: 'NoSQL', level: 85, position: { x: 42, y: 65 } },
      { name: 'JDBC', level: 85, position: { x: 48, y: 52 } }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Cluster',
    color: '#a8e6cf',
    position: { x: 25, y: 70 },
    skills: [
      { name: 'Google Cloud Platform', level: 80, position: { x: 23, y: 65 } },
      { name: 'AWS', level: 75, position: { x: 27, y: 68 } },
      { name: 'Docker', level: 80, position: { x: 30, y: 72 } },
      { name: 'Vercel', level: 85, position: { x: 22, y: 75 } },
      { name: 'GitHub Actions', level: 75, position: { x: 28, y: 62 } }
    ]
  },
  {
    id: 'ml',
    name: 'AI Constellation',
    color: '#ffd93d',
    position: { x: 75, y: 65 },
    skills: [
      { name: 'TensorFlow', level: 85, position: { x: 73, y: 60 } },
      { name: 'Machine Learning', level: 80, position: { x: 77, y: 63 } },
      { name: 'Deep Learning', level: 75, position: { x: 80, y: 67 } },
      { name: 'NLP', level: 70, position: { x: 72, y: 70 } },
      { name: 'Keras', level: 75, position: { x: 78, y: 58 } }
    ]
  },
  {
    id: 'tools',
    name: 'Tools Sector',
    color: '#ff8a80',
    position: { x: 50, y: 20 },
    skills: [
      { name: 'Git/GitHub', level: 90, position: { x: 48, y: 15 } },
      { name: 'VS Code', level: 95, position: { x: 52, y: 18 } },
      { name: 'Postman', level: 85, position: { x: 55, y: 22 } },
      { name: 'Maven', level: 80, position: { x: 47, y: 25 } },
      { name: 'JUnit', level: 80, position: { x: 53, y: 12 } }
    ]
  }
]

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const getStarSize = (level) => {
    if (level >= 90) return 'w-3 h-3'
    if (level >= 80) return 'w-2.5 h-2.5'
    if (level >= 70) return 'w-2 h-2'
    return 'w-1.5 h-1.5'
  }

  const getStarGlow = (level, color) => {
    const intensity = level >= 90 ? '60' : level >= 80 ? '40' : '20'
    return `0 0 ${level >= 90 ? '20px' : level >= 80 ? '15px' : '10px'} ${color}${intensity}`
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${constellationMap})`,
          filter: 'brightness(0.2) contrast(1.3)'
        }}
      />

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {skillCategories.map((category) => (
          <g key={category.id}>
            {category.skills.map((skill, index) => {
              if (index === 0) return null
              const prevSkill = category.skills[index - 1]
              return (
                <motion.line
                  key={`${category.id}-${index}`}
                  x1={`${prevSkill.position.x}%`}
                  y1={`${prevSkill.position.y}%`}
                  x2={`${skill.position.x}%`}
                  y2={`${skill.position.y}%`}
                  stroke={category.color}
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              )
            })}
          </g>
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              CONSTELLATION MAP
            </h1>
            <p className="text-xl text-blue-300" style={{ fontFamily: 'Exo, sans-serif' }}>
              Navigating the galaxy of technical expertise...
            </p>
          </motion.div>

          {/* Skills Map */}
          <div className="relative w-full h-[600px] bg-black/20 backdrop-blur-sm rounded-3xl border border-blue-500/30 overflow-hidden">
            {/* Category Labels */}
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="absolute"
                style={{
                  left: `${category.position.x}%`,
                  top: `${category.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.button
                  className="px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm border transition-all duration-300"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    borderColor: `${category.color}50`
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: `${category.color}30`
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  {category.name}
                </motion.button>
              </motion.div>
            ))}

            {/* Skills Stars */}
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.id}>
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={`${category.id}-${skill.name}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: categoryIndex * 0.3 + skillIndex * 0.1 
                    }}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${skill.position.x}%`,
                      top: `${skill.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <motion.div
                      className={`${getStarSize(skill.level)} rounded-full`}
                      style={{
                        backgroundColor: category.color,
                        boxShadow: getStarGlow(skill.level, category.color)
                      }}
                      animate={{
                        scale: hoveredSkill === skill ? [1, 1.5, 1] : [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: hoveredSkill === skill ? 1 : 2,
                        repeat: Infinity
                      }}
                      whileHover={{ scale: 1.8 }}
                    />

                    {/* Skill Tooltip */}
                    <AnimatePresence>
                      {hoveredSkill === skill && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md border rounded-lg p-3 min-w-max"
                          style={{ borderColor: category.color }}
                        >
                          <div className="text-white font-bold text-sm mb-1">
                            {skill.name}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-gray-700 rounded-full">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: category.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8 }}
                              />
                            </div>
                            <span className="text-xs text-gray-300">{skill.level}%</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Constellation Highlight */}
            <AnimatePresence>
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {skillCategories
                    .find(cat => cat.id === selectedCategory)
                    ?.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-8 h-8 rounded-full border-2 border-white/50"
                        style={{
                          left: `${skill.position.x}%`,
                          top: `${skill.position.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-black/40 backdrop-blur-md border rounded-lg p-4 text-center"
                style={{ borderColor: `${category.color}50` }}
              >
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ 
                    backgroundColor: category.color,
                    boxShadow: `0 0 10px ${category.color}60`
                  }}
                />
                <div className="text-white text-sm font-bold mb-1">
                  {category.name.split(' ')[0]}
                </div>
                <div className="text-xs text-gray-400">
                  {category.skills.length} skills
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 200],
              y: [0, 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 4,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Skills

