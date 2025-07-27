import React from 'react';
import { techStack } from '../data/mock';
import { 
  Code, 
  Database, 
  Cloud, 
  Brain, 
  Monitor,
  Server,
  Zap,
  Globe
} from 'lucide-react';

const TechStack = () => {
  const categories = [
    {
      title: "Backend Development",
      icon: Server,
      technologies: techStack.backend,
      color: "#38FF62"
    },
    {
      title: "Frontend Development", 
      icon: Monitor,
      technologies: techStack.frontend,
      color: "#38FF62"
    },
    {
      title: "Data Engineering",
      icon: Database,
      technologies: techStack.dataTools,
      color: "#38FF62"
    },
    {
      title: "Cloud Platforms",
      icon: Cloud,
      technologies: techStack.cloud,
      color: "#38FF62"
    },
    {
      title: "AI & Machine Learning",
      icon: Brain,
      technologies: techStack.ai,
      color: "#38FF62"
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert':
        return '#38FF62';
      case 'Advanced':
        return '#2AE052';
      case 'Intermediate':
        return '#1DC943';
      case 'Learning':
        return 'rgba(35,35,35,0.5)';
      case 'Basic':
        return 'rgba(35,35,35,0.3)';
      default:
        return 'rgba(35,35,35,0.3)';
    }
  };

  return (
    <section id="tech" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
            TECHNICAL EXPERTISE
          </div>
          <h2 className="font-bold text-[clamp(44px,8vw,120px)] leading-none text-[#232323] uppercase">
            Tech
            <br />
            <span className="text-[#38FF62]">Stack</span>
          </h2>
        </div>

        {/* Tech Categories Grid */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className="space-y-8">
                {/* Category Header */}
                <div className="flex items-center space-x-4">
                  <IconComponent size={24} className="text-[#38FF62]" />
                  <h3 className="font-mono text-sm font-normal text-[#232323] uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] p-6 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(35,35,35,0.1)] group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-sm font-normal text-[#232323] uppercase tracking-wider">
                            {tech.name}
                          </h4>
                          <div 
                            className="w-3 h-3 border border-[#232323] transition-all duration-200 group-hover:bg-[#38FF62]"
                            style={{
                              backgroundColor: tech.level === 'Expert' || tech.level === 'Advanced' ? getLevelColor(tech.level) : 'transparent'
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
                            {tech.level}
                          </div>
                          
                          {/* Skill Level Bar */}
                          <div className="w-full h-1 bg-[rgba(35,35,35,0.1)]">
                            <div 
                              className="h-full transition-all duration-300"
                              style={{
                                backgroundColor: getLevelColor(tech.level),
                                width: tech.level === 'Expert' ? '100%' : 
                                       tech.level === 'Advanced' ? '85%' :
                                       tech.level === 'Intermediate' ? '70%' :
                                       tech.level === 'Learning' ? '40%' : '25%'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Journey */}
        <div className="mt-20 pt-12 border-t border-[rgba(35,35,35,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
                CONTINUOUS LEARNING
              </div>
              <h3 className="text-[clamp(24px,4vw,48px)] leading-tight text-[#232323] mb-6">
                Always evolving, always growing
              </h3>
              <p className="text-base leading-relaxed text-[#232323]">
                Technology evolves rapidly, and so do I. Currently focused on mastering data engineering concepts 
                and exploring the frontiers of AI-powered development tools.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
                CURRENTLY LEARNING
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Apache Spark', 'Hadoop', 'Airflow', 'Generative AI'].map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Zap size={14} className="text-[#38FF62]" />
                    <span className="text-sm text-[#232323]">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;