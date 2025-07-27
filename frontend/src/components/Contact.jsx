import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Clock } from 'lucide-react';
import { contactApi } from '../services/api';
import { useApiMutation } from '../hooks/useApi';
import { notifyContactSuccess, notifyContactError } from '../utils/notifications';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { mutate: submitContact, loading, error, success } = useApiMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submitContact(contactApi.submitContact, formData);
      
      // Show success notification
      notifyContactSuccess();
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (err) {
      console.error('Contact form submission failed:', err);
      notifyContactError();
    }
  };

  const socialLinks = {
    github: "https://github.com/mouryavarma",
    linkedin: "https://linkedin.com/in/mourya-varma",
    email: "varmamourya3@gmail.com"
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: socialLinks.email,
      link: `mailto:${socialLinks.email}`
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/mouryavarma',
      link: socialLinks.github
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/mourya-varma',
      link: socialLinks.linkedin
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      link: null
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
            LET'S CONNECT
          </div>
          <h2 className="font-bold text-[clamp(44px,8vw,120px)] leading-none text-[#232323] uppercase">
            Get In
            <br />
            <span className="text-[#38FF62]">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-[clamp(24px,4vw,48px)] leading-tight text-[#232323]">
                Ready to collaborate on your next project?
              </h3>
              <p className="text-base leading-relaxed text-[#232323]">
                I'm always interested in discussing new opportunities, whether it's building scalable 
                backend systems, exploring data engineering challenges, or experimenting with AI-powered solutions.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="flex-shrink-0">
                      <IconComponent size={20} className="text-[#38FF62]" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider mb-1">
                        {contact.label}
                      </div>
                      {contact.link ? (
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-[#232323] hover:text-[#38FF62] transition-colors duration-150"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <div className="text-base text-[#232323]">
                          {contact.value}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response Time */}
            <div className="p-6 border border-[rgba(35,35,35,0.1)] bg-[#F2F2F2]">
              <div className="flex items-center space-x-3 mb-3">
                <Clock size={18} className="text-[#38FF62]" />
                <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                  RESPONSE TIME
                </div>
              </div>
              <p className="text-sm text-[#232323]">
                I typically respond to emails within 24-48 hours. For urgent matters, feel free to reach out on LinkedIn.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-6">
            <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
              SEND MESSAGE
            </div>
            
            {/* Show error message if API call failed */}
            {error && (
              <ErrorMessage 
                error={error} 
                className="mb-4"
              />
            )}

            {/* Show success message */}
            {success && (
              <div className="bg-[#38FF62] p-4 mb-4">
                <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-2">
                  SUCCESS
                </div>
                <p className="text-[#232323]">
                  Thank you for your message! I'll get back to you soon.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                    NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150 disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150 disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150 disabled:opacity-50"
                  placeholder="Project collaboration, job opportunity, etc."
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={6}
                  className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150 resize-vertical disabled:opacity-50"
                  placeholder="Tell me about your project, ideas, or how we can work together..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#38FF62] hover:bg-[#2AE052] active:bg-[#1DC943] border-none px-6 py-4 font-mono text-xs font-normal text-[#232323] uppercase tracking-wider cursor-pointer transition-all duration-200 min-h-[52px] flex items-center justify-center hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <LoadingSpinner size="sm" text="" className="text-[#232323]" />
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Form Note */}
            <div className="p-4 border border-[rgba(35,35,35,0.1)] bg-[#F2F2F2]">
              <p className="font-mono text-xs text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
                * All fields are required. Your information will be kept confidential.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 pt-12 border-t border-[rgba(35,35,35,0.1)] text-center">
          <div className="space-y-6">
            <h3 className="text-[clamp(24px,4vw,48px)] leading-tight text-[#232323]">
              Let's build something amazing together
            </h3>
            <p className="text-base leading-relaxed text-[#232323] max-w-2xl mx-auto">
              Whether you have a project in mind, want to discuss opportunities, or just want to connect 
              with a fellow developer, I'd love to hear from you.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#232323] hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(35,35,35,0.1)] hover:border-[#38FF62]"
              >
                <Github size={20} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#232323] hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(35,35,35,0.1)] hover:border-[#38FF62]"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="p-3 text-[#232323] hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(35,35,35,0.1)] hover:border-[#38FF62]"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
            LET'S CONNECT
          </div>
          <h2 className="font-bold text-[clamp(44px,8vw,120px)] leading-none text-[#232323] uppercase">
            Get In
            <br />
            <span className="text-[#38FF62]">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-[clamp(24px,4vw,48px)] leading-tight text-[#232323]">
                Ready to collaborate on your next project?
              </h3>
              <p className="text-base leading-relaxed text-[#232323]">
                I'm always interested in discussing new opportunities, whether it's building scalable 
                backend systems, exploring data engineering challenges, or experimenting with AI-powered solutions.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="flex-shrink-0">
                      <IconComponent size={20} className="text-[#38FF62]" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider mb-1">
                        {contact.label}
                      </div>
                      {contact.link ? (
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-[#232323] hover:text-[#38FF62] transition-colors duration-150"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <div className="text-base text-[#232323]">
                          {contact.value}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response Time */}
            <div className="p-6 border border-[rgba(35,35,35,0.1)] bg-[#F2F2F2]">
              <div className="flex items-center space-x-3 mb-3">
                <Clock size={18} className="text-[#38FF62]" />
                <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                  RESPONSE TIME
                </div>
              </div>
              <p className="text-sm text-[#232323]">
                I typically respond to emails within 24-48 hours. For urgent matters, feel free to reach out on LinkedIn.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-6">
            <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
              SEND MESSAGE
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                    NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150"
                  placeholder="Project collaboration, job opportunity, etc."
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] text-[#232323] placeholder-[rgba(35,35,35,0.5)] focus:outline-none focus:border-[#38FF62] transition-colors duration-150 resize-vertical"
                  placeholder="Tell me about your project, ideas, or how we can work together..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#38FF62] hover:bg-[#2AE052] active:bg-[#1DC943] border-none px-6 py-4 font-mono text-xs font-normal text-[#232323] uppercase tracking-wider cursor-pointer transition-all duration-200 min-h-[52px] flex items-center justify-center hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send size={16} className="mr-2" />
                Send Message
              </button>
            </form>

            {/* Form Note */}
            <div className="p-4 border border-[rgba(35,35,35,0.1)] bg-[#F2F2F2]">
              <p className="font-mono text-xs text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
                * All fields are required. Your information will be kept confidential.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 pt-12 border-t border-[rgba(35,35,35,0.1)] text-center">
          <div className="space-y-6">
            <h3 className="text-[clamp(24px,4vw,48px)] leading-tight text-[#232323]">
              Let's build something amazing together
            </h3>
            <p className="text-base leading-relaxed text-[#232323] max-w-2xl mx-auto">
              Whether you have a project in mind, want to discuss opportunities, or just want to connect 
              with a fellow developer, I'd love to hear from you.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#232323] hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(35,35,35,0.1)] hover:border-[#38FF62]"
              >
                <Github size={20} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-[#232323] hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(35,35,35,0.1)] hover:border-[#38FF62]"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="p-3 text-[#232323] hover:text-[#38FF62] transition-colors duration-150 border border-[rgba(35,35,35,0.1)] hover:border-[#38FF62]"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;