
// components/AnimatedBackground.js
'use client';
import React, { useMemo } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({
  variant = 'floatingShapes',
  speed = 'normal',
  density = 'medium',
  darkMode = false
}) => {
  // Animation speed configurations
  const speedConfigs = {
    slow: { duration: 30, delay: 15 },
    normal: { duration: 20, delay: 10 },
    fast: { duration: 12, delay: 6 }
  };

  // Density configurations
  const densityConfigs = {
    low: 6,
    medium: 12,
    high: 18
  };

  const currentSpeed = speedConfigs[speed] || speedConfigs.normal;
  const shapeCount = densityConfigs[density] || densityConfigs.medium;

  // Generate random shapes with memoization for performance
  const shapes = useMemo(() => {
    const generatedShapes = [];
    const shapeTypes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < shapeCount; i++) {
      generatedShapes.push({
        id: i,
        type: shapeTypes[i % 3],
        size: Math.random() * 30 + 15, // 15-45px
        left: Math.random() * 95,      // 0-95%
        top: Math.random() * 95,       // 0-95%
        animationDelay: Math.random() * 15, // 0-15s delay
        opacity: Math.random() * 0.25 + 0.05, // 0.05-0.3 opacity
        rotationDuration: Math.random() * 20 + 10, // 10-30s rotation
        moveDistance: Math.random() * 50 + 20 // 20-70px movement
      });
    }
    return generatedShapes;
  }, [shapeCount]);

  // Generate wave data
  const waves = useMemo(() => {
    const generatedWaves = [];
    for (let i = 0; i < 4; i++) {
      generatedWaves.push({
        id: i,
        height: Math.random() * 2 + 1, // 1-3px
        top: 15 + i * 20,              // Spread vertically
        duration: 25 + i * 8,          // Different speeds
        delay: i * 3,                  // Staggered start
        opacity: 0.15 - i * 0.02       // Decreasing opacity
      });
    }
    return generatedWaves;
  }, []);

  // Generate dots data
  const dots = useMemo(() => {
    const generatedDots = [];
    const dotCount = Math.floor(shapeCount * 0.8);
    
    for (let i = 0; i < dotCount; i++) {
      generatedDots.push({
        id: i,
        size: Math.random() * 4 + 2,     // 2-6px
        left: Math.random() * 98,        // 0-98%
        top: Math.random() * 98,         // 0-98%
        animationDelay: Math.random() * 20, // 0-20s delay
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
        pulseDuration: Math.random() * 5 + 3 // 3-8s pulse
      });
    }
    return generatedDots;
  }, [shapeCount]);

  // Render floating shapes variant
  const renderFloatingShapes = () => {
    return shapes.map((shape) => {
      const shapeStyle = {
        left: `${shape.left}%`,
        top: `${shape.top}%`,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        opacity: shape.opacity,
        animationDelay: `${shape.animationDelay}s`,
        animationDuration: `${currentSpeed.duration}s`,
        '--move-distance': `${shape.moveDistance}px`,
        '--rotation-duration': `${shape.rotationDuration}s`
      };

      return (
        <div
          key={shape.id}
          className={`animated-shape shape-${shape.type} ${darkMode ? 'dark-mode' : 'light-mode'}`}
          style={shapeStyle}
        />
      );
    });
  };

  // Render gentle waves variant
  const renderGentleWaves = () => {
    return waves.map((wave) => {
      const waveStyle = {
        top: `${wave.top}%`,
        height: `${wave.height}px`,
        opacity: wave.opacity,
        animationDuration: `${wave.duration}s`,
        animationDelay: `${wave.delay}s`
      };

      return (
        <div
          key={wave.id}
          className={`animated-wave ${darkMode ? 'dark-mode' : 'light-mode'}`}
          style={waveStyle}
        >
          <div className="wave-element" />
        </div>
      );
    });
  };

  // Render moving dots variant
  const renderMovingDots = () => {
    return dots.map((dot) => {
      const dotStyle = {
        left: `${dot.left}%`,
        top: `${dot.top}%`,
        width: `${dot.size}px`,
        height: `${dot.size}px`,
        opacity: dot.opacity,
        animationDelay: `${dot.animationDelay}s`,
        animationDuration: `${currentSpeed.duration}s`,
        '--pulse-duration': `${dot.pulseDuration}s`
      };

      return (
        <div
          key={dot.id}
          className={`animated-dot ${darkMode ? 'dark-mode' : 'light-mode'}`}
          style={dotStyle}
        />
      );
    });
  };

  // Render appropriate variant
  const renderVariant = () => {
    switch (variant) {
      case 'gentleWaves':
        return renderGentleWaves();
      case 'movingDots':
        return renderMovingDots();
      case 'floatingShapes':
      default:
        return renderFloatingShapes();
    }
  };

  return (
    <div 
      className={`animated-background ${variant} ${speed} ${darkMode ? 'dark-mode' : 'light-mode'}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="animation-container">
        {renderVariant()}
      </div>
    </div>
  );
};

export default AnimatedBackground;

