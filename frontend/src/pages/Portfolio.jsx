import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F2] relative">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #232323 1px, transparent 1px),
              linear-gradient(to bottom, #232323 1px, transparent 1px)
            `,
            backgroundSize: '47.6px 47.6px'
          }}
        />
      </div>
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Certifications />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;