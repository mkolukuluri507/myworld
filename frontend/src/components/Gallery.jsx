import React from 'react';
import { galleryImages } from '../data/mock';
import { Camera } from 'lucide-react';

const Gallery = () => {
  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="font-mono text-xs font-normal text-[#232323] uppercase tracking-wider mb-4">
            OUTSIDE OF CODE
          </div>
          <h2 className="font-bold text-[clamp(44px,8vw,120px)] leading-none text-[#232323] uppercase">
            Life
            <br />
            <span className="text-[#38FF62]">Moments</span>
          </h2>
        </div>

        {/* Gallery Description */}
        <div className="mb-12">
          <p className="text-[clamp(16px,2.5vw,20px)] leading-relaxed text-[#232323] max-w-2xl">
            Beyond coding and data pipelines, I believe in maintaining balance. Here are glimpses of life outside the terminal.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden border border-[rgba(35,35,35,0.1)] aspect-square"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-[rgba(35,35,35,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center space-y-3 p-6">
                  <Camera size={24} className="text-[#38FF62] mx-auto" />
                  <p className="font-mono text-sm font-normal text-white uppercase tracking-wider">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personal Quote */}
        <div className="mt-16 pt-12 border-t border-[rgba(35,35,35,0.1)] text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <blockquote className="text-[clamp(20px,3vw,36px)] leading-tight text-[#232323] italic">
              "The best code is written by developers who understand that life happens outside the IDE too."
            </blockquote>
            <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider">
              — Personal Philosophy
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-[rgba(35,35,35,0.1)] bg-white transition-all duration-200 hover:translate-y-[-2px]">
            <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider mb-2">
              PHILOSOPHY
            </div>
            <div className="text-lg text-[#232323]">Work-Life Balance</div>
          </div>
          
          <div className="text-center p-6 border border-[rgba(35,35,35,0.1)] bg-white transition-all duration-200 hover:translate-y-[-2px]">
            <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider mb-2">
              INTERESTS
            </div>
            <div className="text-lg text-[#232323]">Photography & Nature</div>
          </div>
          
          <div className="text-center p-6 border border-[rgba(35,35,35,0.1)] bg-white transition-all duration-200 hover:translate-y-[-2px]">
            <div className="font-mono text-xs font-normal text-[rgba(35,35,35,0.7)] uppercase tracking-wider mb-2">
              APPROACH
            </div>
            <div className="text-lg text-[#232323]">Mindful Development</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;