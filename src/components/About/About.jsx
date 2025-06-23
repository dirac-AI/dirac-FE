import React, { useEffect, useState, useRef } from 'react';
import './About.css';

const ParticleField = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 3,
      speed: Math.random() * 0.1 + 0.005,
      direction: Math.random() * 360,
      opacity: Math.random() * 0.7 + 0.1
    }));
    
    setParticles(newParticles);
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const radians = particle.direction * (Math.PI / 180);
        let newX = particle.x + Math.cos(radians) * particle.speed;
        let newY = particle.y + Math.sin(radians) * particle.speed;
        
        if (newX <= 0 || newX >= 100) {
          particle.direction = 180 - particle.direction;
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY <= 0 || newY >= 100) {
          particle.direction = 360 - particle.direction;
          newY = Math.max(0, Math.min(100, newY));
        }
        
        return { ...particle, x: newX, y: newY };
      }));
    }, 35);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="particle-field">
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
        />
      ))}
    </div>
  );
};

const AboutContent = () => {
  return (
    <div className="about-sections">
      <div className="about-section-item fade-in-delay-1">
        <div className="section-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="section-content">
          <h2>Our Vision</h2>
          <p>To make quantum computing accessible, intuitive, and effortless by removing barriers to entry. We envision a future where quantum technology is as seamless and widespread as classical computing—unlocking revolutionary breakthroughs in science, medicine, cryptography, artificial intelligence, and beyond.</p>
        </div>
      </div>
      
      <div className="about-section-item fade-in-delay-2">
        <div className="section-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>We're building a next-generation quantum computing platform, built in Rust for speed and simplicity. By breaking down barriers to adoption, we're empowering pioneers in research, AI, and security to solve tomorrow's hardest problems, today - accelerating humanity's leap into the quantum era.</p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="background-animation">
        <div className="particle-container fade-in-delay-3">
          <ParticleField />
        </div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className="container about-content">
        <div className="section-header fade-in">
          <h1>About Dirac</h1>
          <div className="header-underline"></div>
        </div>
        
        <AboutContent />
      </div>
    </section>
  );
};

export default About;