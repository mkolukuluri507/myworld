import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'ABOUT', id: 'about' },
    { label: 'TECH', id: 'tech' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'CERTS', id: 'certifications' },
    { label: 'CONTACT', id: 'contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2F2F2]/90 backdrop-blur-sm border-b border-[rgba(35,35,35,0.1)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="font-mono text-lg font-normal text-[#232323] uppercase tracking-wider cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            MOURYA.DEV
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider px-3 py-2 transition-opacity duration-150 hover:opacity-70 active:opacity-50"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#232323] transition-opacity duration-150 hover:opacity-70"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[rgba(35,35,35,0.1)]">
            <div className="flex flex-col space-y-2 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider px-3 py-3 text-left transition-opacity duration-150 hover:opacity-70 active:opacity-50"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;