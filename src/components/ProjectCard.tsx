import React from 'react';
import { ArrowUpRight, Play, Eye, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  aspect?: 'video' | 'vertical' | 'square' | 'wide' | 'portrait';
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  aspect = 'wide',
  featured = false
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
  
  // Check if user uploaded a custom logo for slot 01 in this session/browser
  const [customImg, setCustomImg] = React.useState<string | null>(null);
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(`uploaded_slot_${project.id}_01`);
      if (saved) setCustomImg(saved);
    } catch {
      // ignore
    }
  }, [project.id]);

  const displayImage = customImg || project.image;

  return (
    <div
      id={`project-card-${project.id}`}
      onClick={() => onSelect(project)}
      className={`group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
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
        />

        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
            {isReel ? <Play className="w-3.5 h-3.5 fill-slate-900" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isReel ? 'Watch Reel' : 'View Project'}</span>
          </div>
        </div>

        {/* Category Pill / Highlight Badge */}
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

        {/* Year or Duration Badge */}
        {project.year && (
          <div className="absolute top-3.5 right-3.5">
            <span className="px-2 py-0.5 rounded-md bg-slate-900/70 backdrop-blur-xs text-white text-[11px] font-medium">
              {project.year}
            </span>
          </div>
        )}
      </div>

      {/* Card Information */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Category Label */}
          {project.subtitle && (
            <div className="text-xs font-semibold text-emerald-800 tracking-tight uppercase mb-1">
              {project.subtitle}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors duration-200">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags and CTA footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
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
        </div>
      </div>
    </div>
  );
};
