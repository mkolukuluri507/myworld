import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { filesApi } from '../services/api';
import { notifyDownloadStarted, notifyDownloadError } from '../utils/notifications';

const Hero = () => {
  const handleDownloadResume = async () => {
    try {
      notifyDownloadStarted();
      
      // Get the file from backend
      const response = await filesApi.downloadResume();
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/pdf' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'mourya-varma-resume.pdf';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Resume download failed:', error);
      notifyDownloadError();
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
              SOFTWARE ENGINEER & ASPIRING DATA ENGINEER
            </div>
            <h1 className="font-bold text-[clamp(48px,10vw,120px)] leading-none text-[#232323] uppercase">
              Hi, I'm<br />
              <span className="text-[#38FF62]">Mourya</span><br />
              Varma
            </h1>
          </div>
          
          <p className="text-[clamp(18px,3vw,32px)] leading-tight text-[#232323] max-w-lg">
            Building scalable apps and diving deep into AI, data pipelines, and distributed systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleDownloadResume}
              className="bg-[#38FF62] hover:bg-[#2AE052] active:bg-[#1DC943] border-none px-6 py-3 font-mono text-xs font-normal text-[#232323] uppercase tracking-wider cursor-pointer transition-all duration-200 min-h-[44px] flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={16} className="mr-2" />
              Download Resume
            </button>
            
            <button
              onClick={scrollToAbout}
              className="bg-transparent border border-[#232323] px-6 py-3 font-mono text-xs font-normal text-[#232323] uppercase tracking-wider cursor-pointer transition-all duration-200 min-h-[44px] flex items-center justify-center hover:bg-[rgba(35,35,35,0.05)]"
            >
              Learn More
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Right Content - Photo */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="w-80 h-80 lg:w-96 lg:h-96 overflow-hidden border border-[rgba(35,35,35,0.1)] transition-transform duration-300 group-hover:translate-y-[-4px]">
              <img
                src="https://customer-assets.emergentagent.com/job_767b250e-b13c-4dc8-afa9-46ee1fa9ad2c/artifacts/ttpdamch_WhatsApp%20Image%202025-07-27%20at%2022.18.56%20%281%29.jpeg"
                alt="Mourya Varma - Software Engineer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;