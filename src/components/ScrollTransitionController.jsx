import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MarsTransitionContainer from './MarsTransitionComponent'
import PianoShapeComponent from './PianoShapeComponent'

// Scroll Transition Controller (No Sound Effects)
export const ScrollTransitionController = ({ 
  aboutPageComponent, 
  marsPageComponent
}) => {
  const [currentPage, setCurrentPage] = useState('about') // 'about', 'transitioning', 'mars'
  const [scrollProgress, setScrollProgress] = useState(0)
  const [transitionScrollProgress, setTransitionScrollProgress] = useState(0)
  const containerRef = useRef(null)
  const transitionTriggered = useRef(false)

  // Scroll handler with Mars rotation based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = documentHeight - windowHeight
      const progress = Math.min(scrollTop / maxScroll, 1)
      setScrollProgress(progress)

      // Trigger transition when scrolling down from about page (around 20% scroll)
      if (progress > 0.2 && currentPage === 'about' && !transitionTriggered.current) {
        transitionTriggered.current = true
        setCurrentPage('transitioning')
      }

      // Calculate Mars transition progress (from 20% to 80% scroll = 0 to 1 Mars progress)
      if (currentPage === 'transitioning') {
        const transitionStart = 0.2
        const transitionEnd = 0.8
        const marsProgress = Math.max(0, Math.min(1, (progress - transitionStart) / (transitionEnd - transitionStart)))
        setTransitionScrollProgress(marsProgress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage])

  // Handle transition completion
  const handleTransitionComplete = () => {
    setCurrentPage('mars')
  }

  // Reset transition when scrolling back up
  useEffect(() => {
    if (scrollProgress < 0.15 && currentPage !== 'about') {
      setCurrentPage('about')
      setTransitionScrollProgress(0)
      transitionTriggered.current = false
    }
  }, [scrollProgress, currentPage])

  return (
    <div ref={containerRef} className="relative">
      {/* About Page */}
      <AnimatePresence>
        {currentPage === 'about' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
              filter: 'blur(2px)'
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative z-10"
          >
            {aboutPageComponent}
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="flex flex-col items-center text-cyan-400">
                <span className="text-sm font-mono mb-2">SCROLL TO MARS</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay with Mars Planet and Piano Shape */}
      <AnimatePresence>
        {currentPage === 'transitioning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30"
            style={{
              background: `radial-gradient(circle at center, rgba(139, 69, 19, ${0.3 + transitionScrollProgress * 0.5}) 0%, rgba(0, 0, 0, ${0.7 + transitionScrollProgress * 0.2}) 100%)`
            }}
          >
            {/* Piano Shape Structure */}
            <PianoShapeComponent 
              scrollProgress={transitionScrollProgress}
              isVisible={currentPage === 'transitioning'}
            />

            {/* Particle effects during transition - intensity based on scroll */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(Math.max(0, Math.floor(30 + (transitionScrollProgress || 0) * 20)))].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 50,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -50,
                    opacity: [0, transitionScrollProgress, 0],
                    scale: [0.5, 1 + transitionScrollProgress * 0.5, 0.5]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 1,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-orange-500 rounded-full"
                  style={{
                    boxShadow: `0 0 ${10 + transitionScrollProgress * 20}px #ff6b35`
                  }}
                />
              ))}
            </div>

            {/* Mars transition container with scroll-driven rotation */}
            <MarsTransitionContainer
              scrollProgress={transitionScrollProgress}
              onTransitionComplete={handleTransitionComplete}
            >
              {marsPageComponent}
            </MarsTransitionContainer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mars Page with Enhanced Entry Effects */}
      <AnimatePresence>
        {currentPage === 'mars' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Enhanced Mars atmosphere effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.4) 0%, rgba(139, 69, 19, 0.3) 40%, transparent 70%)',
              }}
            />
            
            {/* Mars page content with staggered animations */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            >
              {marsPageComponent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ScrollTransitionController

