import React from 'react';
import { toolsData } from '../lib/data';
import { Sparkles, Layers, Box, PenTool, Image, Film, Zap } from 'lucide-react';

export const Tools: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Box': return <Box className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'Image': return <Image className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="tools" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">12</span>
            <span>Software Suites & Proficiency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            TOOLS & SOFTWARE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            Proficiency and technical mastery across industry-standard animation, editing, compositing, and visual design software.
          </p>
        </div>
      </div>

      {/* Clean Software Tiles with Percentage Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {toolsData.map((tool, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-sm hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800">
                  {getIcon(tool.iconName)}
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {tool.percentage}%
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {tool.name}
              </h3>

              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {tool.category}
              </p>
            </div>

            {/* Proficiency Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
                <span>Proficiency</span>
                <span className="font-semibold text-slate-900">{tool.percentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${tool.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
