import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import navbarLogo from "/navbar-logo.png"

const OptimizedQuantumVisualization = ({ isMobile }) => {
  const rotationRef = useRef(0);
  const [styleVars, setStyleVars] = useState({
    '--rotation': '0deg',
    '--pulse-size': '1',
    '--glow-intensity': '10px',
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let lastTimestamp = 0;
    const ROTATION_SPEED = 0.02;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      rotationRef.current = (rotationRef.current + ROTATION_SPEED * elapsed) % 1000000;
      
      setStyleVars({
        '--rotation': `${rotationRef.current}deg`,
        '--pulse-size': isHovered ? '1.1' : '1',
        '--glow-intensity': isHovered ? '15px' : '10px',
      });
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div 
      className={`quantum-visualization ${isMobile ? 'mobile-quantum' : ''}`}
      style={styleVars}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="logo-container">
        <img src={navbarLogo} alt="DIRAC Logo" className="logo-image-hero"/>
      </div>
      
      <div className="quantum-sphere">
        <div className="quantum-ring horizontal"></div>
        <div className="quantum-ring vertical"></div>
        <div className="quantum-ring diagonal"></div>
        
        <div className="quantum-particles"></div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <section id="home" className="section home-section">
      <div className="background-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-3"></div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className={`container home-content ${isMobile ? 'mobile-content' : ''}`}>
        <div className="hero-text">
          <h1 className="fade-in">Agentic AI for Quantum Computing</h1>
          <h3 className="fade-in">Unlocking Quantum’s True Potential</h3>
          <p className="fade-in-delay-1">
            Dirac is a next-generation agentic AI platform specialized for quantum computing research and development. By combining open-source AI agents with domain-specific tooling, Agent-Dirac aims to become an intelligent research assistant that accelerates discovery in quantum computing.
          </p>
        </div>
        
        <div className={`hero-image fade-in-delay-1 ${isMobile ? 'mobile-hero-image' : ''}`}>
          <div className="float-animation">
            <OptimizedQuantumVisualization isMobile={isMobile} />
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-down"></div>
      </div>
    </section>
  );
};

export default Home;