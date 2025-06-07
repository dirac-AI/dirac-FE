import React, { useState, useEffect, useRef } from 'react';
import './Roadmap.css';

const TimelineNode = ({ title, items, active, index, onClick, isInView }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className={`timeline-node ${active ? 'active' : ''} ${isInView ? 'in-view' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="timeline-marker">
        <div className="marker-dot">
          <div className="marker-inner"></div>
        </div>
        <div className="marker-pulse"></div>
        {hovered && <div className="marker-ripple"></div>}
      </div>
      
      <div className="timeline-content">
        <h3 className="timeline-title">{title}</h3>
        <div className="timeline-card">
          <div className="card-glow"></div>
          <div className="card-border-animation"></div>
          <div className="milestone-icon">
            {index === 0 && "🚀"}
            {index === 1 && "⚡"}
            {index === 2 && "🌟"}
            {index === 3 && "🎯"}
          </div>
          <ul className="timeline-items">
            {items.map((item, idx) => (
              <li key={idx} className={`timeline-item ${active ? 'item-active' : ''}`} style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="item-dot">
                  <div className="item-dot-inner"></div>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="progress-indicator">
            <div className="progress-bar" style={{width: active ? '100%' : '0%'}}></div>
          </div>
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
  const [circuitNodes, setCircuitNodes] = useState([]);
  const [particles, setParticles] = useState([]);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Generate optimized circuit nodes
    const newNodes = [];
    for (let i = 0; i < 25; i++) { // Reduced from 40 for performance
      newNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        pulse: Math.random() * 4 + 2,
        delay: Math.random() * 2
      });
    }
    setCircuitNodes(newNodes);
    
    // Generate floating particles
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        startX: Math.random() * 100,
        startY: 100 + Math.random() * 20
      });
    }
    setParticles(newParticles);
  }, []);
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            if (!visibleNodes.includes(index)) {
              setVisibleNodes(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const nodes = document.querySelectorAll('.timeline-node');
    nodes.forEach((node) => observer.observe(node));
    
    return () => observer.disconnect();
  }, [visibleNodes]);
  
  // Auto-progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % timelineData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const timelineData = [
    {
      title: "Month 1-3",
      items: [
        "Core quantum simulation engine development",
        "Initial user interface design and implementation"
      ]
    },
    {
      title: "Month 4-6",
      items: [
        "Basic quantum gates and operations implementation",
        "Circuit designer and visualization tools",
        "Alpha testing with research partners"
      ]
    },
    {
      title: "Month 7-9",
      items: [
        "Advanced quantum algorithms library",
        "Cloud integration for complex computations",
        "Beta release with educational resources"
      ]
    },
    {
      title: "Month 10-12",
      items: [
        "Performance optimization and scaling improvements",
        "Comprehensive documentation and tutorials",
        "Full public release with community features"
      ]
    }
  ];
  
  const handleNodeClick = (index) => {
    setActiveNode(index);
  };
  
  return (
    <section id="roadmap" className="section roadmap-section" ref={sectionRef}>
      <div className="background-animation">
        <div className="circuit-background">
          {circuitNodes.map((node) => (
            <div 
              key={node.id}
              className="circuit-node"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                animationDuration: `${node.pulse}s`,
                animationDelay: `${node.delay}s`
              }}
            />
          ))}
          
          {particles.map((particle) => (
            <FloatingParticle
              key={particle.id}
              delay={particle.delay}
              duration={particle.duration}
              startX={particle.startX}
              startY={particle.startY}
            />
          ))}
          
          {/* <svg className="circuit-lines" width="100%" height="100%">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.5)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path className="circuit-path path1" d="M0,30 Q30,15 60,40 T120,35" stroke="url(#lineGradient)" filter="url(#glow)" />
            <path className="circuit-path path2" d="M20,80 Q60,40 100,70 T180,50" stroke="url(#lineGradient)" filter="url(#glow)" />
            <path className="circuit-path path3" d="M100,10 Q140,60 180,30 T240,70" stroke="url(#lineGradient)" filter="url(#glow)" />
            <path className="circuit-path path4" d="M-10,50 Q40,90 90,60 T150,90" stroke="url(#lineGradient)" filter="url(#glow)" />
          </svg> */}
        </div>

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
              <div className="progress-glow"></div>
            </div>
            <div className="energy-pulse" style={{ left: `${(activeNode / (timelineData.length - 1)) * 100}%` }}></div>
          </div>
          
          <div className="timeline-nodes">
            {timelineData.map((node, index) => (
              <div key={index} data-index={index}>
                <TimelineNode
                  title={node.title}
                  items={node.items}
                  active={index === activeNode}
                  index={index}
                  onClick={() => handleNodeClick(index)}
                  isInView={visibleNodes.includes(index)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="timeline-indicators">
          {timelineData.map((_, index) => (
            <button 
              key={index}
              className={`timeline-indicator ${index === activeNode ? 'active' : ''}`}
              onClick={() => handleNodeClick(index)}
              aria-label={`View ${timelineData[index].title}`}
            >
              <span className="indicator-fill"></span>
            </button>
          ))}
        </div>
        
        <div className="roadmap-stats">
          <div className="stat-card">
            <div className="stat-number">{activeNode + 1}/4</div>
            <div className="stat-label">Current Phase</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{Math.round((activeNode + 1) * 25)}%</div>
            <div className="stat-label">Progress</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;