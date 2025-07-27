import React from 'react';
import { certifications } from '../data/mock';
import { Award, CheckCircle, Clock, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming':
        return '💻';
      case 'Cloud':
        return '☁️';
      case 'Data Engineering':
        return '📊';
      default:
        return '🏆';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Programming':
        return '#38FF62';
      case 'Cloud':
        return '#2AE052';
      case 'Data Engineering':
        return '#1DC943';
      default:
        return 'rgba(35,35,35,0.5)';
    }
  };

  const getStatusIcon = (cert) => {
    if (cert.status === 'In Progress') {
      return <Clock size={16} className="text-[#FFB838]" />;
    }
    return cert.verified ? 
      <CheckCircle size={16} className="text-[#38FF62]" /> : 
      <Clock size={16} className="text-[rgba(35,35,35,0.5)]" />;
  };

  return (
    <section id="certifications" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
            CREDENTIALS & LEARNING
          </div>
          <h2 className="font-bold text-[clamp(44px,8vw,120px)] leading-none text-[#232323] uppercase">
            <span className="text-[#38FF62]">Certified</span>
            <br />
            Skills
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#F2F2F2] border border-[rgba(35,35,35,0.1)] p-6 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(35,35,35,0.1)] group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Award size={20} className="text-[#38FF62]" />
                    <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
                      {cert.category}
                    </div>
                  </div>
                  {getStatusIcon(cert)}
                </div>

                {/* Certification Details */}
                <div className="space-y-3">
                  <h3 className="font-mono text-lg font-normal text-[#232323] uppercase tracking-wider">
                    {cert.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-mono text-sm font-normal text-[#232323]">
                        {cert.issuer}
                      </div>
                      <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
                        {cert.year}
                      </div>
                    </div>
                    
                    {cert.verified && (
                      <button className="p-2 text-[#232323] hover:text-[#38FF62] transition-colors duration-150">
                        <ExternalLink size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="pt-3 border-t border-[rgba(35,35,35,0.1)]">
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-mono text-xs font-normal uppercase tracking-wider px-3 py-1 border"
                      style={{ 
                        color: cert.status === 'In Progress' ? '#FFB838' : 
                               cert.verified ? '#38FF62' : 'rgba(35,35,35,0.7)',
                        borderColor: cert.status === 'In Progress' ? '#FFB838' : 
                                    cert.verified ? '#38FF62' : 'rgba(35,35,35,0.3)'
                      }}
                    >
                      {cert.status || (cert.verified ? 'Verified' : 'Pending')}
                    </span>
                    
                    <div 
                      className="w-3 h-3 border border-[#232323]"
                      style={{ 
                        backgroundColor: cert.status === 'In Progress' ? '#FFB838' : 
                                        cert.verified ? '#38FF62' : 'transparent'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Goals */}
        <div className="space-y-12">
          <div className="text-center">
            <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
              LEARNING ROADMAP
            </div>
            <h3 className="text-[clamp(24px,4vw,48px)] leading-tight text-[#232323] mb-6">
              Continuous Growth
            </h3>
            <p className="text-base leading-relaxed text-[#232323] max-w-2xl mx-auto">
              Committed to staying at the forefront of technology through continuous learning and professional development.
            </p>
          </div>

          {/* Upcoming Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Google Cloud Professional Data Engineer', target: '2024', category: 'Cloud' },
              { name: 'Apache Spark Developer', target: '2024', category: 'Data Engineering' },
              { name: 'AWS Solutions Architect Associate', target: '2025', category: 'Cloud' }
            ].map((future, index) => (
              <div key={index} className="text-center space-y-3 p-6 border border-[rgba(35,35,35,0.1)] bg-white">
                <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
                  Target: {future.target}
                </div>
                <h4 className="font-mono text-sm font-normal text-[#232323] uppercase tracking-wider">
                  {future.name}
                </h4>
                <div 
                  className="w-12 h-1 mx-auto"
                  style={{ backgroundColor: getCategoryColor(future.category) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;