import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import spaceStation from '/assets/images/space-station.jpg'

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
    color: '#00ff88',
    status: 'Deployed'
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
    color: '#ff6b35',
    status: 'Research'
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
    color: '#4ecdc4',
    status: 'Completed'
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
    color: '#a8e6cf',
    status: 'Active'
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
    color: '#ffd93d',
    status: 'Prototype'
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
    color: '#ff8a80',
    status: 'Mobile'
  }
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${spaceStation})`,
          filter: 'brightness(0.3) contrast(1.1)'
        }}
      />

      {/* Rotating Station Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-96 h-96 border border-blue-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-80 h-80 border border-purple-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-64 h-64 border border-cyan-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

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
              className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              DEVELOPER DOCKYARD
            </h1>
            <p className="text-xl text-blue-300" style={{ fontFamily: 'Exo, sans-serif' }}>
              Exploring the constellation of created solutions...
            </p>
          </motion.div>

          {/* Project Pods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                className="relative group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Pod */}
                <motion.button
                  className="w-full h-80 bg-black/60 backdrop-blur-md border-2 rounded-3xl p-6 text-left transition-all duration-500 relative overflow-hidden"
                  style={{ 
                    borderColor: project.color,
                    boxShadow: `0 0 30px ${project.color}40`
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 60px ${project.color}80`,
                    rotateY: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Energy Core */}
                  <motion.div
                    className="absolute top-4 right-4 w-6 h-6 rounded-full"
                    style={{ backgroundColor: project.color }}
                    animate={{
                      scale: hoveredProject === project.id ? [1, 1.5, 1] : [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: hoveredProject === project.id ? 1 : 2,
                      repeat: Infinity
                    }}
                  />

                  {/* Status Badge */}
                  <div 
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ 
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}50`
                    }}
                  >
                    {project.status}
                  </div>

                  {/* Content */}
                  <div className="mt-12">
                    <h3 
                      className="text-xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: project.color }}>
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                      {project.description}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${project.color}15, transparent 70%)`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating Particles */}
                  {hoveredProject === project.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor: project.color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.5, rotateX: -90, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotateX: 90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-black/90 backdrop-blur-md border-2 rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              style={{ 
                borderColor: selectedProject.color,
                boxShadow: `0 0 60px ${selectedProject.color}60`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 
                    className="text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Orbitron, monospace' }}
                  >
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl mb-2" style={{ color: selectedProject.color }}>
                    {selectedProject.subtitle}
                  </p>
                  <div 
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                    style={{ 
                      backgroundColor: `${selectedProject.color}20`,
                      color: selectedProject.color,
                      border: `1px solid ${selectedProject.color}50`
                    }}
                  >
                    {selectedProject.status}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Orbitron, monospace' }}>
                    KEY FEATURES
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: selectedProject.color }}
                        />
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Orbitron, monospace' }}>
                    TECHNOLOGIES
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border"
                        style={{ borderColor: `${selectedProject.color}50` }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects

