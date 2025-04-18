import React from 'react';
import './Platform.css';

const Platform = () => {
  const platformData = {
    title: "The Dirac Platform",
    features: [
      {
        id: 1,
        title: "Browser-Based IDE (Dirac Web Studio)",
        description: "Our intuitive web interface (powered by Rust & WASM) lets you visually design circuits or write quantum code in Python-like syntax. Visualize outcomes, track qubit states, and experiment with advanced algorithms in just a few clicks.",
        bulletPoints: [
          "Drag-and-Drop Circuit Builder: Great for quick prototyping or teaching quantum concepts.",
          "Text Editor with Syntax Highlighting: Familiar code-based approach for advanced users—no extra installations needed.",
          "One-Click Sharing: Publish circuits to the model hub or share them privately with your team."
        ],
        icon: "💻",
        color: "var(--color-purple)"
      },
      {
        id: 2,
        title: "Quantum Model Zoo & Dataset Repository",
        description: "Explore curated quantum models—like Shor's algorithm for factoring or QAOA for optimization. Browse domain-specific datasets (chemistry, finance, cryptography) to jumpstart your project. Contribute your own research to gain visibility and collaborate with peers.",
        bulletPoints: [],
        icon: "🧪",
        color: "var(--color-blue)"
      },
      {
        id: 3,
        title: "Rust Core SDK & Python Bindings",
        description: "Prefer local development? Dirac offers a Rust SDK for maximum performance and a Python interface for those comfortable with Qiskit-like tooling. Seamlessly import or export OpenQASM so your circuits remain portable.",
        bulletPoints: [],
        icon: "⚡",
        color: "var(--color-teal)"
      },
      {
        id: 4,
        title: "Multi-Backend Execution",
        description: "",
        bulletPoints: [
          "Local WASM Simulation: Ideal for up to ~20 qubits directly in your browser.",
          "Cloud HPC Simulation: For bigger circuits (25–30+ qubits), offload seamlessly to Dirac's high-performance Rust servers.",
          "Real Quantum Hardware: Coming soon! (Integration with major quantum cloud providers such as IBM Quantum Experience or AWS Braket.)"
        ],
        icon: "🔌",
        color: "var(--color-green)"
      }
    ]
  };

  return (
    <section id="platform" className="platform-section">
      <div className="grid-overlay"></div>
      
      <div className="platform-content container">
        <div className="section-header fade-in">
          <h1>{platformData.title}</h1>
          <div className="header-underline"></div>
        </div>
        
        <div className="platform-features-grid">
          {platformData.features.map((feature, index) => (
            <div key={feature.id} className="platform-feature fade-in-delayed" style={{"--delay": `${index * 0.1 + 0.2}s`}}>
              <div className="feature-number" style={{"--feature-color": feature.color}}>4.{feature.id}</div>
              
              <div className="feature-header">
                <div className="feature-icon-wrapper" style={{"--feature-color": feature.color}}>
                  <span className="feature-icon">{feature.icon}</span>
                  <div className="icon-glow"></div>
                </div>
                
                <h2 className="feature-title" style={{"--feature-color": feature.color}}>{feature.title}</h2>
              </div>
              
              {feature.description && (
                <div className="feature-description">
                  <p>{feature.description}</p>
                </div>
              )}
              
              {feature.bulletPoints && feature.bulletPoints.length > 0 && (
                <div className="feature-bullets">
                  <ul>
                    {feature.bulletPoints.map((point, i) => (
                      <li key={i}>
                        <span className="bullet-dot" style={{"--feature-color": feature.color}}></span>
                        <span className="bullet-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="feature-decoration">
                <div className="quantum-circuit" style={{"--feature-color": feature.color}}>
                  <div className="circuit-line"></div>
                  <div className="circuit-node"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="platform-cta fade-in">
          <button className="cta-button">
            <span className="button-text">Try Dirac Web Studio</span>
            <span className="button-glow"></span>
          </button>
          <p className="cta-subtext">No installation required – start building quantum circuits now</p>
        </div>
      </div>
    </section>
  );
};

export default Platform;