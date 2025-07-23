import React from 'react'
import ScrollTransitionController from './ScrollTransitionController'
import AboutMeWithSolarSystem from './AboutMeWithSolarSystem' // Your existing about component
import FinalMarsWorkExperienceComponent from './WorkHistory' // Your existing Mars component

// Main App Component with Integrated Transition (No Sound)
const IntegratedTransitionApp = () => {

  // Enhanced About Page Component with transition preparation
  const EnhancedAboutPage = () => (
    <div className="relative">
      {/* Add transition preparation overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-10" />
      
      {/* Your existing AboutMeWithSolarSystem component */}
      <AboutMeWithSolarSystem />
      
      {/* Additional space for scroll transition */}
      <div className="h-screen" />
    </div>
  )

  // Enhanced Mars Page Component with entry effects
  const EnhancedMarsPage = () => (
    <div className="relative min-h-screen">
      {/* Mars atmosphere effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.3) 0%, rgba(139, 69, 19, 0.2) 40%, transparent 70%)',
          animation: 'marsAtmosphere 8s ease-in-out infinite'
        }}
      />
      
      {/* Your existing FinalMarsWorkExperienceComponent */}
      <FinalMarsWorkExperienceComponent />
      
      {/* Additional Mars-themed styling */}
      <style jsx>{`
        @keyframes marsAtmosphere {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )

  return (
    <div className="relative">
      {/* Global styles for smooth transition */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
        }
        
        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #00bcd4, #ff6b35);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #00e5ff, #ff8a50);
        }
      `}</style>

      {/* Main Scroll Transition Controller */}
      <ScrollTransitionController
        aboutPageComponent={<EnhancedAboutPage />}
        marsPageComponent={<EnhancedMarsPage />}
      />
    </div>
  )
}

export default IntegratedTransitionApp

