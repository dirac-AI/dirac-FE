import React, { useState, useEffect } from 'react';
import './Roadmap.css';

const TimelineNode = ({ items, active, index, onClick, isUpcoming }) => {
  return (
    <div 
      className={`timeline-node ${active ? 'active' : ''} ${isUpcoming ? 'upcoming' : ''}`}
      onClick={onClick}
    >
      <div className="timeline-marker">
        <div className="marker-dot">
          <div className="marker-inner"></div>
        </div>
      </div>
      
      <div className="timeline-content">
        <h3 className="timeline-title">
          {isUpcoming ? 
            <span className="upcoming-badge">Coming Soon</span> : 
            <span className="now-badge">Now</span>
          }
        </h3>
        <div className="timeline-card">
          {isUpcoming && <div className="upcoming-overlay"></div>}
          <div className="milestone-icon">
            {index === 0 && "🚀"}
            {index === 1 && "⚡"}
            {index === 2 && "🌟"}
            {index === 3 && "🎯"}
          </div>
          <ul className="timeline-items">
            {isUpcoming ? (
              <div className="upcoming-placeholder">
                <div className="placeholder-line"></div>
                <div className="placeholder-line short"></div>
                <div className="placeholder-line medium"></div>
              </div>
            ) : (
              items.map((item, idx) => (
                <li key={idx} className={`timeline-item ${active ? 'item-active' : ''}`}>
                  <div className="item-dot"></div>
                  <span>{item}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const FloatingParticle = ({ delay, duration, startX, startY }) => {
  return (
    <div 
      className="floating-particle"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        left: `${startX}%`,
        top: `${startY}%`
      }}
    />
  );
};

const Roadmap = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      startX: Math.random() * 100,
      startY: 100 + Math.random() * 20
    }));
    setParticles(newParticles);
  }, []);
  
  const timelineData = [
    {
      items: [
        "Quantum Specialized Multi LLM Agentic AI",
        "Research Partner and Code Developer/Co-pilot"
      ]
    },
    { items: ["Dummy Data", "Dummy Data", "Dummy Data"] },
    { items: ["Dummy Data", "Dummy Data", "Dummy Data"] },
    { items: ["Dummy Data", "Dummy Data", "Dummy Data"] }
  ];
  
  const handleNodeClick = (index) => {
    if (index === 0) {
      setActiveNode(index);
    }
  };
  
  const isUpcoming = (index) => index >= 1;
  
  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="background-animation">
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            startX={particle.startX}
            startY={particle.startY}
          />
        ))}

        <div className="grid-overlay"></div>
        <div className="quantum-mesh"></div>
      </div>
      
      <div className="container roadmap-content">
        <div className="section-header fade-in">
          <h1>Development Roadmap</h1>
          <div className="header-underline"></div>
          <p className="roadmap-description">
            Our quantum computing platform is being developed in stages to ensure quality, 
            performance, and community feedback throughout the process.
          </p>
        </div>
        
        <div className="quantum-timeline">
          <div className="timeline-track">
            <div className="timeline-progress" style={{ width: `${(activeNode / (timelineData.length - 1)) * 100}%` }}>
            </div>
            <div className="energy-pulse" style={{ left: `${(activeNode / (timelineData.length - 1)) * 100}%` }}></div>
          </div>
          
          <div className="timeline-nodes">
            {timelineData.map((node, index) => (
              <TimelineNode
                key={index}
                items={node.items}
                active={index === activeNode}
                index={index}
                onClick={() => handleNodeClick(index)}
                isUpcoming={isUpcoming(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="timeline-indicators">
          {timelineData.map((_, index) => (
            <button 
              key={index}
              className={`timeline-indicator ${index === activeNode ? 'active' : ''} ${isUpcoming(index) ? 'upcoming' : ''}`}
              onClick={() => handleNodeClick(index)}
              disabled={isUpcoming(index)}
            >
              <span className="indicator-fill"></span>
            </button>
          ))}
        </div>
        
        <div className="roadmap-stats">
          <div className="stat-card">
            <div className="stat-number">1/4</div>
            <div className="stat-label">Current Phase</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">25%</div>
            <div className="stat-label">Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Upcoming Phases</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;