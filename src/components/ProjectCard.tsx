import React from 'react';
import { ArrowUpRight, Play, Eye, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  aspect?: 'video' | 'vertical' | 'square' | 'wide' | 'portrait';
  featured?: boolean;
  projectNumber?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  aspect = 'wide',
  featured = false,
  projectNumber
}) => {
  const isPortrait = project.aspectRatio === 'portrait' || aspect === 'portrait';

  const getAspectClass = () => {
    if (isPortrait) {
      return 'aspect-[4/5]';
    }
    if (project.aspectRatio === 'vertical' || aspect === 'vertical') {
      return 'aspect-[9/16]';
    }
    if (project.aspectRatio === 'square' || aspect === 'square') {
      return 'aspect-square';
    }
    if (project.aspectRatio === 'video' || aspect === 'video') {
      return 'aspect-video';
    }
    return 'aspect-[16/10]';
  };

  const isReel = project.category === 'Social Media Reels' || aspect === 'vertical';
  const displayImage = project.image;

  return (
    <div
      id={`project-card-${project.id}`}
      onClick={() => onSelect(project)}
      className={`group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Media Box */}
      <div className={`relative w-full overflow-hidden bg-slate-900 ${getAspectClass()}`}>
        <img
          src={displayImage}
          alt={project.title}
          className={`w-full h-full ${
            isPortrait ? 'object-contain object-center' : 'object-cover object-center'
          } group-hover:scale-[1.02] transition-transform duration-500 ease-out`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.svg';
          }}
        />

        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
            {isReel ? <Play className="w-3.5 h-3.5 fill-slate-900" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isReel ? 'Watch Reel' : 'View Project'}</span>
          </div>
        </div>

        {/* Category Pill / Highlight Badge for non-portrait or special */}
        {!isPortrait && (
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            {project.highlight ? (
              <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-bold shadow-xs border border-slate-200/80 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{project.highlight}</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-slate-700 text-[11px] font-semibold shadow-xs border border-slate-200/80">
                {project.category}
              </span>
            )}
          </div>
        )}

        {/* Year or Duration Badge */}
        {project.year && !isPortrait && (
          <div className="absolute top-3.5 right-3.5">
            <span className="px-2 py-0.5 rounded-md bg-slate-900/70 backdrop-blur-xs text-white text-[11px] font-medium">
              {project.year}
            </span>
          </div>
        )}
      </div>

      {/* Card Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Project Number Header */}
          {projectNumber && (
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                {projectNumber}
              </span>
            </div>
          )}

          {/* Subtitle / Category Label */}
          {project.subtitle && !projectNumber && (
            <div className="text-xs font-semibold text-emerald-800 tracking-tight uppercase mb-1">
              {project.subtitle}
            </div>
          )}

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors duration-200 line-clamp-1">
            {project.title}
          </h3>

          {/* Category */}
          <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
            {project.category}
          </p>

          {/* Short Description for wider cards */}
          {!isPortrait && (
            <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Tags and CTA footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {isPortrait ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-slate-600 font-medium">Case Study</span>
              <button
                type="button"
                className="shrink-0 text-xs font-bold text-emerald-800 group-hover:text-emerald-900 flex items-center gap-1 transition-colors"
              >
                <span>DETAILS</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
                {project.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-[11px] text-slate-600 px-1 py-0.5">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="shrink-0 text-xs font-semibold text-slate-700 group-hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
