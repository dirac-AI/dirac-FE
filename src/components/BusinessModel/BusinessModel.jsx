import React from 'react';
import './BusinessModel.css';

const BusinessModel = () => {
  return (
    <section id="business" className="pricing-section">
      <div className="grid-overlay"></div>
      <div className="quantum-particles-container"></div>
      
      <div className="pricing-content container">
        <div className="title-wrapper">
          <div className="section-header fade-in">
            <h1>Pricing & Business Model</h1>
            <div className="header-underline"></div>
          </div>
        </div>
        
        <div className="pricing-intro">
          <p>Flexible options to support both open-source community and enterprise needs</p>
        </div>
        
        <div className="pricing-cards-container">
          <div className="pricing-card freemium-card">
            <div className="card-glow"></div>
            <div className="pricing-icon">
              <span className="icon-symbol">⚛️</span>
            </div>
            <h3>Freemium for Community</h3>
            <p>Dirac's core platform is free and open-source—fueling community growth and contributions.</p>
            <div className="card-decoration">
              <div className="quantum-circle"></div>
            </div>
          </div>
          
          <div className="pricing-card premium-card">
            <div className="card-glow"></div>
            <div className="pricing-icon">
              <span className="icon-symbol">⭐</span>
            </div>
            <h3>Premium Subscriptions</h3>
            <p>Organizations or power users can upgrade for:</p>
            <ul className="features-list">
              <li>
                <span className="feature-bullet"></span>
                Private Repos & Collaboration Tools
              </li>
              <li>
                <span className="feature-bullet"></span>
                Larger/Unlimited Simulation Quotas
              </li>
              <li>
                <span className="feature-bullet"></span>
                Faster, Priority Compute Access
              </li>
              <li>
                <span className="feature-bullet"></span>
                Advanced Features (noise simulation, HPC integrations, etc.)
              </li>
            </ul>
            <div className="card-decoration">
              <div className="quantum-circle"></div>
            </div>
          </div>
          
          <div className="pricing-card consulting-card">
            <div className="card-glow"></div>
            <div className="pricing-icon">
              <span className="icon-symbol">🔬</span>
            </div>
            <h3>Consulting & Services</h3>
            <p>For enterprises needing custom quantum solutions or integration support, we offer consulting, training, and professional services—helping fund further platform development.</p>
            <div className="card-decoration">
              <div className="quantum-circle"></div>
            </div>
          </div>
          
          <div className="pricing-card usage-card">
            <div className="card-glow"></div>
            <div className="pricing-icon">
              <span className="icon-symbol">📊</span>
            </div>
            <h3>Usage-Based Quantum Hardware</h3>
            <p>When you're ready to run on quantum hardware, we can broker access for a per-job fee—integrating seamlessly with multiple cloud providers.</p>
            <div className="card-decoration">
              <div className="quantum-circle"></div>
            </div>
          </div>
        </div>
        
        <div className="cta-container">
          <button className="cta-button">
            <span className="button-text">Contact Sales</span>
            <span className="button-glow"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;