import React, { useState, useEffect } from 'react';
import navbarLogo from "/navbar-logo.png"
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className={`logo-wrapper ${menuOpen ? 'open' : ''}`}  onClick={scrollToTop}>
          <img src={navbarLogo} alt="DIRAC Logo" className="logo-image"/>
          <div className="logo-text-container">
            <div className="logo-text-primary">DIRAC</div>
            <div className="logo-text-secondary">Agentic AI for Computing</div>
          </div>
        </div>
        
        <div className="mobile-menu-button" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className="nav-links desktop-nav">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#why">Platform</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="#business">Business Model</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className={`mobile-nav-popup ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-background">
            <div className="subtle-accent accent-1"></div>
            <div className="subtle-accent accent-2"></div>
            <div className="subtle-accent accent-3"></div>
            <div className="subtle-accent accent-4"></div>
            <div className="grid-pattern"></div>
          </div>
          <div className="mobile-nav-grid">
            <ul className="nav-links nav-column-1">
              <li><a href="#home" onClick={toggleMenu}>
                <span className="nav-icon">🏠</span>Home
              </a></li>
              <li><a href="#about" onClick={toggleMenu}>
                <span className="nav-icon">💡</span>About
              </a></li>
              <li><a href="#why" onClick={toggleMenu}>
                <span className="nav-icon">🚀</span>Platform
              </a></li>
              <li><a href="#roadmap" onClick={toggleMenu}>
                <span className="nav-icon">🗺️</span>Roadmap
              </a></li>
            </ul>
            <ul className="nav-links nav-column-2">
              <li><a href="#business" onClick={toggleMenu}>
                <span className="nav-icon">💼</span>Business
              </a></li>
              <li><a href="#team" onClick={toggleMenu}>
                <span className="nav-icon">👥</span>Team
              </a></li>
              <li><a href="#community" onClick={toggleMenu}>
                <span className="nav-icon">🌐</span>Community
              </a></li>
              <li><a href="#contact" onClick={toggleMenu}>
                <span className="nav-icon">📧</span>Contact
              </a></li>
            </ul>
          </div>
          <div className="mobile-nav-footer">
            <div className="brand-tagline">Agentic AI for Computing</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;