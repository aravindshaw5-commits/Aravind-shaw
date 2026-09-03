import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles, Globe2 } from 'lucide-react';
import { experiences } from '../lib/data';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">10</span>
            <span>Career History & Commercial Roles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            PROFESSIONAL EXPERIENCE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            Commercial 2D motion design, vector character animation, and high-retention video production across creative studios and ed-tech platforms.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
            <span>3 Industry Roles</span>
          </span>
        </div>
      </div>

      {/* Experience Cards Stack */}
      <div className="space-y-4 sm:space-y-5">
        {experiences.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all duration-200"
          >
            {/* Header: Role, Company & Date Badge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {item.role}
                </h3>
                <div className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{item.company}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{item.period}</span>
                </span>
                {item.type === 'freelance' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    <Globe2 className="w-3 h-3" />
                    <span>Consulting</span>
                  </span>
                )}
              </div>
            </div>

            {/* Location & Status Bar */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{item.location}</span>
              </span>
              {item.period.includes('Present') && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Current Role</span>
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
              {item.description}
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-1.5 mb-3">
              {item.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Impact Metric Badge */}
            {item.impactMetric && (
              <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item.impactMetric}</span>
              </div>
            )}

            {/* Skills tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
              {item.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
