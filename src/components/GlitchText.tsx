
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [glitched, setGlitched] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitched(true);
      setTimeout(() => setGlitched(false), 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <h1 className={`${glitched ? 'animate-pulse' : ''} transition-all duration-150`}>
        {text}
      </h1>
      
      {/* Glitch layers */}
      {glitched && (
        <>
          <h1 
            className={`absolute top-0 left-0 text-red-500 ${className}`}
            style={{ 
              transform: 'translate(-2px, -1px)',
              opacity: 0.8,
              mixBlendMode: 'screen'
            }}
          >
            {text}
          </h1>
          <h1 
            className={`absolute top-0 left-0 text-blue-500 ${className}`}
            style={{ 
              transform: 'translate(2px, 1px)',
              opacity: 0.8,
              mixBlendMode: 'screen'
            }}
          >
            {text}
          </h1>
        </>
      )}
    </div>
  );
};
