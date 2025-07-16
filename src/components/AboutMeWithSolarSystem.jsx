import React from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Stars, Trail, useTexture, Sphere } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { TextureLoader, Vector3, MeshPhysicalMaterial } from 'three'

// Enhanced planet data with LARGER sizes and realistic properties
const planetData = [
  { 
    name: 'Mercury', 
    texture: '/assets/images/mercury.jpg', 
    size: 3.5,
    distance: 18, 
    speed: 1.8,
    tiltFactor: 0.4, 
    verticalRange: 2.5,
    orbitTilt: 0.1,
    eccentricity: 0.2,
    roughness: 0.9,
    metalness: 0.3,
    emissiveIntensity: 0.1
  },
  { 
    name: 'Venus', 
    texture: '/assets/images/venus.jpg', 
    size: 4.0,
    distance: 26, 
    speed: 1.4,
    tiltFactor: 0.6, 
    verticalRange: 3.0,
    orbitTilt: 0.15,
    eccentricity: 0.15,
    roughness: 0.8,
    metalness: 0.1,
    emissiveIntensity: 0.3,
    hasAtmosphere: true
  },
  { 
    name: 'Earth', 
    texture: '/assets/images/earth.jpg', 
    normalMap: '/assets/images/earth-normal.jpg',
    specularMap: '/assets/images/earth-specular.jpg',
    cloudsTexture: '/assets/images/earth-clouds.jpg',
    size: 4.5,
    distance: 35, 
    speed: 1.2,
    tiltFactor: 0.5, 
    verticalRange: 3.5,
    orbitTilt: 0.0,
    eccentricity: 0.1,
    roughness: 0.6,
    metalness: 0.2,
    emissiveIntensity: 0.2,
    hasAtmosphere: true,
    hasClouds: true
  },
  { 
    name: 'Mars', 
    texture: '/assets/images/mars.jpg', 
    size: 3.8,
    distance: 45, 
    speed: 1.0,
    tiltFactor: 0.7, 
    verticalRange: 4.0,
    orbitTilt: 0.2,
    eccentricity: 0.25,
    roughness: 0.9,
    metalness: 0.1,
    emissiveIntensity: 0.15
  },
  { 
    name: 'Jupiter', 
    texture: '/assets/images/jupiter.jpg', 
    size: 8.5,
    distance: 60, 
    speed: 0.7,
    tiltFactor: 0.3, 
    verticalRange: 5.0,
    orbitTilt: 0.05,
    eccentricity: 0.05,
    roughness: 0.7,
    metalness: 0.0,
    emissiveIntensity: 0.4,
    hasAtmosphere: true
  },
  { 
    name: 'Saturn', 
    texture: '/assets/images/saturn.jpg', 
    ringTexture: '/assets/images/saturn-ring.png',
    size: 7.5,
    distance: 75, 
    speed: 0.6,
    tiltFactor: 0.8, 
    verticalRange: 6.0,
    orbitTilt: 0.25,
    eccentricity: 0.1,
    roughness: 0.8,
    metalness: 0.0,
    emissiveIntensity: 0.3,
    hasRings: true
  },
  { 
    name: 'Uranus', 
    texture: '/assets/images/uranus.jpg', 
    size: 6.0,
    distance: 90, 
    speed: 0.4,
    tiltFactor: 1.2, 
    verticalRange: 7.0,
    orbitTilt: 0.8,
    eccentricity: 0.15,
    roughness: 0.6,
    metalness: 0.1,
    emissiveIntensity: 0.25
  },
  { 
    name: 'Neptune', 
    texture: '/assets/images/neptune.jpg', 
    size: 5.8,
    distance: 105, 
    speed: 0.3,
    tiltFactor: 0.9, 
    verticalRange: 8.0,
    orbitTilt: 0.3,
    eccentricity: 0.2,
    roughness: 0.7,
    metalness: 0.0,
    emissiveIntensity: 0.3
  }
]

