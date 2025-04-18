import React, { useState, useEffect, useRef } from 'react';
import './WhyUs.css';

// Optimized quantum particles background for mobile and desktop
const LightQuantumBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = checkDevice();
    
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Debounced resize handler
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
    
    // Set device pixel ratio for sharper rendering on high DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    
    // Scale the context to ensure correct drawing operations
    ctx.scale(dpr, dpr);
    
    // Style the canvas element to match dimensions while accounting for DPI
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    
    // Reduce particle count for mobile
    const particleCount = isMobile ? 40 : 75;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * (isMobile ? 1.5 : 2) + 1,
        color: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 0.3 + 0.05, // Reduced speed
        speedY: Math.random() * 0.3 + 0.05, // Reduced speed
        connections: []
      });
    }
    
    // Set lower target FPS for mobile
    const targetFPS = isMobile ? 24 : 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;
    
    // Check connections less frequently on mobile
    const connectionCheckInterval = isMobile ? 5 : 3;
    // Maximum connection distance is smaller on mobile
    const maxConnectionDistance = isMobile ? 80 : 100;
    
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastFrameTime;
      
      if (deltaTime >= frameInterval) {
        lastFrameTime = timestamp - (deltaTime % frameInterval);
        
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          // Move particles
          p.x += p.speedX;
          p.y += p.speedY;
          
          // Wrap around screen edges
          if (p.x < 0) p.x = dimensions.width;
          if (p.x > dimensions.width) p.x = 0;
          if (p.y < 0) p.y = dimensions.height;
          if (p.y > dimensions.height) p.y = 0;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          
          // Find and draw connections less frequently to improve performance
          if (timestamp % connectionCheckInterval === 0) {
            p.connections = [];
            
            // Only check a subset of particles to reduce calculations
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
          
          // Draw connections
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
  const autoScrollInterval = useRef(null);

  const cards = [
    {
      title: "High-Performance with Rust",
      description: "Traditional quantum libraries rely heavily on Python, which can limit performance. Dirac's core is written in Rust, a systems language known for speed and memory safety. This lets you simulate larger circuits faster and run more advanced quantum algorithms—even on modest hardware.",
      icon: "👨‍💻"
    },
    {
      title: "WebAssembly for Instant Access",
      description: "No installation nightmares. With WebAssembly (WASM), Dirac's simulator can run directly in your browser. Open a URL, design a quantum circuit, and see results in real time. For larger jobs, Dirac seamlessly offloads computations to cloud backends—so you choose the right environment for your needs.",
      icon: "✅"
    },
    {
      title: "Neutral & Hardware-Agnostic",
      description: "No vendor lock-in. Dirac integrates with multiple quantum hardware and cloud providers. Develop algorithms on our in-browser simulator, then run them on IBM, AWS Braket, IonQ, or any other supported backend. You stay in control of your quantum journey.",
      icon: "💡"
    },
    {
      title: "Open Model Dataset Hub",
      description: "Like Hugging Face for AI, Dirac hosts an ever-growing library of community-contributed quantum models and datasets. Easily publish your latest quantum algorithm or discover and adapt existing solutions—accelerating research and avoiding 'reinventing the wheel.'",
      icon: "❤️"
    },
    {
      title: "Community-Driven",
      description: "Join a vibrant network of developers, researchers, and enthusiasts. Exchange ideas on our discussion boards, showcase your projects in the Dirac model zoo, and learn from quantum experts worldwide. When you share, you help build the future of quantum computing—together.",
      icon: "📈"
    }
  ];

  // Check if screen is mobile with debouncing
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    
    // Debounce resize event for better performance
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

  // Scroll to active card with improved scrolling
  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const scrollPosition = activeIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);

  // Optimized scroll handler with throttling
  const handleScroll = () => {
    if (!carouselRef.current || !isMobile) return;
    
    // Clear the auto-scroll interval when user manually scrolls
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    // Calculate which card is most visible
    const scrollPosition = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.offsetWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < cards.length) {
      setActiveIndex(newIndex);
    }
  };

  // Throttled scroll handler for better performance
  const throttledHandleScroll = () => {
    if (!carouselRef.current._scrollTimeout) {
      carouselRef.current._scrollTimeout = setTimeout(() => {
        handleScroll();
        carouselRef.current._scrollTimeout = null;
      }, 100);
    }
  };

  const QuantumCard = ({ title, description, index, icon }) => {
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
            <h1>Why Dirac?</h1>
            <div className="header-underline"></div>
          </div>
        </div>
        
        {isMobile ? (
          <>
            <div 
              className="cards-carousel" 
              ref={carouselRef}
              onScroll={throttledHandleScroll}
            >
              {cards.map((card, index) => (
                <div className="carousel-item" key={`carousel-card-${index}`}>
                  <QuantumCard 
                    title={card.title}
                    description={card.description}
                    index={index}
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
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="cards-container">
            {/* Desktop Layout: First Row - 3 Cards */}
            <div className="cards-row first-row">
              {cards.slice(0, 3).map((card, index) => (
                <QuantumCard 
                  key={`card-${index}`}
                  title={card.title}
                  description={card.description}
                  index={index}
                  icon={card.icon}
                />
              ))}
            </div>
            
            {/* Desktop Layout: Second Row - 2 Cards (Centered) */}
            <div className="cards-row second-row">
              {cards.slice(3).map((card, index) => (
                <QuantumCard 
                  key={`card-${index + 3}`}
                  title={card.title}
                  description={card.description}
                  index={index + 3}
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