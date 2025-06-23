import React from 'react';
import './Community.css';

const Community = () => {
  const communityData = {
    title: "Join the Community",
    sections: [
      {
        id: 1,
        title: "Contribute",
        items: [
          {
            id: "ambassador", 
            title: "Become a Dirac Ambassador",
            description: "Help local meetups, create tutorials, or translate docs.",
            icon: "🌟",
            color: "var(--color-purple)"
          },
          {
            id: "models",
            title: "Share Your Experience",
            description: "Share what you've built! Your work could spark new ideas.",
            icon: "💡",
            color: "var(--color-blue)"
          },
          {
            id: "collaborate",
            title: "Request New Features",
            description: "All are welcome to share ideas for new features or improvements.",
            icon: "🤝",
            color: "var(--color-orange)"
          }
        ]
      },
      {
        id: 2,
        title: "Stay Connected",
        items: [
          {
            id: "forum",
            title: "Community Forum",
            description: "Ask questions, get help, or bounce around new quantum ideas.",
            icon: "💬",
            color: "var(--color-teal)"
          },
          {
            id: "chat",
            title: "Discord Channel",
            description: "Live chat for real-time collaboration and announcements.",
            icon: "📱",
            color: "var(--color-green)"
          },
          {
            id: "newsletter",
            title: "Newsletter",
            description: "Sign up to get the latest on Dirac updates, events, and industry insights.",
            icon: "📮",
            color: "var(--color-pink)"
          }
        ]
      }
    ]
  };

  return (
    <section id="community" className="community-section">
      <div className="grid-overlay"></div>
      <div className="community-content container">
        <div className="section-header fade-in">
          <h1>{communityData.title}</h1>
          <div className="header-underline"></div>
        </div>
        
        <div className="community-sections">
          {communityData.sections.map((section) => (
            <div key={section.id} className="community-section-container fade-in-delayed" style={{"--delay": `${section.id * 0.2}s`}}>
              <h2 className="section-title">{section.title}</h2>
              
              <div className="community-items-grid">
                {section.items.map((item, index) => (
                  <div key={item.id} className="community-item fade-in-delayed" style={{"--delay": `${index * 0.1 + 0.3}s`}}>
                    <div className="item-header">
                      <div className="item-icon-wrapper" style={{"--item-color": item.color}}>
                        <span className="item-icon">{item.icon}</span>
                        <div className="icon-glow"></div>
                      </div>
                      
                      <h3 className="item-title" style={{"--item-color": item.color}}>{item.title}</h3>
                    </div>
                    
                    <div className="item-description">
                      <p>{item.description}</p>
                    </div>
                    
                    <div className="item-decoration">
                      <div className="quantum-circuit" style={{"--item-color": item.color}}>
                        <div className="circuit-line"></div>
                        <div className="circuit-node"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="community-cta fade-in">
          <button className="cta-button">
            <span className="button-text">Discord Channel Coming Soon!</span>
            <span className="button-glow"></span>
          </button>
          <p className="cta-subtext">Connect with thousands of quantum enthusiasts and researchers</p>
        </div>
      </div>
    </section>
  );
};

export default Community;