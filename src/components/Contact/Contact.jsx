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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! We will get back to you soon.'
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
          <p>We're always open to new collaborations—hardware vendors, universities, or private sector R&D teams. Let's shape the quantum future together.</p>
        </div>
        
        <div className="contact-container">
          <div className="contact-form-container">
            <div className="form-card">
              <h3>Send Us a Message</h3>
              
              {formStatus.submitted && (
                <div className={`form-status ${formStatus.error ? 'error' : 'success'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="contact-form">
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
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                  <span className="button-text">Send Message</span>
                  <span className="button-glow"></span>
                </button>
              </form>
            </div>
          </div>
          
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email Us</h3>
              <p><a href="mailto:hello@dirac.au">hello@dirac.au</a></p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Dirac HQ, Sydney, Australia</p>
            </div>
            
            <div className="info-card">
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
    </section>
  );
};

export default Contact;