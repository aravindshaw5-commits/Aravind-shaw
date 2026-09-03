import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { educations } from '../lib/data';

export const Education: React.FC = () => {
  const educationTags: Record<string, string[]> = {
    'edu-01': ['Computer Applications', 'Software Fundamentals', 'Digital Media'],
    'edu-02': ['Visual Effects (VFX)', 'Compositing', 'Motion Graphics', 'Digital Animation'],
    'edu-03': ['Electrical Engineering', 'Electronics', '75% Aggregate Score'],
    'edu-04': ['Secondary Education (SSLC)', 'General Academics', '65% Aggregate Score']
  };

  return (
    <section id="education" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">11</span>
            <span>Academic & Technical Qualifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            EDUCATION & CREDENTIALS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
            Foundational computer application degree, specialized visual effects training, and technical engineering background.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            <span>4 Academic Credentials</span>
          </span>
        </div>
      </div>

      {/* Compact 2x2 Grid of Education Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-5.5 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header: Title, College & Date Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-emerald-800 flex items-center gap-1.5 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{edu.institution}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{edu.period}</span>
                  </span>
                  {edu.honors && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                      <Award className="w-3 h-3 text-emerald-600" />
                      <span>{edu.honors}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Location Bar */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{edu.location}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                {edu.description}
              </p>
            </div>

            {/* Focus / Domain tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mt-2">
              {(educationTags[edu.id] || ['Digital Media', 'Creative Arts']).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
