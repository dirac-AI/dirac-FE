import React, { useState, useEffect, useRef } from 'react';
import './Team.css';

const Team = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeLocation, setActiveLocation] = useState('australia');
  const nodesRef = useRef(null);
  
  // Location data with adjusted coordinates
  const locations = {
    australia: {
      title: "Headquarters",
      location: "Australia",
      description: "Corporate HQ, leadership, and strategic partnerships.",
      leadership: "CEO: Vision, fundraising, and partnerships.",
      coordinates: { x: 70, y: 70 },
      icon: "🏢"
    },
    singapore: {
      title: "R&D Center",
      location: "Singapore",
      description: "Quantum scientists and Rust engineers driving innovation.",
      leadership: "CTO: Oversees quantum R&D and core tech.",
      coordinates: { x: 40, y: 45 }, // Adjusted to be further away
      icon: "🔬"
    },
    indonesia: {
      title: "Devops",
      location: "Indonesia",
      description: "Full-stack development, QA, DevOps, and support.",
      leadership: "VP Engineering: Manages platform development and operations.",
      coordinates: { x: 75, y: 35 }, // Adjusted to be further away
      icon: "💻"
    }
  };

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Animate the location nodes in a slight circular motion
  useEffect(() => {
    if (!isMobile) {
      const animateNodes = () => {
        const nodes = document.querySelectorAll('.location-node');
        
        nodes.forEach((node, index) => {
          const baseDelay = index * 2; // Stagger the animation
          const animate = () => {
            const time = Date.now() / 1000;
            const originalX = parseFloat(node.dataset.originalX || node.style.left);
            const originalY = parseFloat(node.dataset.originalY || node.style.top);
            
            if (!node.dataset.originalX) {
              node.dataset.originalX = originalX;
              node.dataset.originalY = originalY;
            }
            
            // Small circular motion
            const radius = 2; // Radius of the circular motion (small)
            const frequency = 0.2; // Speed of the motion
            const offsetX = radius * Math.sin(time * frequency + baseDelay);
            const offsetY = radius * Math.cos(time * frequency + baseDelay);
            
            node.style.left = `calc(${node.dataset.originalX}% + ${offsetX}px)`;
            node.style.top = `calc(${node.dataset.originalY}% + ${offsetY}px)`;
            
            requestAnimationFrame(animate);
          };
          
          animate();
        });
      };
      
      // Start the animation when nodes are ready
      const nodesInit = setInterval(() => {
        if (document.querySelectorAll('.location-node').length > 0) {
          clearInterval(nodesInit);
          animateNodes();
        }
      }, 100);
      
      return () => clearInterval(nodesInit);
    }
  }, [isMobile]);

  const handleLocationClick = (location) => {
    setActiveLocation(location);
  };

  return (
    <section id="team" className="section team-locations-section">
      <div className="grid-overlay"></div>
      <div className="container team-locations-content">
        <div className="title-wrapper">
          <div className="section-header fade-in">
            <h1>Team & Locations</h1>
            <div className="header-underline"></div>
          </div>
        </div>

        {isMobile ? (
          // Mobile view - Tabbed interface
          <div className="location-tabs">
            <div className="tab-buttons">
              {Object.keys(locations).map((key) => (
                <button 
                  key={key}
                  className={`tab-button ${activeLocation === key ? 'active' : ''}`}
                  onClick={() => handleLocationClick(key)}
                >
                  <span className="location-icon">{locations[key].icon}</span>
                  <span className="location-name">{locations[key].location}</span>
                </button>
              ))}
            </div>
            
            <div className="location-detail">
              <div className="location-header">
                <h2>{locations[activeLocation].title}</h2>
                <h3>{locations[activeLocation].location}</h3>
              </div>
              <div className="location-body">
                <div className="location-section">
                  <h4>Operations</h4>
                  <p>{locations[activeLocation].description}</p>
                </div>
                <div className="location-section">
                  <h4>Leadership</h4>
                  <p>{locations[activeLocation].leadership}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Desktop view - Interactive Globe
          <div className="globe-container">
            <div className="globe-visualization">
              <div className="globe-ring-outer"></div>
              <div className="globe-ring-middle"></div>
              <div className="globe-ring-inner"></div>
              
              {Object.keys(locations).map((key) => (
                <div 
                  key={key}
                  className={`location-node ${activeLocation === key ? 'active' : ''}`}
                  style={{ 
                    left: `${locations[key].coordinates.x}%`, 
                    top: `${locations[key].coordinates.y}%` 
                  }}
                  onClick={() => handleLocationClick(key)}
                >
                  <div className="node-pulse"></div>
                  <div className="node-icon">{locations[key].icon}</div>
                  <div className="node-label">{locations[key].location}</div>
                </div>
              ))}
              
              <div className="quantum-connections">
                <svg className="connections-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line className="connection-line" x1="70" y1="70" x2="40" y2="45" />
                  <line className="connection-line" x1="40" y1="45" x2="75" y2="35" />
                  <line className="connection-line" x1="75" y1="35" x2="70" y2="70" />
                </svg>
              </div>
            </div>
            
            <div className="location-info-panel">
              <div className="location-info-content">
                <div className="location-info-header">
                  <div className="location-title">
                    <h2>{locations[activeLocation].title}</h2>
                    <h3>{locations[activeLocation].location}</h3>
                  </div>
                  <div className="location-selector-horizontal">
                    {Object.keys(locations).map((key) => (
                      <button 
                        key={key}
                        className={`location-button-horizontal ${activeLocation === key ? 'active' : ''}`}
                        onClick={() => handleLocationClick(key)}
                      >
                        <span className="button-icon">{locations[key].icon}</span>
                        {locations[key].location}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="info-sections">
                  <div className="location-info-section">
                    <h4>Operations</h4>
                    <p>{locations[activeLocation].description}</p>
                  </div>
                  <div className="location-info-section">
                    <h4>Leadership</h4>
                    <p>{locations[activeLocation].leadership}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="team-mission-statement">
          <p>Our distributed team reflects our mission: quantum computing should be borderless, collaborative, and inclusive.</p>
        </div>
      </div>
    </section>
  );
};

export default Team;