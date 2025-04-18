import React from 'react';
import './App.css';
import { CustomCursor } from "./components/CustomCursor";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import WhyUs from './components/WhyUs/WhyUs';
import Platform from './components/Platform/Platform';
import Market from './components/Market/Market';
import Roadmap from './components/Roadmap/Roadmap';
import BusinessModel from './components/BusinessModel/BusinessModel';
import Team from './components/Team/Team';
import Community from './components/Community/Community';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Navbar />
      <Home />
      <About />
      <WhyUs />
      <Platform />
      <Market />
      <Roadmap />
      <BusinessModel />
      <Team />
      <Community />
      <Contact />
      <Footer />
    </div>
  );
}

 {/*Home quantum cube is still heavy */}

export default App;