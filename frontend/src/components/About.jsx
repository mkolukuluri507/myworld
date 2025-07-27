import React from 'react';
import { aboutData } from '../data/mock';
import { Code, Database, Brain, Cloud } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Backend Development",
      description: "Expert in Java, Spring Boot, and REST API development"
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Learning Spark, Hadoop, and data pipeline architecture"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Exploring Generative and Agentic AI applications"
    },
    {
      icon: Cloud,
      title: "Cloud Platforms",
      description: "Growing expertise in GCP, Azure, and AWS"
    }
  ];

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="mb-12">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
            ABOUT ME
          </div>
          <h2 className="font-bold text-[clamp(44px,8vw,120px)] leading-none text-[#232323] uppercase">
            Building The
            <br />
            <span className="text-[#38FF62]">Future</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-[clamp(16px,2.5vw,20px)] leading-relaxed text-[#232323]">
                {aboutData.introduction}
              </p>
              
              <p className="text-[clamp(16px,2.5vw,20px)] leading-relaxed text-[#232323]">
                {aboutData.experience}
              </p>
              
              <p className="text-[clamp(16px,2.5vw,20px)] leading-relaxed text-[#232323]">
                {aboutData.currentLearning}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[rgba(35,35,35,0.1)]">
              <div>
                <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-2">
                  EXPERIENCE
                </div>
                <div className="text-2xl font-bold text-[#38FF62]">3+ Years</div>
              </div>
              <div>
                <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-2">
                  FOCUS AREAS
                </div>
                <div className="text-2xl font-bold text-[#38FF62]">5</div>
              </div>
            </div>
          </div>

          {/* Right Content - Highlights */}
          <div className="space-y-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-[rgba(35,35,35,0.1)] p-6 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(35,35,35,0.1)]"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <IconComponent size={24} className="text-[#38FF62]" />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-normal text-[#232323] uppercase tracking-wider mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#232323]">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interests Tags */}
        <div className="mt-16 pt-12 border-t border-[rgba(35,35,35,0.1)]">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-6">
            CURRENT INTERESTS
          </div>
          <div className="flex flex-wrap gap-3">
            {aboutData.interests.map((interest, index) => (
              <span
                key={index}
                className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider px-4 py-2 border border-[#232323] transition-all duration-150 hover:bg-[rgba(35,35,35,0.05)]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;