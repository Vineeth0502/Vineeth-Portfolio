import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// 3D Mars Planet Component with scroll-driven rotation
function Mars3D({ scrollProgress, onTransitionComplete }) {
  const meshRef = useRef()
  const [marsTexture, setMarsTexture] = useState(null)
  const [contextLost, setContextLost] = useState(false)
  
  // Load Mars texture with error handling
  useEffect(() => {
    try {
      const loader = new TextureLoader()
      loader.load(
        '/assets/images/mars-texture.png',
        (texture) => {
          setMarsTexture(texture)
        },
        undefined,
        (error) => {
          console.warn('Mars texture failed to load, using fallback')
          setMarsTexture(null)
        }
      )
    } catch (error) {
      console.warn('TextureLoader error:', error)
      setMarsTexture(null)
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current || contextLost) return
    
    try {
      // Snake-like path from right to left with up/down movement
      const progress = Math.min(scrollProgress || 0, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      
      // Horizontal movement: right to left
      meshRef.current.position.x = 15 - (30 * easeProgress) // Goes from 15 to -15 (right to left)
      
      // Snake-like vertical movement: creates wave pattern
      const waveFrequency = 3 // Number of waves during the transition
      const waveAmplitude = 8 // Height of the waves
      meshRef.current.position.y = Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude
      
      // Depth movement for 3D effect
      meshRef.current.position.z = -5 + (5 * easeProgress) + Math.cos(progress * Math.PI * 2) * 2
      
      // Scale up during transition based on scroll
      const scale = 0.5 + (1.5 * easeProgress)
      meshRef.current.scale.setScalar(scale)
      
      // Enhanced rotation: rotates as it moves along the snake path
      meshRef.current.rotation.y = (scrollProgress || 0) * Math.PI * 6 // 6 full rotations during scroll
      meshRef.current.rotation.x = Math.sin((scrollProgress || 0) * Math.PI * 4) * 0.3 // Wobble effect
      meshRef.current.rotation.z = Math.cos((scrollProgress || 0) * Math.PI * 3) * 0.2 // Additional rotation
      
      // Complete transition when scroll reaches 100%
      if (progress >= 1 && onTransitionComplete) {
        onTransitionComplete()
      }
    } catch (error) {
      console.warn('Mars3D animation error:', error)
      setContextLost(true)
    }
  })

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = () => {
      setContextLost(true)
      console.warn('WebGL context lost')
    }
    
    const handleContextRestored = () => {
      setContextLost(false)
      console.log('WebGL context restored')
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('webglcontextlost', handleContextLost)
      window.addEventListener('webglcontextrestored', handleContextRestored)
      
      return () => {
        window.removeEventListener('webglcontextlost', handleContextLost)
        window.removeEventListener('webglcontextrestored', handleContextRestored)
      }
    }
  }, [])

  if (contextLost) {
    return (
      <mesh ref={meshRef} position={[15, 0, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#cc3300" />
      </mesh>
    )
  }

  return (
    <mesh ref={meshRef} position={[15, 0, -5]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhysicalMaterial
        map={marsTexture}
        roughness={0.8}
        metalness={0.1}
        emissive="#cc3300"
        emissiveIntensity={0.2}
        color={marsTexture ? "#ffffff" : "#cc3300"}
      />
    </mesh>
  )
}

// Enhanced Mars transition container
export const MarsTransitionContainer = ({ 
  scrollProgress,
  onTransitionComplete, 
  children 
}) => {
  const [showMarsPage, setShowMarsPage] = useState(false)
  
  const handleTransitionComplete = () => {
    setShowMarsPage(true)
    if (onTransitionComplete) {
      onTransitionComplete()
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Mars Canvas - positioned to slide from right based on scroll */}
      <div 
        className={`absolute inset-0 z-20 transition-opacity duration-500 ${
          scrollProgress > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          
          <Mars3D 
            scrollProgress={scrollProgress}
            onTransitionComplete={handleTransitionComplete}
          />
        </Canvas>
      </div>

      {/* Mars page content - revealed after transition */}
      <AnimatePresence>
        {showMarsPage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MarsTransitionContainer

