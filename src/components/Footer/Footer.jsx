import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-section">
      <div className="background">
        <div className="grid-overlay"></div>
      </div>
      
      <div className="container footer-content">
        <div className="quote-container">
          <div className="quote-icon">"</div>
          <blockquote className="quote-text">
            “Dirac” is inspired by Paul Dirac, pioneering physicist and father of quantum theory.
          </blockquote>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-info">
          <div className="copyright">
            © {currentYear} Dirac. All rights reserved.
          </div>
          
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <span className="link-separator">•</span>
            <a href="/terms" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;