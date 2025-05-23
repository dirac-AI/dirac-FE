import React, { useState, useEffect } from 'react';
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
        <div className="logo">DIRAC</div>
        
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
          <li><a href="#why">Why Us</a></li>
          <li><a href="#platform">Platform</a></li>
          <li><a href="#market">Market</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="#business">Business Model</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className={`mobile-nav-popup ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home" onClick={toggleMenu}>Home</a></li>
            <li><a href="#about" onClick={toggleMenu}>About</a></li>
            <li><a href="#why" onClick={toggleMenu}>Why Us</a></li>
            <li><a href="#platform" onClick={toggleMenu}>Platform</a></li>
            <li><a href="#market" onClick={toggleMenu}>Market</a></li>
            <li><a href="#roadmap" onClick={toggleMenu}>Roadmap</a></li>
            <li><a href="#business" onClick={toggleMenu}>Business Model</a></li>
            <li><a href="#team" onClick={toggleMenu}>Team</a></li>
            <li><a href="#community" onClick={toggleMenu}>Community</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;