import React from 'react';
import './Market.css';

const Market = () => {
  const marketData = {
    title: "Market & Opportunity",
    description: "Quantum computing is poised to unlock billions—if not trillions—of dollars in value across industries like finance, pharmaceuticals, logistics, and beyond. Yet the software stack remains fragmented and challenging. Our quantum-neutral, open platform addresses this gap by:",
    bulletPoints: [
      {
        id: 1,
        title: "Enterprise Integration",
        content: "Seamlessly connect quantum computing capabilities with existing enterprise systems and workflows. Our platform eliminates the complexity of quantum integration while maintaining security and compliance standards that businesses expect.",
        icon: "🔗"
      },
      {
        id: 2,
        title: "Algorithm Acceleration",
        content: "Optimize quantum algorithms to achieve up to 200x performance improvements over standard implementations. Our proprietary middleware translates classical problems into quantum-ready formats without requiring specialized quantum expertise from your team.",
        icon: "⚡"
      },
      {
        id: 3,
        title: "Hardware Abstraction",
        content: "Access multiple quantum hardware providers through a single unified interface, preventing vendor lock-in and future-proofing your quantum strategy. Deploy your solutions across different quantum architectures without code rewrites or performance penalties.",
        icon: "🔄"
      }
    ]
  };

  return (
    <section id="market" className="market-section">
      <div className="grid-overlay"></div>
      
      <div className="market-content container">
        <div className="title-wrapper">
          <div className="section-header fade-in">
            <h1>{marketData.title}</h1>
            <div className="header-underline"></div>
          </div>
        </div>
        
        <div className="market-intro fade-in">
          <p>{marketData.description}</p>
        </div>
        
        <div className="market-points-container">
          {marketData.bulletPoints.map((point) => (
            <div key={point.id} className="market-point-card fade-in-delayed">
              <div className="point-icon-container">
                <div className="point-icon">
                  <span className="icon-symbol">{point.icon}</span>
                  <div className="icon-ring"></div>
                </div>
              </div>
              
              <div className="point-content">
                <h3 className="point-title">{point.title}</h3>
                <p>{point.content}</p>
              </div>
              
              <div className="point-decoration">
                <div className="quantum-line"></div>
                <div className="quantum-dot"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="market-visual">
          <div className="graph-container">
            <div className="graph-title">Quantum Computing Market Growth</div>
            <div className="graph-content">
              <div className="graph-bar" style={{ height: '30%' }}>
                <div className="bar-label">2022</div>
              </div>
              <div className="graph-bar" style={{ height: '45%' }}>
                <div className="bar-label">2023</div>
              </div>
              <div className="graph-bar" style={{ height: '60%' }}>
                <div className="bar-label">2024</div>
              </div>
              <div className="graph-bar" style={{ height: '75%' }}>
                <div className="bar-label">2025</div>
              </div>
              <div className="graph-bar graph-projected" style={{ height: '90%' }}>
                <div className="bar-label">2026</div>
              </div>
            </div>
            <div className="graph-grid"></div>
          </div>
        </div>
        
        <div className="cta-container fade-in">
          <button className="cta-button">
            <span className="button-text">Explore Solutions</span>
            <span className="button-glow"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Market;