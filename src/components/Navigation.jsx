import { motion } from 'framer-motion'
import { useState } from 'react'

const Navigation = ({ sections, currentSection, onSectionChange }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Navigation Toggle Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </motion.div>
      </motion.button>

      {/* Navigation Menu */}
      <motion.nav
        className="fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-md z-40 border-l border-blue-500/30"
        initial={{ x: '100%' }}
        animate={{ x: isExpanded ? 0 : '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="p-8 pt-20">
          <motion.h2
            className="text-2xl font-bold text-white mb-8"
            style={{ fontFamily: 'Orbitron, monospace' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            NAVIGATION
          </motion.h2>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  currentSection === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  onSectionChange(index)
                  setIsExpanded(false)
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: isExpanded ? 1 : 0, 
                  x: isExpanded ? 0 : 50 
                }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    currentSection === index ? 'bg-white' : 'bg-gray-500'
                  }`} />
                  <div>
                    <div className="text-sm font-medium">{section.title}</div>
                    <div className="text-xs opacity-70 capitalize">{section.id}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Progress Indicator */}
          <motion.div
            className="mt-8 p-4 bg-white/5 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-sm text-gray-400 mb-2">Mission Progress</div>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {currentSection + 1} of {sections.length} sectors explored
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Backdrop */}
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Section Indicator */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-3">
          {sections.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                currentSection === index
                  ? 'bg-blue-500 border-blue-500 scale-125'
                  : 'border-gray-500 hover:border-white'
              }`}
              onClick={() => onSectionChange(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Navigation

