import React, { useState, useEffect } from 'react';
import './Roadmap.css';

const TimelineNode = ({ title, items, active, index }) => {
  return (
    <div className={`timeline-node ${active ? 'active' : ''} fade-in-delay-${index}`}>
      <div className="timeline-marker">
        <div className="marker-dot"></div>
        <div className="marker-pulse"></div>
      </div>
      
      <div className="timeline-content">
        <h3 className="timeline-title">{title}</h3>
        <div className="timeline-card">
          <div className="card-glow"></div>
          <ul className="timeline-items">
            {items.map((item, idx) => (
              <li key={idx} className="timeline-item">
                <div className="item-dot"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Roadmap = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [circuitNodes, setCircuitNodes] = useState([]);
  
  useEffect(() => {
    const newNodes = [];
    for (let i = 0; i < 40; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        pulse: Math.random() * 4 + 2
      });
    }
    setCircuitNodes(newNodes);
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
    <section id="roadmap" className="section roadmap-section">
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
                animationDuration: `${node.pulse}s`
              }}
            />
          ))}
          
          <svg className="circuit-lines" width="100%" height="100%">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.5)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
              </linearGradient>
            </defs>
            <path className="circuit-path path1" d="M0,30 Q30,15 60,40 T120,35" stroke="url(#lineGradient)" />
            <path className="circuit-path path2" d="M20,80 Q60,40 100,70 T180,50" stroke="url(#lineGradient)" />
            <path className="circuit-path path3" d="M100,10 Q140,60 180,30 T240,70" stroke="url(#lineGradient)" />
            <path className="circuit-path path4" d="M-10,50 Q40,90 90,60 T150,90" stroke="url(#lineGradient)" />
          </svg>
        </div>

        <div className="grid-overlay"></div>
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
            <div className="timeline-progress" style={{ width: `${(activeNode / (timelineData.length - 1)) * 100}%` }}></div>
          </div>
          
          <div className="timeline-nodes">
            {timelineData.map((node, index) => (
              <TimelineNode
                key={index}
                title={node.title}
                items={node.items}
                active={index === activeNode}
                index={index + 1}
                onClick={() => handleNodeClick(index)}
              />
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
            ></button>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Roadmap;