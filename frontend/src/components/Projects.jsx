import React, { useState } from 'react';
import { projects } from '../data/mock';
import { ExternalLink, Github, Code, Database, Monitor, Zap } from 'lucide-react';

const Projects = () => {
  const [selectedType, setSelectedType] = useState('All');
  
  const projectTypes = ['All', 'Backend Development', 'Frontend Development', 'Data Streaming', 'Data Engineering'];
  
  const filteredProjects = selectedType === 'All' 
    ? projects 
    : projects.filter(project => project.type === selectedType);

  const getProjectIcon = (type) => {
    switch (type) {
      case 'Backend Development':
        return Code;
      case 'Frontend Development':
        return Monitor;
      case 'Data Streaming':
        return Zap;
      case 'Data Engineering':
        return Database;
      default:
        return Code;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#38FF62';
      case 'In Progress':
        return '#FFB838';
      case 'Planned':
        return 'rgba(35,35,35,0.5)';
      default:
        return 'rgba(35,35,35,0.3)';
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
            SELECTED WORK
          </div>
          <h2 className="font-bold text-[clamp(44px,8vw,120px)] leading-none text-[#232323] uppercase">
            Featured
            <br />
            <span className="text-[#38FF62]">Projects</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`font-mono text-xs font-normal uppercase tracking-wider px-4 py-2 transition-all duration-150 ${
                  selectedType === type
                    ? 'bg-[#38FF62] text-[#232323]'
                    : 'bg-transparent text-[#232323] border border-[#232323] hover:bg-[rgba(35,35,35,0.05)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const IconComponent = getProjectIcon(project.type);
            return (
              <div
                key={project.id}
                className="bg-white border border-[rgba(35,35,35,0.1)] p-8 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(35,35,35,0.1)] group"
              >
                <div className="space-y-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent size={20} className="text-[#38FF62]" />
                      <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
                        {project.type}
                      </div>
                    </div>
                    <div 
                      className="w-3 h-3 border border-[#232323]"
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    />
                  </div>

                  {/* Project Title */}
                  <h3 className="font-mono text-lg font-normal text-[#232323] uppercase tracking-wider">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-base leading-relaxed text-[#232323]">
                    {project.description}
                  </p>

                  {/* Challenges */}
                  <div className="space-y-2">
                    <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                      KEY CHALLENGE
                    </div>
                    <p className="text-sm leading-relaxed text-[rgba(35,35,35,0.8)]">
                      {project.challenges}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider">
                      TECHNOLOGIES
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider px-3 py-1 border border-[rgba(35,35,35,0.3)] text-[rgba(35,35,35,0.8)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Status & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[rgba(35,35,35,0.1)]">
                    <div className="font-mono text-xs font-normal uppercase tracking-wider"
                         style={{ color: getStatusColor(project.status) }}>
                      {project.status}
                    </div>
                    
                    {project.status === 'Completed' && (
                      <div className="flex space-x-3">
                        <button className="p-2 text-[#232323] hover:text-[#38FF62] transition-colors duration-150">
                          <Github size={16} />
                        </button>
                        <button className="p-2 text-[#232323] hover:text-[#38FF62] transition-colors duration-150">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 pt-12 border-t border-[rgba(35,35,35,0.1)] text-center">
          <div className="space-y-6">
            <h3 className="text-[clamp(24px,4vw,48px)] leading-tight text-[#232323]">
              Interested in collaboration?
            </h3>
            <p className="text-base leading-relaxed text-[#232323] max-w-2xl mx-auto">
              I'm always open to discussing new projects, innovative ideas, or opportunities to contribute to meaningful work.
            </p>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#38FF62] hover:bg-[#2AE052] active:bg-[#1DC943] border-none px-8 py-3 font-mono text-xs font-normal text-[#232323] uppercase tracking-wider cursor-pointer transition-all duration-200 min-h-[44px] flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] mx-auto"
            >
              Let's Connect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;