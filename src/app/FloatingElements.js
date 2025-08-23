import React, { useEffect, useRef } from 'react';
import './FloatingElements.css';

const FloatingElements = () => {
  const containerRef = useRef(null);

  // Reduced number of tools, only essential ones
  const developerTools = [
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#68A063' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
    { name: 'GitHub', icon: 'fab fa-github', color: '#24292e' },
  ];

  const premierTools = [
    { name: 'Photoshop', icon: 'fas fa-paint-brush', color: '#31A8FF' },
    { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E' },
    { name: 'Video', icon: 'fas fa-video', color: '#9333ea' },
  ];

  const allTools = [...developerTools, ...premierTools];

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.floating-element');
    
    if (elements) {
      elements.forEach((element, index) => {
        // More spread out positioning, avoid clustering
        const zones = [
          { x: 10, y: 15 }, { x: 85, y: 20 }, { x: 15, y: 75 },
          { x: 75, y: 80 }, { x: 50, y: 10 }, { x: 90, y: 60 },
          { x: 20, y: 45 }, { x: 65, y: 35 }
        ];
        
        const zone = zones[index % zones.length];
        const offsetX = (Math.random() - 0.5) * 10; // Small random offset
        const offsetY = (Math.random() - 0.5) * 10;
        
        element.style.left = `${zone.x + offsetX}%`;
        element.style.top = `${zone.y + offsetY}%`;
        
        // Longer, more varied delays
        element.style.animationDelay = `${Math.random() * 8}s`;
        
        // Consistent slow movement
        element.style.animationDuration = `${20 + Math.random() * 10}s`;
      });
    }

    // Subtle mouse interaction - less aggressive
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      elements?.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const elementX = elementRect.left - containerRect.left + elementRect.width / 2;
        const elementY = elementRect.top - containerRect.top + elementRect.height / 2;
        
        const deltaX = mouseX - elementX;
        const deltaY = mouseY - elementY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Reduced interaction radius and gentler effect
        if (distance < 100) {
          const force = (100 - distance) / 100;
          const moveX = -deltaX * force * 0.15; // Reduced force
          const moveY = -deltaY * force * 0.15;
          
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          element.style.transform = 'translate(0, 0)';
        }
      });
    };

    // Throttle mouse move for better performance
    let ticking = false;
    const throttledMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('mousemove', throttledMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);

  return (
    <div className="floating-elements-container" ref={containerRef}>
      {allTools.map((tool, index) => (
        <div
          key={index}
          className={`floating-element ${index < developerTools.length ? 'dev-tool' : 'premier-tool'}`}
          title={tool.name}
        >
          <i className={tool.icon} style={{ color: tool.color }}></i>
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;