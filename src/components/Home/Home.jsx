import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

const OptimizedQuantumVisualization = () => {
  const rotationRef = useRef(0);
  const [styleVars, setStyleVars] = useState({
    '--rotation': '0deg',
    '--pulse-size': '1',
    '--glow-intensity': '10px',
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    
    checkIfMobile();
    
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

    if (!isMobile) {
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [isMobile, isHovered]);

  if (isMobile) {
    return null;
  }

  return (
    <div 
      className="quantum-visualization" 
      style={styleVars}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Single 3D object instead of 6 faces */}
      <div className="quantum-sphere">
        <div className="quantum-ring horizontal"></div>
        <div className="quantum-ring vertical"></div>
        <div className="quantum-ring diagonal"></div>
        
        {/* Just 3 qubits instead of 6 */}
        <div className="quantum-core">
          <div className="qubit qubit-1"></div>
          <div className="qubit qubit-2"></div>
          <div className="qubit qubit-3"></div>
        </div>
        
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
          <h1 className="fade-in">Quantum Computing for Everyone—Faster, Open, and in Your Browser.</h1>
          <p className="fade-in-delay-1">
            Dirac is an open, high-performance quantum computing platform built in Rust and WebAssembly.
            Whether you're a researcher, developer, or organization, Dirac helps you explore, build, and share quantum algorithms at scale—no complex setup required.
          </p>
        </div>
        
        {!isMobile && (
          <div className="hero-image fade-in-delay-1">
            <div className="float-animation">
              <OptimizedQuantumVisualization />
            </div>
          </div>
        )}
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