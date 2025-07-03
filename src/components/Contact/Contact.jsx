import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const [activeTab, setActiveTab] = useState('form');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=devs@dirac.id&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    
    window.open(gmailUrl, '_blank');

    setFormStatus({
      submitted: true,
      error: false,
      message: 'Opening Gmail to send your message...'
    });
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: false,
        message: ''
      });
    }, 5000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="grid-overlay"></div>
      
      <div className="contact-content container">
        <div className="title-wrapper">
          <div className="section-header fade-in">
            <h1>Contact & Partnerships</h1>
            <div className="header-underline"></div>
          </div>
        </div>
        
        <div className="contact-intro">
          <p>Got a question or a project in mind? Interested in enterprise solutions or a research partnership?</p>
          <p className="intro-secondary">We're always open to new collaborations—hardware vendors, universities, or private sector R&D teams. Let's shape the quantum future together.</p>
        </div>
        
        <div className="mobile-tabs">
          <button 
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <span className="tab-icon">✉️</span>
            <span>Message</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <span className="tab-icon">📍</span>
            <span>Info</span>
          </button>
        </div>
        
        <div className={`contact-container ${activeTab}`}>
          <div className={`contact-form-container ${activeTab === 'form' ? 'active' : ''}`}>
            <div className="form-card">
              <h3>Send Us a Message</h3>
              
              {formStatus.submitted && (
                <div className={`form-status ${formStatus.error ? 'error' : 'success'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or question..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="cta-button contact">
                  <span className="button-text">Send Message</span>
                  <span className="button-glow"></span>
                </button>
                
              </form>
            </div>
          </div>
          
          <div className={`contact-info ${activeTab === 'info' ? 'active' : ''}`}>
            <div className="info-grid">
              <div className="info-card primary">
                <div className="info-icon">✉️</div>
                <h3>Email Us</h3>
                <p><a href="mailto:devs@dirac.id">devs@dirac.id</a></p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Visit Us</h3>
                <p>Dirac HQ, Sydney, Australia</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🕐</div>
                <h3>Office Hours</h3>
                <p>Mon-Fri: 9AM-6PM AEST</p>
              </div>
              
              <div className="info-card social-card">
                <div className="info-icon">💬</div>
                <h3>Connect</h3>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Twitter">
                    <span className="social-icon">𝕏</span>
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <span className="social-icon">in</span>
                  </a>
                  <a href="#" className="social-link" aria-label="GitHub">
                    <span className="social-icon">⌨</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;