// ENHANCED SOUND MANAGER COMPONENT - Completely fixed autoplay policy compliance and mute functionality
function SoundManager({ isEnabled, volume }) {
  const audioRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Initialize audio only once
  useEffect(() => {
    if (!audioRef.current && !isInitialized) {
      try {
        audioRef.current = new Audio('/assets/images/sound-effect.mp3')
        audioRef.current.loop = true
        audioRef.current.volume = volume
        audioRef.current.preload = 'auto'
        
        // Add event listeners for audio state tracking
        audioRef.current.addEventListener('play', () => setIsPlaying(true))
        audioRef.current.addEventListener('pause', () => setIsPlaying(false))
        audioRef.current.addEventListener('ended', () => setIsPlaying(false))
        
        setIsInitialized(true)
      } catch (error) {
        console.error('Audio initialization failed:', error)
      }
    }
  }, [volume, isInitialized])

  // Set up user interaction listeners
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true)
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction, { capture: true })
      document.removeEventListener('keydown', handleUserInteraction, { capture: true })
      document.removeEventListener('touchstart', handleUserInteraction, { capture: true })
    }

    if (!hasUserInteracted) {
      document.addEventListener('click', handleUserInteraction, { capture: true })
      document.addEventListener('keydown', handleUserInteraction, { capture: true })
      document.addEventListener('touchstart', handleUserInteraction, { capture: true })
    }

    return () => {
      document.removeEventListener('click', handleUserInteraction, { capture: true })
      document.removeEventListener('keydown', handleUserInteraction, { capture: true })
      document.removeEventListener('touchstart', handleUserInteraction, { capture: true })
    }
  }, [hasUserInteracted])

  // Handle play/pause based on isEnabled state and user interaction
  useEffect(() => {
    if (!audioRef.current || !isInitialized) return

    const audio = audioRef.current

    if (isEnabled && hasUserInteracted) {
      // Only try to play if user has interacted and audio is not already playing
      if (!isPlaying) {
        const playAudio = async () => {
          try {
            audio.currentTime = 0 // Reset to beginning
            await audio.play()
            console.log('Audio started playing')
          } catch (error) {
            console.log('Audio play failed:', error)
          }
        }
        
        playAudio()
      }
    } else {
      // Pause and reset audio when disabled
      if (isPlaying) {
        audio.pause()
        audio.currentTime = 0
        console.log('Audio stopped and reset')
      }
    }
  }, [isEnabled, hasUserInteracted, isInitialized, isPlaying])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current.removeEventListener('play', () => setIsPlaying(true))
        audioRef.current.removeEventListener('pause', () => setIsPlaying(false))
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false))
      }
    }
  }, [])

  return null
}

