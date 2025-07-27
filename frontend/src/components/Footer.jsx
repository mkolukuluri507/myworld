import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { socialLinks } from '../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { label: 'About', id: 'about' },
        { label: 'Tech Stack', id: 'tech' },
        { label: 'Projects', id: 'projects' },
        { label: 'Certifications', id: 'certifications' },
        { label: 'Contact', id: 'contact' }
      ]
    },
    {
      title: 'Expertise',
      links: [
        { label: 'Backend Development', external: false },
        { label: 'Data Engineering', external: false },
        { label: 'API Design', external: false },
        { label: 'System Architecture', external: false },
        { label: 'Cloud Platforms', external: false }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'GitHub', url: socialLinks.github, external: true },
        { label: 'LinkedIn', url: socialLinks.linkedin, external: true },
        { label: 'Email', url: `mailto:${socialLinks.email}`, external: true }
      ]
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#232323] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
          {/* Left Column - Brand & Description */}
          <div className="space-y-8">
            <div>
              <div className="font-mono text-lg font-normal uppercase tracking-wider mb-4">
                MOURYA.DEV
              </div>
              <p className="text-base leading-relaxed text-[rgba(255,255,255,0.8)] max-w-md">
                Software Engineer & Aspiring Data Engineer passionate about building scalable systems 
                and exploring the frontiers of AI-powered development.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="font-mono text-xs font-normal text-[rgba(255,255,255,0.6)] uppercase tracking-wider mb-2">
                  EXPERIENCE
                </div>
                <div className="text-2xl font-bold text-[#38FF62]">3+ Years</div>
              </div>
              <div>
                <div className="font-mono text-xs font-normal text-[rgba(255,255,255,0.6)] uppercase tracking-wider mb-2">
                  PROJECTS
                </div>
                <div className="text-2xl font-bold text-[#38FF62]">4+</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(255,255,255,0.2)] hover:border-[#38FF62]"
              >
                <Github size={18} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(255,255,255,0.2)] hover:border-[#38FF62]"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="p-3 text-white hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(255,255,255,0.2)] hover:border-[#38FF62]"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Column - Footer Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <div className="font-mono text-xs font-normal text-[rgba(255,255,255,0.6)] uppercase tracking-wider">
                  {section.title}
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.external ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[rgba(255,255,255,0.8)] hover:text-[#38FF62] transition-colors duration-150"
                        >
                          {link.label}
                        </a>
                      ) : link.id ? (
                        <button
                          onClick={() => scrollToSection(link.id)}
                          className="text-sm text-[rgba(255,255,255,0.8)] hover:text-[#38FF62] transition-colors duration-150 text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <span className="text-sm text-[rgba(255,255,255,0.6)]">
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] uppercase tracking-wider">
                © {currentYear} Mourya Varma. All rights reserved.
              </div>
              <div className="text-xs text-[rgba(255,255,255,0.6)]">
                Built with React & FastAPI
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 font-mono text-xs font-normal text-[rgba(255,255,255,0.8)] hover:text-[#38FF62] transition-colors duration-150 uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Hidden Contact Info for SEO */}
        <div className="sr-only">
          <div>Email: {socialLinks.email}</div>
          <div>Location: India</div>
          <div>Specialization: Software Engineering, Data Engineering, Backend Development</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;