import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, Award, Sparkles, Globe2 } from 'lucide-react';
import { experiences, educations } from '../lib/data';

export const Experience: React.FC = () => {
  return (
    <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ========================================================================= */}
      {/* 10 — EXPERIENCE */}
      {/* ========================================================================= */}
      <section id="experience" className="scroll-mt-24">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">10</span>
              <span>Career History & Roles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              EXPERIENCE
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              8+ years directing motion, designing brand systems, and leading visual campaigns for startups and global institutions.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
            Full-time & Freelance Consulting
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-10">
          {experiences.map((item, idx) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-emerald-600 group-hover:scale-125 group-hover:bg-emerald-600 transition-all duration-200" />

              {/* Experience Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs hover:shadow-sm transition-shadow">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{item.period}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.location}</span>
                    </span>
                    {item.type === 'freelance' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                        <Globe2 className="w-3 h-3" />
                        <span>Global Consulting</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Key Accomplishments */}
                <div className="space-y-2 mb-5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Key Deliverables & Impact
                  </h4>
                  <div className="space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

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
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11 — EDUCATION */}
      {/* ========================================================================= */}
      <section id="education" className="scroll-mt-24">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">11</span>
              <span>Academic Foundations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              EDUCATION
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Academic training in design theory, typography, Swiss grid systems, and digital media.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {edu.degree}
                </h3>
                
                <div className="text-sm font-medium text-emerald-800 mt-1">
                  {edu.institution} • {edu.location}
                </div>

                {edu.honors && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{edu.honors}</span>
                  </div>
                )}

                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