// ENHANCED SOUND CONTROL PANEL - Better state management and visual feedback
function SoundControlPanel({ isEnabled, setIsEnabled, volume, setVolume }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleSound = useCallback(() => {
    setIsEnabled(prev => {
      const newState = !prev
      console.log('Sound toggled:', newState ? 'enabled' : 'disabled')
      return newState
    })
  }, [setIsEnabled])

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    console.log('Volume changed to:', newVolume)
  }, [setVolume])

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <div className="bg-black/40 backdrop-blur-lg border border-cyan-400/50 rounded-2xl p-3 shadow-2xl">
        <div className="flex items-center space-x-3">
          {/* Sound Toggle Button with enhanced visual feedback */}
          <button
            onClick={handleToggleSound}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
              isEnabled 
                ? 'border-cyan-400 bg-cyan-400/30 text-cyan-400 shadow-lg shadow-cyan-400/50' 
                : 'border-red-500 bg-red-500/30 text-red-500 shadow-lg shadow-red-500/50'
            }`}
            title={isEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label={isEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {isEnabled ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd" />
                <path d="M14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0116 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0014 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 rounded-full border border-cyan-400/60 bg-cyan-400/20 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-400/30 transform hover:scale-105"
            title="Sound Settings"
            aria-label="Sound Settings"
          >
            <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Expanded Controls */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-cyan-400/30">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-cyan-400 font-mono font-bold">VOL</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #00bcd4 0%, #00bcd4 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                }}
                aria-label="Volume Control"
              />
              <span className="text-sm text-cyan-400 font-mono font-bold w-10 text-right">{Math.round(volume * 100)}</span>
            </div>
            <div className="mt-2 text-xs text-center text-gray-400">
              {isEnabled ? 'Sound Enabled' : 'Sound Disabled'}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ROBUST RESPONSIVE CAMERA CONTROLLER - Enhanced error handling and context management
function ResponsiveCamera() {
  const { camera, size, viewport, gl, scene } = useThree()
  const [isContextLost, setIsContextLost] = useState(false)
  
  // Handle WebGL context loss and restoration
  useEffect(() => {
    if (!gl || !gl.domElement) return

    const canvas = gl.domElement

    const handleContextLost = (event) => {
      event.preventDefault()
      setIsContextLost(true)
      console.log('WebGL context lost')
    }

    const handleContextRestored = () => {
      setIsContextLost(false)
      console.log('WebGL context restored')
      
      // Force re-initialization after context restoration
      setTimeout(() => {
        if (camera && gl && scene) {
          const viewportWidth = window.innerWidth
          const viewportHeight = window.innerHeight
          
          camera.aspect = viewportWidth / viewportHeight
          camera.updateProjectionMatrix()
          gl.setSize(viewportWidth, viewportHeight, false)
        }
      }, 100)
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [gl, camera, scene])
  
  useEffect(() => {
    // Skip if context is lost or essential objects are undefined
    if (isContextLost || !camera || !gl || !scene) return

    try {
      // FORCE ABSOLUTE POSITIONING AND FULL VIEWPORT COVERAGE
      const canvas = gl.domElement
      const canvasParent = canvas?.parentElement
      
      // Apply absolute positioning to canvas parent
      if (canvasParent) {
        canvasParent.style.position = 'absolute'
        canvasParent.style.top = '0'
        canvasParent.style.left = '0'
        canvasParent.style.width = '100vw'
        canvasParent.style.height = '100vh'
        canvasParent.style.zIndex = '0'
        canvasParent.style.margin = '0'
        canvasParent.style.padding = '0'
      }
      
      // Apply absolute positioning to canvas itself
      if (canvas) {
        canvas.style.position = 'absolute'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.width = '100vw'
        canvas.style.height = '100vh'
        canvas.style.zIndex = '0'
        canvas.style.margin = '0'
        canvas.style.padding = '0'
        canvas.style.display = 'block'
      }
      
      // FORCE VIEWPORT DIMENSIONS
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // IMMEDIATE camera adjustment based on screen size for instant full-screen rendering
      const aspect = viewportWidth / viewportHeight
      const isMobile = viewportWidth < 768
      const isTablet = viewportWidth >= 768 && viewportWidth < 1024
      
      // Set camera position immediately without delay
      if (isMobile) {
        camera.position.set(0, 40, 130)
        camera.fov = 105
      } else if (isTablet) {
        camera.position.set(0, 35, 100)
        camera.fov = 100
      } else {
        camera.position.set(0, 25, 75)
        camera.fov = 90
      }
      
      // Force immediate update with viewport dimensions
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      camera.updateMatrixWorld()
      
      // Force renderer to resize to exact viewport dimensions
      gl.setSize(viewportWidth, viewportHeight, false)
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      
      // Only render if scene and camera are properly defined
      if (scene && camera && scene.matrixWorldAutoUpdate !== undefined) {
        gl.render(scene, camera)
      }
    } catch (error) {
      console.error('Error in ResponsiveCamera:', error)
    }
  }, [camera, size, viewport, gl, scene, isContextLost])
  
  // Additional resize handler to ensure consistent sizing
  useEffect(() => {
    if (isContextLost || !camera || !gl) return

    const handleResize = () => {
      try {
        const canvas = gl.domElement
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        if (canvas) {
          canvas.style.width = '100vw'
          canvas.style.height = '100vh'
        }
        
        camera.aspect = viewportWidth / viewportHeight
        camera.updateProjectionMatrix()
        gl.setSize(viewportWidth, viewportHeight, false)
      } catch (error) {
        console.error('Error in resize handler:', error)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [camera, gl, isContextLost])
  
  return null
}

// Planet component with original motion logic
function Planet({ data, time, index }) {
  const meshRef = useRef()
  const atmosphereRef = useRef()
  const cloudsRef = useRef()
  const ringsRef = useRef()
  
  const texture = useLoader(TextureLoader, data.texture)
  const normalMap = data.normalMap ? useLoader(TextureLoader, data.normalMap) : null
  const specularMap = data.specularMap ? useLoader(TextureLoader, data.specularMap) : null
  const cloudsTexture = data.cloudsTexture ? useLoader(TextureLoader, data.cloudsTexture) : null
  const ringTexture = data.ringTexture ? useLoader(TextureLoader, data.ringTexture) : null

  useFrame((state) => {
    if (!meshRef.current) return

    // Original motion logic: planets move to screen edges and take various directions
    const baseTime = time * data.speed * 0.8
    const phaseOffset = index * Math.PI / 4
    
    // Calculate movement to screen edges with various directions
    const angle = baseTime + phaseOffset
    const screenEdgeDistance = 150 + (index * 20) // Distance to screen edges
    
    // Each planet takes a different directional pattern
    let x, y, z
    
    switch (index % 4) {
      case 0: // Move in figure-8 pattern towards right edge
        x = Math.cos(angle * 0.5) * screenEdgeDistance + Math.sin(angle) * 30
        y = Math.sin(angle * 2) * 40 + Math.cos(angle * 0.7) * 20
        z = Math.sin(angle * 0.8) * 60 + Math.cos(angle * 1.2) * 25
        break
      case 1: // Move in spiral pattern towards left edge
        x = -Math.cos(angle * 0.6) * screenEdgeDistance + Math.sin(angle * 1.5) * 35
        y = Math.cos(angle * 1.8) * 50 + Math.sin(angle * 0.9) * 15
        z = Math.cos(angle * 1.1) * 70 + Math.sin(angle * 0.6) * 30
        break
      case 2: // Move in wave pattern towards top edge
        x = Math.sin(angle * 1.2) * 80 + Math.cos(angle * 0.8) * 40
        y = Math.cos(angle * 0.4) * screenEdgeDistance + Math.sin(angle * 1.6) * 25
        z = Math.sin(angle * 0.9) * 55 + Math.cos(angle * 1.4) * 35
        break
      default: // Move in complex orbital pattern towards bottom edge
        x = Math.cos(angle * 0.7) * 90 + Math.sin(angle * 1.3) * 45
        y = -Math.sin(angle * 0.5) * screenEdgeDistance + Math.cos(angle * 1.7) * 30
        z = Math.cos(angle * 1.0) * 65 + Math.sin(angle * 0.8) * 40
        break
    }
    
    // Add additional random directional changes
    const directionChange = Math.sin(baseTime * 0.3 + index * 2) * 20
    const verticalDrift = Math.cos(baseTime * 0.4 + index * 1.5) * 15
    const depthVariation = Math.sin(baseTime * 0.6 + index * 3) * 25
    
    // Final position with directional variations
    meshRef.current.position.set(
      x + directionChange, 
      y + verticalDrift, 
      z + depthVariation
    )
    
    // Enhanced rotation with more dynamic movement
    meshRef.current.rotation.y += (0.025 + (index * 0.008)) * 1.2
    meshRef.current.rotation.x += (0.018 * data.tiltFactor + Math.sin(time * 2 + index) * 0.008) * 1.2
    meshRef.current.rotation.z += (0.012 * Math.cos(time * 1.5 + index) + data.tiltFactor * 0.006) * 1.2

    // Atmosphere effects
    if (atmosphereRef.current && data.hasAtmosphere) {
      atmosphereRef.current.position.copy(meshRef.current.position)
      atmosphereRef.current.rotation.y += 0.012
      const atmosphereScale = 1 + Math.sin(state.clock.elapsedTime * 4 + index) * 0.12
      atmosphereRef.current.scale.setScalar(atmosphereScale)
    }

    // Cloud layer animation
    if (cloudsRef.current && data.hasClouds) {
      cloudsRef.current.position.copy(meshRef.current.position)
      cloudsRef.current.rotation.y += 0.018
      cloudsRef.current.rotation.x = meshRef.current.rotation.x
      cloudsRef.current.rotation.z = meshRef.current.rotation.z
    }

    // Ring system animation
    if (ringsRef.current && data.hasRings) {
      ringsRef.current.position.copy(meshRef.current.position)
      ringsRef.current.rotation.x = Math.PI / 2 + data.tiltFactor * 0.3
      ringsRef.current.rotation.z += 0.005
    }
  })

  // Enhanced material properties for VFX quality
  const getEmissiveColor = () => {
    switch(data.name) {
      case 'Earth': return '#0066cc'
      case 'Mars': return '#cc3300'
      case 'Jupiter': return '#ff9900'
      case 'Venus': return '#ffcc00'
      case 'Saturn': return '#ffaa33'
      case 'Uranus': return '#00cccc'
      case 'Neptune': return '#0099ff'
      case 'Mercury': return '#999999'
      default: return '#ffffff'
    }
  }

  return (
    <group>
      {/* Main planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[data.size, 256, 256]} />
        <meshPhysicalMaterial 
          map={texture}
          normalMap={normalMap}
          roughnessMap={specularMap}
          emissive={getEmissiveColor()} 
          emissiveIntensity={data.emissiveIntensity}
          roughness={data.roughness}
          metalness={data.metalness}
          clearcoat={data.name === 'Earth' ? 0.3 : 0}
          clearcoatRoughness={0.1}
          transmission={data.name === 'Jupiter' ? 0.1 : 0}
          thickness={0.5}
        />
      </mesh>

      {/* Atmosphere layer */}
      {data.hasAtmosphere && (
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[data.size * 1.05, 64, 64]} />
          <meshBasicMaterial
            color={data.name === 'Earth' ? '#87CEEB' : data.name === 'Venus' ? '#FFA500' : '#FFE4B5'}
            transparent
            opacity={0.15}
            side={2}
          />
        </mesh>
      )}

      {/* Cloud layer for Earth */}
      {data.hasClouds && cloudsTexture && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[data.size * 1.02, 128, 128]} />
          <meshBasicMaterial
            map={cloudsTexture}
            transparent
            opacity={0.4}
            alphaTest={0.1}
          />
        </mesh>
      )}

      {/* Ring system for Saturn */}
      {data.hasRings && ringTexture && (
        <mesh ref={ringsRef}>
          <ringGeometry args={[data.size * 1.5, data.size * 2.5, 128]} />
          <meshBasicMaterial
            map={ringTexture}
            transparent
            opacity={0.8}
            side={2}
          />
        </mesh>
      )}
    </group>
  )
}

// Earth's Moon component with enhanced motion
function Moon({ earthPosition, time }) {
  const moonRef = useRef()
  const texture = useLoader(TextureLoader, '/assets/images/moon.jpg')

  useFrame(() => {
    if (!moonRef.current || !earthPosition) return

    // Enhanced moon motion - follows Earth but with more dynamic movement
    const moonOrbitRadius = 15
    const moonSpeed = time * 4.5 * 0.8
    const moonAngle = moonSpeed

    // Moon follows Earth's new motion pattern
    const moonX = earthPosition.x + Math.cos(moonAngle) * moonOrbitRadius + Math.sin(moonSpeed * 0.5) * 8
    const moonZ = earthPosition.z + Math.sin(moonAngle) * moonOrbitRadius + Math.cos(moonSpeed * 0.7) * 6
    const moonY = earthPosition.y + Math.sin(moonSpeed * 0.8) * 3.0 + Math.cos(moonSpeed * 1.2) * 2

    moonRef.current.position.set(moonX, moonY, moonZ)
    moonRef.current.rotation.y += 0.012
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshPhysicalMaterial 
        map={texture}
        roughness={0.9}
        metalness={0.1}
        emissive="#666666"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Enhanced Sun with larger size and VFX-quality effects
function ProfileSun() {
  const meshRef = useRef()
  const coronaRef = useRef()
  const flareRef = useRef()
  const sunTextureMap = useLoader(TextureLoader, '/assets/images/sun.jpg')
  const [pulseIntensity, setPulseIntensity] = useState(1.2)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.009
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.z += 0.002
      
      const pulse = Math.sin(state.clock.elapsedTime * 2.0) * 0.25 + 1.0
      const secondaryPulse = Math.cos(state.clock.elapsedTime * 1.0) * 0.2
      const tertiaryPulse = Math.sin(state.clock.elapsedTime * 4) * 0.12
      setPulseIntensity(pulse + secondaryPulse + tertiaryPulse)
      
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.4
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.3
    }

    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.006
      coronaRef.current.rotation.z += 0.004
      const coronaScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2
      coronaRef.current.scale.setScalar(coronaScale)
    }

    if (flareRef.current) {
      flareRef.current.rotation.y += 0.015
      const flareScale = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.4
      flareRef.current.scale.setScalar(flareScale)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[9.0, 256, 256]} />
        <meshPhysicalMaterial
          map={sunTextureMap}
          emissive="#ff6600"
          emissiveIntensity={pulseIntensity}
          roughness={0.9}
          transmission={0.1}
          thickness={2}
        />
      </mesh>
      
      <mesh ref={coronaRef}>
        <sphereGeometry args={[11.5, 64, 64]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh ref={flareRef}>
        <sphereGeometry args={[14.0, 32, 32]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  )
}

// Enhanced Satellite component with new motion pattern
function Satellite() {
  const satelliteRef = useRef()
  const texture = useLoader(TextureLoader, '/assets/images/satellite.jpg')

  useFrame((state) => {
    if (satelliteRef.current) {
      const time = state.clock.elapsedTime * 1.2
      
      // New motion: satellite moves to screen edges in zigzag pattern
      const edgeDistance = 120
      const zigzagAmplitude = 40
      
      const x = Math.cos(time * 0.3) * edgeDistance + Math.sin(time * 2.5) * zigzagAmplitude
      const y = Math.sin(time * 0.8) * 60 + Math.cos(time * 1.8) * 25
      const z = Math.cos(time * 0.5) * edgeDistance + Math.sin(time * 1.9) * 35
      
      // Add directional changes
      const directionX = Math.sin(time * 0.2) * 30
      const directionY = Math.cos(time * 0.4) * 20
      const directionZ = Math.sin(time * 0.6) * 25
      
      satelliteRef.current.position.set(x + directionX, y + directionY, z + directionZ)
      
      satelliteRef.current.rotation.y = time * 0.6 + Math.PI / 2
      satelliteRef.current.rotation.x = Math.sin(time * 2) * 0.3
      satelliteRef.current.rotation.z = Math.cos(time * 1.5) * 0.25
    }
  })

  return (
    <mesh ref={satelliteRef}>
      <boxGeometry args={[2, 1, 3]} />
      <meshPhysicalMaterial 
        map={texture}
        emissive="#0066ff" 
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    </mesh>
  )
}

// Enhanced Spaceship with new motion pattern and VFX trails
function Spaceship() {
  const spaceshipRef = useRef()
  const engineGlowRef = useRef()
  const texture = useLoader(TextureLoader, '/assets/images/spaceship.jpg')

  useFrame((state) => {
    if (spaceshipRef.current) {
      const time = state.clock.elapsedTime * 1.0
      
      // New motion: spaceship moves in complex patterns to screen edges
      const edgeDistance = 140
      const spiralRadius = 50
      
      const x = Math.cos(time * 0.25) * edgeDistance + Math.sin(time * 1.5) * spiralRadius
      const y = Math.sin(time * 0.6) * 80 + Math.cos(time * 2.2) * 30
      const z = Math.sin(time * 0.35) * edgeDistance + Math.cos(time * 1.8) * spiralRadius
      
      // Add complex directional movements
      const complexX = Math.sin(time * 0.15) * 40 + Math.cos(time * 0.8) * 20
      const complexY = Math.cos(time * 0.45) * 35 + Math.sin(time * 1.6) * 15
      const complexZ = Math.sin(time * 0.55) * 30 + Math.cos(time * 1.1) * 25
      
      spaceshipRef.current.position.set(x + complexX, y + complexY, z + complexZ)
      
      spaceshipRef.current.rotation.y = time * 0.5 + Math.PI / 2
      spaceshipRef.current.rotation.x = Math.sin(time * 1.8) * 0.3
      spaceshipRef.current.rotation.z = Math.cos(time * 1.6) * 0.25

      if (engineGlowRef.current) {
        engineGlowRef.current.position.set(x + complexX, y + complexY, z + complexZ)
        const glowIntensity = 1 + Math.sin(time * 12) * 0.6
        engineGlowRef.current.scale.setScalar(glowIntensity)
      }
    }
  })

  return (
    <group>
      <Trail
        width={6}
        length={50}
        color="#00ffff"
        attenuation={(t) => t * t * t}
      >
        <mesh ref={spaceshipRef}>
          <coneGeometry args={[1.5, 6, 12]} />
          <meshPhysicalMaterial 
            map={texture}
            emissive="#0088ff" 
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Trail>
      
      <mesh ref={engineGlowRef}>
        <sphereGeometry args={[3.0, 16, 16]} />
        <meshBasicMaterial 
          color="#00aaff" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// Enhanced starfield with larger stars and shining effects - CONTINUOUS LOOPING
function EnhancedStarField() {
  const starsRef = useRef()
  const nebulaRef = useRef()
  const shiningStarsRef = useRef()
  const cosmicDustRef = useRef()
  
  useFrame((state) => {
    // CONTINUOUS LOOPING - stars never stop moving
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005
      starsRef.current.rotation.x += 0.0003
      starsRef.current.rotation.z += 0.0001
    }
    
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y -= 0.0003
      nebulaRef.current.rotation.z += 0.0002
      nebulaRef.current.rotation.x += 0.0001
    }

    // Animate shining stars with continuous motion
    if (shiningStarsRef.current) {
      shiningStarsRef.current.rotation.y += 0.0006
      shiningStarsRef.current.rotation.x -= 0.0002
      shiningStarsRef.current.rotation.z += 0.0003
      
      // Create pulsing effect for shining stars
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      shiningStarsRef.current.scale.setScalar(pulseScale)
    }

    // Animate cosmic dust with continuous motion
    if (cosmicDustRef.current) {
      cosmicDustRef.current.rotation.y += 0.0002
      cosmicDustRef.current.rotation.x += 0.0001
      cosmicDustRef.current.rotation.z -= 0.0001
    }
  })

  return (
    <group>
      {/* Main starfield with larger stars */}
      <Stars
        ref={starsRef}
        radius={2000}
        depth={600}
        count={25000}
        factor={45}
        saturation={0.8}
        fade
        speed={4}
      />
      
      {/* Additional shining stars layer */}
      <Stars
        ref={shiningStarsRef}
        radius={1800}
        depth={500}
        count={8000}
        factor={60}
        saturation={1.0}
        fade
        speed={2}
      />
      
      {/* Enhanced nebula background */}
      <mesh ref={nebulaRef}>
        <sphereGeometry args={[1200, 32, 32]} />
        <meshBasicMaterial
          color="#4a0e4e"
          transparent
          opacity={0.06}
          side={2}
        />
      </mesh>

      {/* Additional cosmic dust effect */}
      <mesh ref={cosmicDustRef}>
        <sphereGeometry args={[1500, 24, 24]} />
        <meshBasicMaterial
          color="#2a1a3a"
          transparent
          opacity={0.03}
          side={2}
        />
      </mesh>
    </group>
  )
}

// ROBUST ERROR BOUNDARY COMPONENT - Now with proper React import
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Canvas Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
          <div className="text-cyan-400 text-xl font-mono text-center">
            <div>3D Rendering Error</div>
            <div className="text-sm mt-2">Please refresh the page</div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Main solar system scene with enhanced VFX and error handling
function SolarSystemScene() {
  const [time, setTime] = useState(0)
  const [earthPosition, setEarthPosition] = useState(new Vector3())
  
  useFrame((_, delta) => {
    setTime(prev => prev + delta * 0.25) // Decreased from 0.5 to 0.25 for slower planet movement
  })

  return (
    <>
      <ResponsiveCamera />
      
      <ambientLight intensity={0.3} color="#2a2a4a" />
      <pointLight position={[0, 0, 0]} intensity={15} distance={300} color="#ffaa00" />
      <pointLight position={[150, 150, 150]} intensity={6} distance={600} color="#ffffff" />
      <pointLight position={[-150, -150, -150]} intensity={5} distance={550} color="#4466ff" />
      <pointLight position={[0, 200, 0]} intensity={4} distance={500} color="#ff4466" />
      <directionalLight position={[300, 300, 300]} intensity={2} color="#ffffff" />
      
      <EnhancedStarField />
      
      <ProfileSun />
      {planetData.map((planet, i) => {
        const planetComponent = <Planet key={i} data={planet} time={time} index={i} />
        
        if (planet.name === 'Earth') {
          return (
            <group key={i}>
              {planetComponent}
              <Moon earthPosition={earthPosition} time={time} />
            </group>
          )
        }
        
        return planetComponent
      })}
      
      <Satellite />
      <Spaceship />
    </>
  )
}

const AboutMeWithSolarSystem = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundVolume, setSoundVolume] = useState(0.3)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    // IMMEDIATE screen size check for instant rendering
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    // Set loaded state after a brief delay to ensure proper initialization
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      clearTimeout(timer)
    }
  }, [])

  // COMPREHENSIVE SCROLLBAR HIDING - Apply to document body and html
  useEffect(() => {
    // Apply scrollbar hiding to document body and html
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    
    // Hide scrollbars on body and html
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    
    // Add comprehensive scrollbar hiding styles
    const style = document.createElement('style')
    style.textContent = `
      /* Hide scrollbars for all browsers */
      * {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
      }
      
      *::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
        width: 0px;
        background: transparent;
      }
      
      body {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      body::-webkit-scrollbar {
        display: none;
        width: 0px;
        background: transparent;
      }
      
      html {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      html::-webkit-scrollbar {
        display: none;
        width: 0px;
        background: transparent;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      // Cleanup
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl font-mono">Loading Solar System...</div>
      </div>
    )
  }

  return (
    <div 
      className="w-full h-screen relative"
      style={{
        // AGGRESSIVE SCROLLBAR HIDING
        overflow: 'auto',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
        WebkitScrollbar: 'none', // Webkit browsers
      }}
    >
      {/* COMPREHENSIVE CSS to hide scrollbars in ALL browsers - FIXED jsx attribute */}
      <style jsx="true">{`
        /* Global scrollbar hiding */
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        
        *::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          height: 0px !important;
          background: transparent !important;
        }
        
        *::-webkit-scrollbar-track {
          display: none !important;
        }
        
        *::-webkit-scrollbar-thumb {
          display: none !important;
        }
        
        *::-webkit-scrollbar-corner {
          display: none !important;
        }
        
        /* Specific targeting for main container */
        div {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        
        div::-webkit-scrollbar {
          display: none !important;
          width: 0px !important;
          height: 0px !important;
        }
        
        /* Custom slider styling */
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #00bcd4;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 15px rgba(0, 188, 212, 0.7);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(0, 188, 212, 0.9);
        }
        
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #00bcd4;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 15px rgba(0, 188, 212, 0.7);
        }
      `}</style>

      {/* Sound Manager */}
      <SoundManager isEnabled={soundEnabled} volume={soundVolume} />
      
      {/* Sound Control Panel */}
      <SoundControlPanel 
        isEnabled={soundEnabled}
        setIsEnabled={setSoundEnabled}
        volume={soundVolume}
        setVolume={setSoundVolume}
      />

      {/* FIXED: Enhanced background with nebula image - IMMEDIATE RENDERING */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/assets/images/nebula-bg.jpg')`, 
          filter: 'brightness(0.4) contrast(1.2) saturate(1.6)',
          zIndex: -2
        }}
      />

      {/* ROBUST FULL-SCREEN 3D Solar System Canvas with Error Boundary */}
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 0,
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          margin: 0,
          padding: 0
        }}
      >
        <CanvasErrorBoundary>
          <Canvas 
            camera={{ 
              position: isMobile ? [0, 40, 130] : isTablet ? [0, 35, 100] : [0, 25, 75], 
              fov: isMobile ? 105 : isTablet ? 100 : 90,
              near: 0.1,
              far: 6000
            }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: 2,
              toneMappingExposure: 1.3,
              preserveDrawingBuffer: true
            }}
            style={{
              width: '100vw',
              height: '100vh',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              margin: 0,
              padding: 0,
              display: 'block'
            }}
            resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
              // Additional WebGL context configuration
              gl.setClearColor(0x000000, 0)
            }}
          >
            <Suspense fallback={null}>
              <SolarSystemScene />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* SCROLLABLE CONTENT CONTAINER - with hidden scrollbars */}
      <div 
        className="relative z-10 h-screen"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* RESPONSIVE profile content with scrolling capability */}
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
          {/* RESPONSIVE Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className={`${
              isMobile ? 'w-32 h-32' : isTablet ? 'w-40 h-40' : 'w-48 h-48'
            } mb-4 sm:mb-4 rounded-full border-4 border-cyan-400 overflow-hidden shadow-lg`}
            style={{
              boxShadow: '0 0 80px rgba(34, 211, 238, 0.9), inset 0 0 30px rgba(34, 211, 238, 0.4)',
            }}
          >
            <img
              src="/assets/images/profile-image.jpeg"
              alt="Vineeth Ketham"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>

          {/* RESPONSIVE Bio Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.9 }}
            className={`bg-black/25 backdrop-blur-xl border border-cyan-400/60 rounded-2xl p-4 sm:p-6 lg:p-8 w-full ${
              isMobile ? 'max-w-sm' : isTablet ? 'max-w-2xl' : 'max-w-4xl'
            }`}
            style={{
              boxShadow: '0 0 120px rgba(34, 211, 238, 0.6), inset 0 0 60px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse mr-3 sm:mr-4" />
                <span className={`text-cyan-400 ${isMobile ? 'text-sm' : 'text-base'} font-mono tracking-wider`}>
                  VINEETH KETHAM
                </span>
              </div>

              <p className={`${
                isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'
              } text-gray-200 leading-relaxed`} style={{ fontFamily: 'Exo, sans-serif' }}>
                Results-driven Computer Science graduate with proven experience in software development, 
                machine learning, and full-stack web application design. Skilled in building scalable 
                systems using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Java 
                (including Spring Boot, multithreading, and RESTful APIs).
              </p>

              <p className={`${
                isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'
              } text-gray-200 leading-relaxed`} style={{ fontFamily: 'Exo, sans-serif' }}>
                Strong foundation in object-oriented programming, data analysis, cloud platforms like GCP, 
                and Agile methodologies. Demonstrated success in leading technical projects, contributing 
                to open-source initiatives, and delivering robust backend services and responsive user interfaces.
              </p>

              {/* RESPONSIVE Stats */}
              <motion.div
                className={`flex ${isMobile ? 'flex-col space-y-4' : 'justify-center space-x-6 sm:space-x-12'} mt-6 sm:mt-8`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <div className="text-center">
                  <div className={`${
                    isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'
                  } font-bold text-cyan-400`} style={{ textShadow: '0 0 25px rgba(34, 211, 238, 0.9)' }}>4+</div>
                  <div className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-gray-300`}>Years Experience</div>
                </div>
                <div className="text-center">
                  <div className={`${
                    isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'
                  } font-bold text-purple-400`} style={{ textShadow: '0 0 25px rgba(168, 85, 247, 0.9)' }}>20+</div>
                  <div className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-gray-300`}>Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className={`${
                    isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'
                  } font-bold text-green-400`} style={{ textShadow: '0 0 25px rgba(34, 197, 94, 0.9)' }}>10+</div>
                  <div className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-gray-300`}>Technologies Mastered</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RESPONSIVE Status */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.0 }}
            className="mt-6 sm:mt-6"
          >
            <div className={`inline-flex items-center ${
              isMobile ? 'flex-col space-y-2 px-4 py-3' : 'space-x-4 px-6 sm:px-8 py-3 sm:py-4'
            } bg-gradient-to-r from-cyan-600/30 to-purple-600/30 backdrop-blur-lg border border-cyan-400/60 rounded-full`}>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse" 
                   style={{ boxShadow: '0 0 25px rgba(34, 211, 238, 0.9)' }} />
              <span className={`text-white font-mono ${
                isMobile ? 'text-xs text-center' : 'text-sm md:text-base'
              } tracking-wider`}>
                ACTIVELY SEEKING OPPORTUNITIES TO CONTRIBUTE TO DYNAMIC ENGINEERING TEAMS
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutMeWithSolarSystem

