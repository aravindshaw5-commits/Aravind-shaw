import React, { useState } from 'react';
import { toolsData } from '../lib/data';
import { Sparkles, Layers, Box, PenTool, Image, Film, Layout, Sliders, Zap, Code, Cpu, BookOpen } from 'lucide-react';

export const Tools: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Motion & Animation', '3D & CGI', 'Design & Vector', 'Editing & Audio', 'AI & Gen Tools'];

  const filteredTools = selectedCategory === 'All'
    ? toolsData
    : toolsData.filter(t => t.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Box': return <Box className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'Image': return <Image className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Sliders': return <Sliders className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="tools" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">13</span>
            <span>Software Suites & Tooling</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            TOOLS & SOFTWARE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            Industry-standard tool stack utilized across 2D/3D motion graphics, brand identity, and generative creative pipelines.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Clean Software Tiles (No Skill Percentage Bars) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredTools.map((tool, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-sm hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800">
                  {getIcon(tool.iconName)}
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {tool.level}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {tool.name}
              </h3>

              <p className="text-xs text-slate-500 mt-1 font-medium">
                {tool.category}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Experience</span>
              <span className="font-semibold text-slate-900">{tool.experienceYears}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
