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
          <p>Flexible options to support both free community and enterprise needs</p>
        </div>
        
        <div className="pricing-cards-container">
          <div className="pricing-card freemium-card">
            <div className="card-glow"></div>
            <div className="pricing-icon">
              <span className="icon-symbol">⚛️</span>
            </div>
            <h3>Freemium for Community</h3>
            <p>Dirac's core platform is free — fueling community growth and contributions.</p>
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
            <p>We keep core features free—premium unlocks power-ups for heavy users</p>
            <ul className="features-list">
              <li>
                <span className="feature-bullet"></span>
                Automatic Model Routing for Maximum Performance
              </li>
              <li>
                <span className="feature-bullet"></span>
                Implement/Recreate Code from Paper
              </li>
            </ul>
            <div className="card-decoration">
              <div className="quantum-circle"></div>
            </div>
          </div>
          
          <div className="pricing-card consulting-card">
            <div className="card-glow"></div>
            <div className="pricing-icon">
              <span className="icon-symbol">⚡</span>
            </div>
            <h3>Priority Support for Pro Users</h3>
            <p>Free users get community-based support, while paid subscribers enjoy faster, dedicated assistance.</p>
            <div className="card-decoration">
              <div className="quantum-circle"></div>
            </div>
          </div>
          
          <div className="pricing-card usage-card">
            <div className="card-glow"></div>
            <div className="pricing-icon">
              <span className="icon-symbol">⏳</span>
            </div>
            <h3>Exclusive Beta Features</h3>
            <p>Pro users get early access to experimental tools and can shape future updates through feedback.</p>
            <div className="card-decoration">
              <div className="quantum-circle"></div>
            </div>
          </div>
        </div>
        
        <div className="cta-container">
          <a href="#contact" className="cta-button-link">
            <button className="cta-button">
              <span className="button-text">Contact Sales</span>
              <span className="button-glow"></span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;