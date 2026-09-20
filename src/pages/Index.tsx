
import React, { useState, useEffect } from 'react';
import { Terminal } from '@/components/Terminal';
import { PortfolioPopup } from '@/components/PortfolioPopup';
import { ExperiencePopup } from '@/components/ExperiencePopup';
import { GlitchText } from '@/components/GlitchText';
import { TypeWriter } from '@/components/TypeWriter';
import CalTechHelp from '@/components/CalTechHelp';

const Index = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [terminalReady, setTerminalReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTerminalReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
          animation: 'pulse 4s ease-in-out infinite alternate'
        }} />
      </div>
      <CalTechHelp />
      {/* Main content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="mb-8">
          <GlitchText 
            text="ALYSSA GABLE" 
            className="text-4xl md:text-6xl font-bold mb-2"
          />
          <TypeWriter 
            text="Full Stack Developer | Creative Technologist | Digital Artist"
            className="text-lg md:text-xl text-green-300"
            delay={2000}
          />
        </div>

        {/* Terminal component */}
        <div className="max-w-4xl mx-auto">
          <Terminal 
            onPortfolioCommand={() => setShowPortfolio(true)}
            onExperienceCommand={() => setShowExperience(true)}
            ready={terminalReady}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Portfolio popup */}
      <PortfolioPopup 
        isOpen={showPortfolio}
        onClose={() => setShowPortfolio(false)}
      />

      {/* Experience popup */}
      <ExperiencePopup 
        isOpen={showExperience}
        onClose={() => setShowExperience(false)}
      />
    </div>
  );
};

export default Index;
