export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  categoryNumber?: string;
  description: string;
  image: string;
  aspectRatio?: 'square' | 'video' | 'vertical' | 'wide' | 'editorial' | 'portrait';
  videoUrl?: string;
  duration?: string;
  tags: string[];
  client?: string;
  year?: string;
  role?: string;
  deliverables?: string[];
  tools?: string[];
  stats?: { label: string; value: string }[];
  highlight?: string;
  roles?: string[];
  details?: {
    overview: string;
    challenge?: string;
    solution?: string;
    gallery?: string[];
    gallerySlots?: Array<{
      slotNumber: string;
      title: string;
      image?: string;
      isVideo?: boolean;
    }>;
    videoEmbed?: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'fulltime' | 'contract' | 'freelance';
  description: string;
  highlights: string[];
  skills: string[];
  impactMetric?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  honors?: string;
  description: string;
}

export interface ToolItem {
  name: string;
  category?: 'Motion & Animation' | 'Design & Vector' | '3D & CGI' | 'Editing & Audio' | 'AI & Gen Tools' | 'VFX & Compositing';
  level?: string;
  percentage: number;
  experienceYears?: string;
  iconName: string;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  campaign: string;
  videoUrl: string;
  thumbnailUrl: string;
  badge: string;
  stats?: { label: string; value: string }[];
}

