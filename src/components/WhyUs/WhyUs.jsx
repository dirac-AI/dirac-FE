import React, { useState, useEffect, useRef } from 'react';
import './WhyUs.css';

const LightQuantumBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = checkDevice();
    
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkDevice();
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;
    
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    
    const particleCount = isMobile ? 40 : 75;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * (isMobile ? 1.5 : 2) + 1,
        color: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 0.3 + 0.05,
        speedY: Math.random() * 0.3 + 0.05,
        connections: []
      });
    }
    
    const targetFPS = isMobile ? 24 : 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;
    
    const connectionCheckInterval = isMobile ? 5 : 3;
    const maxConnectionDistance = isMobile ? 80 : 100;
    
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastFrameTime;
      
      if (deltaTime >= frameInterval) {
        lastFrameTime = timestamp - (deltaTime % frameInterval);
        
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          p.x += p.speedX;
          p.y += p.speedY;
          
          if (p.x < 0) p.x = dimensions.width;
          if (p.x > dimensions.width) p.x = 0;
          if (p.y < 0) p.y = dimensions.height;
          if (p.y > dimensions.height) p.y = 0;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          
          if (timestamp % connectionCheckInterval === 0) {
            p.connections = [];
            
            const checkLimit = isMobile ? Math.min(15, particles.length) : particles.length;
            
            for (let j = i + 1; j < checkLimit; j++) {
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < maxConnectionDistance) {
                p.connections.push({
                  point: p2,
                  opacity: 1 - distance / maxConnectionDistance
                });
              }
            }
          }
          
          p.connections.forEach(conn => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(conn.point.x, conn.point.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${conn.opacity * (isMobile ? 0.15 : 0.2)})`;
            ctx.lineWidth = isMobile ? 0.4 : 0.5;
            ctx.stroke();
          });
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    let animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, isMobile]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="quantum-particles-canvas" 
      style={{ 
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

const WhyUs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollEndTimer = useRef(null);

  const cards = [
    {
      title: "High-Performance with Rust",
      description: "Leverage the speed, safety, and concurrency of Rust to build blazing-fast AI solutions. Our Rust-powered platform delivers high performance, memory efficient tools for mission-critical AI applications that demand both power and precision.",
      icon: "⚡"
    },
    {
      title: "Flexible & Future-Proof AI Integration",
      description: "Designed to seamlessly integrate with any AI model or hardware, our solution ensures adaptability without vendor lock-in. Whether upgrading existing systems or adopting new frameworks, we provide a neutral foundation—keeping you ahead in the fast-evolving AI landscape.",
      icon: "✅"
    },
    {
      title: "Community-Driven Platform",
      description: "Built by developers, for developers. Our platform thrives on community contributions, ensuring continuous innovation, transparency, and adaptability. Join a global network of AI enthusiasts shaping the future—together.",
      icon: "📈"
    },
    {
      title: "Multi-Platform Agentic AI",
      description: "Break free from silos with AI agents that operate seamlessly across devices, operating systems, and environments. Our platform enables intelligent agents to adapt, communicate, and execute tasks anywhere.",
      icon: "💻"
    },
    {
      title: "Multi-LLM Orchestration",
      description: "Unlock the full potential of generative AI by dynamically leveraging leading LLMs in a single workflow. Our platform intelligently routes queries and combines strengths—giving you the best response for every task.",
      icon: "👨‍💻"
    }
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIfMobile, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current || !isMobile) return;
    
    clearTimeout(scrollEndTimer.current);
    
    scrollEndTimer.current = setTimeout(() => {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      
      const boundedIndex = Math.max(0, Math.min(newIndex, cards.length - 1));
      
      setActiveIndex(boundedIndex);
      
      const targetPosition = boundedIndex * cardWidth;
      if (Math.abs(scrollPosition - targetPosition) > 1) {
        carouselRef.current.scrollTo({
          left: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  const navigateToCard = (index) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      const scrollPosition = index * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const QuantumCard = ({ title, description, icon }) => {
    return (
      <div className={`quantum-card`}>
        <div className="card-icon">{icon}</div>
        <div className="card-glow"></div>
        <h2>{title}</h2>
        <div className="card-divider"></div>
        <p>{description}</p>
      </div>
    );
  };

  return (
    <section id="why" className="section why-us-section">
      <div className="quantum-particles-container">
        <LightQuantumBackground />
      </div>
      <div className="grid-overlay"></div>
      <div className="container whyus-content">
        <div className="title-wrapper">
          <div className="section-header fade-in">
            <h1>The Dirac Platform</h1>
            <div className="header-underline"></div>
          </div>
        </div>
        
        {isMobile ? (
          <>
            <div 
              className="cards-carousel" 
              ref={carouselRef}
              onScroll={handleScroll}
            >
              {cards.map((card, index) => (
                <div className="carousel-item" key={`carousel-card-${index}`}>
                  <QuantumCard 
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                  />
                </div>
              ))}
            </div>
            <div className="carousel-indicators">
              {cards.map((_, index) => (
                <button 
                  key={`indicator-${index}`}
                  className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => navigateToCard(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="cards-container">
            <div className="cards-row first-row">
              {cards.slice(0, 3).map((card, index) => (
                <QuantumCard 
                  key={`card-${index}`}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
            
            <div className="cards-row second-row">
              {cards.slice(3).map((card, index) => (
                <QuantumCard 
                  key={`card-${index + 3}`}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyUs;