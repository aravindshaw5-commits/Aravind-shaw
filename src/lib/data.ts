import { Project, ExperienceItem, EducationItem, ToolItem, AwardItem } from '../types';
import {
  samamAiLogo,
  samamPost01,
  samamPost02,
  samamPost03,
  samamPost04,
  samamPost05,
  iitMadrasLcLabLogo,
  iitPost01,
  iitPost02,
  iitPost03,
  iitPost04,
  iitPost05,
  beyondSpellingMistakeLogo,
  btsmPost01,
  btsmPost02,
  btsmPost03,
  btsmPost04,
  btsmPost05,
  femiluxLogo,
  femiluxPost01,
  femiluxPost02,
  femiluxPost03,
  femiluxPost04,
  femiluxPost05
} from './logos';

// ==========================================
// 01 — BRANDING & LOGO DESIGN
// ==========================================
export const brandingProjects: Project[] = [
  {
    id: 'branding-samam-ai',
    title: 'SAMAM.ai',
    category: 'AI Education · Logo Design · Brand Identity',
    categoryNumber: '01',
    description: 'Visual identity created for an AI-powered education platform.',
    image: samamAiLogo,
    aspectRatio: 'portrait',
    tags: ['AI Education', 'Logo Design', 'Brand Identity', 'Visual Design'],
    roles: ['Logo Design', 'Brand Identity', 'Visual Design'],
    role: 'Logo Design & Brand Identity',
    details: {
      overview: 'A visual identity created for a modern education startup — an AI-powered learning platform designed for accessibility, especially for dyslexic learners.',
      gallerySlots: [
        { slotNumber: '01', title: 'BRAND IDENTITY DESIGN', image: samamPost01 },
        { slotNumber: '02', title: 'PRIMARY LOGO', image: samamPost02 },
        { slotNumber: '03', title: 'LOGO VARIATIONS', image: samamPost03 },
        { slotNumber: '04', title: 'SYMBOL / ICON', image: samamPost04 },
        { slotNumber: '05', title: 'BRAND IN ACTION', image: samamPost05 }
      ]
    }
  },
  {
    id: 'branding-iit-madras-lc-lab',
    title: 'IIT MADRAS — LC LAB',
    category: 'Logo Design · Institutional Identity',
    categoryNumber: '01',
    description: 'Logo design created for an LC Lab at IIT Madras.',
    image: iitMadrasLcLabLogo,
    aspectRatio: 'portrait',
    tags: ['Logo Design', 'Institutional Identity', 'Visual Identity'],
    roles: ['Logo Design', 'Visual Identity'],
    role: 'Logo Design & Visual Identity',
    details: {
      overview: 'Logo design created for an LC Lab at IIT Madras.',
      gallerySlots: [
        { slotNumber: '01', title: 'PRIMARY LOGO', image: iitPost01 },
        { slotNumber: '02', title: 'LOGO PRESENTATION', image: iitPost02 },
        { slotNumber: '03', title: 'LOGO VARIATION', image: iitPost03 },
        { slotNumber: '04', title: 'BRAND APPLICATION', image: iitPost04 },
        { slotNumber: '05', title: 'FINAL BRAND SHOWCASE', image: iitPost05 }
      ]
    }
  },
  {
    id: 'branding-beyond-the-spelling-mistake',
    title: 'BEYOND THE SPELLING MISTAKE',
    category: 'Logo Design · Creator Branding',
    categoryNumber: '01',
    description: 'Logo design created for the Beyond the Spelling Mistake channel associated with influencer Arun Fernandes.',
    image: beyondSpellingMistakeLogo,
    aspectRatio: 'portrait',
    tags: ['Logo Design', 'Creator Branding', 'Visual Design'],
    roles: ['Logo Design', 'Creator Branding', 'Visual Design'],
    role: 'Logo Design & Creator Branding',
    details: {
      overview: 'Logo identity created for the Beyond the Spelling Mistake channel associated with influencer Arun Fernandes.',
      gallerySlots: [
        { slotNumber: '01', title: 'PRIMARY LOGO', image: btsmPost01 },
        { slotNumber: '02', title: 'LOGO PRESENTATION', image: btsmPost02 },
        { slotNumber: '03', title: 'LOGO VARIATION', image: btsmPost03 },
        { slotNumber: '04', title: 'BRAND APPLICATION', image: btsmPost04 },
        { slotNumber: '05', title: 'FINAL BRAND SHOWCASE', image: btsmPost05 }
      ]
    }
  },
  {
    id: 'branding-femilux',
    title: 'FEMILUX',
    category: 'Logo Design · Beauty Brand Identity',
    categoryNumber: '01',
    description: 'Brand identity and visual design work created for the Femilux beauty parlour.',
    image: femiluxLogo,
    aspectRatio: 'portrait',
    tags: ['Logo Design', 'Beauty Brand Identity', 'Brand Identity', 'Graphic Design'],
    roles: ['Logo Design', 'Brand Identity', 'Graphic Design'],
    role: 'Logo Design, Brand Identity & Graphic Design',
    deliverables: ['Logo', 'Poster Design', 'Visiting Card', 'Promotional Video'],
    details: {
      overview: 'Brand identity and visual design work created for the Femilux beauty parlour.',
      gallerySlots: [
        { slotNumber: '01', title: 'LOGO', image: femiluxPost01 },
        { slotNumber: '02', title: 'POSTER DESIGN', image: femiluxPost02 },
        { slotNumber: '03', title: 'VISITING CARD', image: femiluxPost03 },
        { slotNumber: '04', title: 'PROMOTIONAL VIDEO', image: femiluxPost04, isVideo: true },
        { slotNumber: '05', title: 'FINAL BRAND SHOWCASE', image: femiluxPost05 }
      ]
    }
  }
];

// ==========================================
// 02 — SOCIAL MEDIA REELS (EXACTLY 4 selected vertical 9:16 Instagram Reels)
// ==========================================
export const socialReelProjects: Project[] = [
  {
    id: 'reel-01',
    title: 'Kinetic Hook & Typography Breakdown',
    subtitle: 'REEL 01',
    category: 'Social Media Reels',
    categoryNumber: '02',
    description: 'Fast-paced kinetic typography reel with rhythmic sound design and frame-perfect cutaways designed to maximize 3-second retention on Instagram.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&h=1920&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    aspectRatio: 'vertical',
    tags: ['Kinetic Type', '9:16 Format', 'Sound Design', 'High Retention'],
    client: 'Creator Studio',
    year: '2024',
    highlight: '3.4M Views • 140K Shares',
    stats: [
      { label: 'Views', value: '3.4M' },
      { label: 'Retention', value: '88%' }
    ],
    tools: ['After Effects', 'Premiere Pro', 'Ableton Live']
  },
  {
    id: 'reel-02',
    title: '3D Cyber Watch Drop Teaser',
    subtitle: 'REEL 02',
    category: 'Social Media Reels',
    categoryNumber: '02',
    description: 'High-contrast 3D watch reveal reel with metallic lighting passes, macro textures, and impactful glitch transitions.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1080&h=1920&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    aspectRatio: 'vertical',
    tags: ['3D Product Reel', 'Macro Render', 'Octane Lighting'],
    client: 'Aethel Watches',
    year: '2024',
    highlight: '1.8M Views • 45K Saves',
    stats: [
      { label: 'Views', value: '1.8M' },
      { label: 'Saves', value: '45K' }
    ],
    tools: ['Blender', 'After Effects', 'Octane']
  },
  {
    id: 'reel-03',
    title: 'Logo Morphing Sequence',
    subtitle: 'REEL 03',
    category: 'Social Media Reels',
    categoryNumber: '02',
    description: 'Seamless vector logo transformation reel illustrating fluid morphing physics and elastic easing curves.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1080&h=1920&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    aspectRatio: 'vertical',
    tags: ['Vector Morph', 'Motion Theory', 'Elastic Easing'],
    client: 'Design Craft Weekly',
    year: '2024',
    highlight: '2.2M Views • 92K Likes',
    stats: [
      { label: 'Views', value: '2.2M' },
      { label: 'Shares', value: '52K' }
    ],
    tools: ['After Effects', 'Illustrator', 'Flow']
  },
  {
    id: 'reel-04',
    title: 'Animated Character Walk-Cycle Loop',
    subtitle: 'REEL 04',
    category: 'Social Media Reels',
    categoryNumber: '02',
    description: 'Infinite looping 2D frame-by-frame character walk cycle with secondary cloth dynamics and parallax city backdrop.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1080&h=1920&q=85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    aspectRatio: 'vertical',
    tags: ['Character Rig', 'Looping Animation', 'Parallax City'],
    client: 'Original Art Series',
    year: '2024',
    highlight: '940K Views • 34K Likes',
    stats: [
      { label: 'Views', value: '940K' },
      { label: 'Loop Rate', value: '3.2x' }
    ],
    tools: ['Animate CC', 'After Effects', 'Photoshop']
  }
];

// ==========================================
// 03 — PRODUCT VIDEOS (16:9 High-End Product Showcases)
// ==========================================
export const productVideos: Project[] = [
  {
    id: 'product-lumina',
    title: 'LUMINA SPATIAL HEADSET',
    subtitle: 'Hardware Launch Film & 3D Commercial',
    category: 'Product Videos',
    categoryNumber: '03',
    description: 'A sleek, hyper-detailed 3D product commercial showcasing the precision milled acoustic chambers, spatial audio drivers, and memory foam ergonomics of the Lumina audio headset.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'video',
    tags: ['3D Commercial', '16:9 Showcase', 'CGI Lighting', 'Audio Branding'],
    client: 'Lumina Audio Inc.',
    year: '2024',
    role: 'Director & 3D Lead',
    deliverables: ['90s Master Launch Film', '30s Social Cutdowns (1:1 & 9:16)', '4K Render Stills for Billboard Campaign'],
    tools: ['Blender 4.0', 'Octane Render', 'After Effects', 'DaVinci Resolve'],
    highlight: '12M+ Global Views on Product Launch',
    stats: [
      { label: 'Pre-Orders Generated', value: '$2.4M' },
      { label: 'Render Fidelity', value: '4K UltraHD' }
    ],
    details: {
      overview: 'Lumina required an aspirational launch film to position their new spatial audio headset against incumbent luxury audio brands. We handled concept, CAD model optimization, camera direction, lighting, and final color grade.',
      challenge: 'Highlighting internal optical sensors and acoustic chambers without looking like dry engineering diagrams.',
      solution: 'Used volumetric caustic lighting with magnetic particle explosions and smooth exploded-view disassembly sequences.',
      gallery: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80'
      ]
    }
  },
  {
    id: 'product-veloce',
    title: 'VELOCE ELECTRIC HYPERBIKE',
    subtitle: 'Aerodynamic Launch Teaser',
    category: 'Product Videos',
    categoryNumber: '03',
    description: 'Dynamic wind-tunnel airflow simulation, carbon fiber weave close-ups, and adrenaline-fueled kinetic montage for an elite electric performance motorcycle.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'video',
    tags: ['Automotive CGI', 'Wind Tunnel Sim', 'Kinetic Editing', 'Sound Design'],
    client: 'Veloce Motorworks',
    year: '2023',
    role: 'Motion Director',
    deliverables: ['60s Teaser Film', 'Interactive Web GL Assets', 'Exhibition LED Wall Video'],
    tools: ['Cinema 4D', 'Redshift', 'After Effects', 'Ableton'],
    highlight: 'Winner of Automotive Motion Excellence',
    stats: [
      { label: 'Views', value: '4.8M' },
      { label: 'Event Reach', value: '150K Live' }
    ]
  },
  {
    id: 'product-artisan',
    title: 'AURA CERAMIC POUR-OVER',
    subtitle: 'Minimalist Craft Product Film',
    category: 'Product Videos',
    categoryNumber: '03',
    description: 'A slow-living, tactile cinematic film capturing ceramic glazes, steam dynamics, and the meditative morning ritual of specialty pour-over coffee extraction.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'video',
    tags: ['Cinematography', 'Macro Detail', 'Fluid Physics', 'Slow Motion'],
    client: 'Aura Studio Kyoto',
    year: '2024',
    role: 'Creative Director & Editor',
    deliverables: ['45s Mood Film', 'Social Micro-Stories', 'Packaging QR Code Video'],
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    highlight: 'Featured on Design Milk'
  },
  {
    id: 'product-aegis',
    title: 'AEGIS ENTERPRISE CYBERSECURITY',
    subtitle: 'SaaS Platform Feature Walkthrough',
    category: 'Product Videos',
    categoryNumber: '03',
    description: 'An elegant, abstract visualization of zero-trust enterprise network defenses, data packet routing, and real-time autonomous threat neutralization.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'video',
    tags: ['3D Infographics', 'SaaS Explainer', 'Cyber Security', 'Spatial UI'],
    client: 'Aegis Security Cloud',
    year: '2023',
    role: 'Lead Motion Designer',
    deliverables: ['2-minute Master SaaS Explainer', 'Sales Enablement Loops', 'Homepage Hero Video'],
    tools: ['Blender', 'After Effects', 'Figma'],
    highlight: 'Enterprise Deal Conversion +65%'
  }
];

// ==========================================
// 04 — 2D ANIMATION (EXACTLY 7 PROJECTS — NO 8th PROJECT)
// ==========================================
export const animationProjects: Project[] = [
  {
    id: 'anim-01',
    title: 'Fintech Onboarding & Cashflow Explainer',
    subtitle: 'Animation 01',
    category: '2D Animation',
    categoryNumber: '04',
    description: 'Fluid vector character animation and dynamic financial chart morphs illustrating painless modern cross-border remittances.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'video',
    tags: ['Vector Rigging', 'Character Motion', 'Explainer Video', 'Fintech UI'],
    client: 'Zenith Pay',
    year: '2024',
    role: 'Senior 2D Animator',
    deliverables: ['90s Commercial Explainer', 'In-App Onboarding Loops'],
    tools: ['After Effects', 'DUIK Bassel', 'Illustrator'],
    highlight: 'Part of 540+ Animation Archive',
    stats: [
      { label: 'Onboarding Lift', value: '+38%' },
      { label: 'Frames Hand-Crafted', value: '2,700' }
    ]
  },
  {
    id: 'anim-02',
    title: 'HealthTech Isometric Motion System',
    subtitle: 'Animation 02',
    category: '2D Animation',
    categoryNumber: '04',
    description: 'Complex isometric hospital and biometric data flows animated with strict geometric perspective and responsive micro-timing.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'video',
    tags: ['Isometric 2D', 'Health Data', 'System Flow'],
    client: 'VitalSync Global',
    year: '2024',
    role: 'Lead Motion Specialist',
    deliverables: ['Interactive System Animation', 'Conference Video Loop'],
    tools: ['After Effects', 'Illustrator', 'Overlord'],
    highlight: 'Best B2B Motion Award'
  },
  {
    id: 'anim-03',
    title: 'EcoPulse Climate Data Story',
    subtitle: 'Animation 03',
    category: '2D Animation',
    categoryNumber: '04',
    description: 'Emotional narrative charting carbon reduction milestones through shifting landscape illustrations and organic shape transformations.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'video',
    tags: ['Data Storytelling', 'Organic Morph', 'Environmental'],
    client: 'EarthForward NGO',
    year: '2023',
    role: 'Art Director & Animator',
    deliverables: ['2-minute Awareness Campaign Video', 'Social Teasers'],
    tools: ['After Effects', 'Photoshop', 'Animate CC'],
    highlight: 'Screened at UN Climate Youth Forum'
  },
  {
    id: 'anim-04',
    title: 'SaaS Workflow Micro-Interactions',
    subtitle: 'Animation 04',
    category: '2D Animation',
    categoryNumber: '04',
    description: 'Comprehensive UI micro-interaction library designed in Lottie for web and mobile apps, providing delightful functional feedback.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'video',
    tags: ['Lottie / JSON', 'Micro-Interactions', 'UI Motion'],
    client: 'Nexus Cloud Suite',
    year: '2024',
    role: 'UI Motion Designer',
    deliverables: ['40+ Lottie Animations', 'JSON Production Files', 'Documentation'],
    tools: ['Bodymovin', 'After Effects', 'Figma'],
    highlight: '40+ Production Lottie Files'
  },
  {
    id: 'anim-05',
    title: 'Cyber Guardian Vector Storyboard',
    subtitle: 'Animation 05',
    category: '2D Animation',
    categoryNumber: '04',
    description: 'High-octane comic-book inspired 2D vector animation detailing automated firewall defense mechanisms.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'video',
    tags: ['Comic Book Style', 'Vector Storytelling', 'Action Timing'],
    client: 'Sentinel Shield',
    year: '2023',
    role: 'Animator & Storyboard Artist',
    deliverables: ['Animated Comic Short', 'Static Keyframe Art'],
    tools: ['Illustrator', 'After Effects', 'Audition'],
    highlight: 'Top Engagement on YouTube Tech'
  },
  {
    id: 'anim-06',
    title: 'EduCore Interactive Learning Universe',
    subtitle: 'Animation 06',
    category: '2D Animation',
    categoryNumber: '04',
    description: 'Vibrant gamified educational universe with lively character interactions explaining complex physics concepts simply.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'video',
    tags: ['EdTech Animation', 'Character Physics', 'Youth Design'],
    client: 'EduCore Digital',
    year: '2023',
    role: '2D Motion Designer',
    deliverables: ['12 Modular Learning Episodes', 'Character Sprite Sheets'],
    tools: ['Animate CC', 'After Effects', 'Illustrator'],
    highlight: 'Over 1M Students Reached'
  },
  {
    id: 'anim-07',
    title: 'NeoBank Global Transfer Journey',
    subtitle: 'Animation 07',
    category: '2D Animation',
    categoryNumber: '04',
    description: 'Fast, playful 2D motion journey tracking a coin travelling around the globe in milliseconds across diverse hand-drawn cultures.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'video',
    tags: ['Global Narrative', 'Fast Transitions', 'Brand Campaign'],
    client: 'KoinGlobal Bank',
    year: '2024',
    role: 'Animation Director',
    deliverables: ['60s Master Commercial', 'Broadcast Cutdowns'],
    tools: ['After Effects', 'Illustrator', 'Soundly'],
    highlight: 'Broadcast on National TV & Digital'
  }
];

// ==========================================
// 05 — 3D DESIGN & ANIMATION
// ==========================================
export const threeDProjects: Project[] = [
  {
    id: '3d-chrono',
    title: 'CHRONO SPATIAL TIMEPIECE',
    subtitle: 'Photorealistic Octane Disassembly',
    category: '3D Design & Animation',
    categoryNumber: '05',
    description: 'Precision mechanical watch animation with titanium gear trains, sapphire crystal refraction, and dynamic depth of field.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['Cinema 4D', 'Octane Render', 'Mechanical CGI', 'Lighting & Caustics'],
    client: 'Horology Atelier',
    year: '2024',
    role: '3D Visualizer & Animator',
    deliverables: ['Exploded Mechanical Animation', 'High-Res Print Stills'],
    tools: ['Cinema 4D', 'Octane', 'After Effects'],
    highlight: 'Featured on Behance 3D Curation'
  },
  {
    id: '3d-neural-city',
    title: 'NEURAL CITY PROCEDURAL METROPOLIS',
    subtitle: 'Architectural Sci-Fi Sequence',
    category: '3D Design & Animation',
    categoryNumber: '05',
    description: 'Procedural geometric building growth powered by geometry nodes, ambient occlusion lighting, and volumetric mist.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tags: ['Blender Geometry Nodes', 'Procedural Modeling', 'Sci-Fi Vistas'],
    client: 'MetaSpace Urbanism',
    year: '2023',
    role: 'Environment Artist & Animator',
    deliverables: ['4K Loop Sequence', 'Virtual Production Backdrops'],
    tools: ['Blender 4.0', 'Unreal Engine 5', 'DaVinci Resolve'],
    highlight: 'Staff Pick on ArtStation'
  },
  {
    id: '3d-apex-soundform',
    title: 'APEX SOUNDFORM ACOUSTIC NODE',
    subtitle: 'Parametric Industrial Concept',
    category: '3D Design & Animation',
    categoryNumber: '05',
    description: 'Parametric acoustic sound diffuser sculpture reacting to bass frequencies with fluid surface deformations.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['Parametric 3D', 'Sound Reactive', 'Material Studies'],
    client: 'Sonic Lab Innovations',
    year: '2024',
    role: '3D Concept Designer',
    deliverables: ['Audio-reactive CGI Video', 'Industrial Design CAD Sheets'],
    tools: ['Rhino / Grasshopper', 'Blender', 'Substance Painter'],
    highlight: 'Design Award 2024 Shortlist'
  },
  {
    id: '3d-holo-matrix',
    title: 'HOLOGRAPHIC SPATIAL UI MATRIX',
    subtitle: 'Kinetic FUI & Spatial OS Concepts',
    category: '3D Design & Animation',
    categoryNumber: '05',
    description: 'Next-generation spatial computing HUD, volumetric gestures, and interactive glass interfaces for AR/VR headsets.',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tags: ['Spatial FUI', 'Augmented Reality', 'Kinetic HUD'],
    client: 'Aether Vision Labs',
    year: '2024',
    role: 'Spatial Motion Designer',
    deliverables: ['HUD Motion System', 'Unity Interactive Demo Assets'],
    tools: ['After Effects', 'Blender', 'Cinema 4D'],
    highlight: 'XR UI Benchmark 2024'
  }
];

// ==========================================
// 06 — CHARACTER DESIGN
// ==========================================
export const characterProjects: Project[] = [
  {
    id: 'char-kibo',
    title: 'KIBO & THE STARLIGHT BOT',
    subtitle: 'Brand Mascot & Turnaround System',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Beloved robotic companion mascot created with complete orthographic turnarounds, 24 facial emotion expressions, and 3D rig readiness.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['Character Design', 'Mascot System', 'Turnaround Sheets', 'Expression Matrix'],
    client: 'AstroKids Platform',
    year: '2024',
    role: 'Lead Character Designer',
    deliverables: ['360 Turnaround Model Sheets', '24 Expression Callouts', 'Rigged After Effects DUIK Character'],
    tools: ['Photoshop', 'Illustrator', 'DUIK Bassel', 'Procreate'],
    highlight: 'Adopted across 12 mobile learning apps'
  },
  {
    id: 'char-nova',
    title: 'NOVA — THE COSMIC COURIER',
    subtitle: 'Original Episodic Animation Hero',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Futuristic solar-skater heroine design featuring detailed costume breakdowns, propulsion boots, and cybernetic accessories.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tags: ['Sci-Fi Character', 'Costume Design', 'Hero Silhouette'],
    client: 'Indie Animated Pilot',
    year: '2023',
    role: 'Character & Concept Artist',
    deliverables: ['Costume Colorway Variants', 'Silhouette & Action Poses', 'Storyboard Model Sheets'],
    tools: ['Procreate', 'Photoshop', 'Clip Studio Paint'],
    highlight: 'Over 80k Character Design Likes'
  },
  {
    id: 'char-pip-rusty',
    title: 'PIP & RUSTY: FOREST GUARDIANS',
    subtitle: 'Children’s Book & Interactive Game Rigs',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Charming forest gnome and his mechanical golem friend, designed for rich storytelling with warm textural watercolor feel.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['Textural Illustration', 'Rigged Assets', 'KidLit Design'],
    client: 'TimberTales Publishing',
    year: '2023',
    role: 'Illustrator & Rigging Artist',
    deliverables: ['Children’s Book Character Cast', 'Spine 2D Game Rigs'],
    tools: ['Photoshop', 'Spine 2D', 'Illustrator'],
    highlight: 'Illustrated 3 Published Books'
  }
];

// ==========================================
// 07 — GRAPHIC & EDITORIAL DESIGN
// ==========================================
export const graphicEditorialProjects: Project[] = [
  {
    id: 'editorial-msds',
    title: 'MSDS ANNUAL RESEARCH PUBLICATION',
    subtitle: 'Editorial Layout & Typography Architecture',
    category: 'Graphic & Editorial Design',
    categoryNumber: '07',
    description: 'A 240-page master editorial publication synthesizing dense scientific research, multi-layered data infographics, and Swiss-grid typographic rigor.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tags: ['Editorial Design', 'Swiss Typography', 'Data Visualizations', 'Print Production'],
    client: 'Material Science & Data Society',
    year: '2024',
    role: 'Lead Editorial Art Director',
    deliverables: ['240-page Hardcover Book', 'Interactive Digital PDF & ePub', 'Companion Infographic Poster'],
    tools: ['InDesign', 'Illustrator', 'Photoshop'],
    highlight: 'Winner of Editorial Typography Award 2024',
    stats: [
      { label: 'Pages Designed', value: '240' },
      { label: 'Data Visualizations', value: '85+' }
    ],
    details: {
      overview: 'The MSDS Research Publication required a sophisticated editorial layout to present complex multi-disciplinary material science findings to international academic institutions and corporate sponsors.',
      challenge: 'Structuring dense tabular data, molecular charts, and long-form essays without sacrificing legibility or aesthetic clarity.',
      solution: 'Constructed an asymmetric 12-column grid system paired with subtle emerald section dividers, custom data glyphs, and premium uncoated paper stocks.',
      gallery: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'
      ]
    }
  },
  {
    id: 'editorial-grid-monograph',
    title: 'THE ARCHITECTURE OF GRID SYSTEMS',
    subtitle: 'Limited Edition Design Monograph',
    category: 'Graphic & Editorial Design',
    categoryNumber: '07',
    description: 'A limited edition hardcover design monograph celebrating rationalist typography, baseline modular systems, and optical hierarchy.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['Typography Theory', 'Book Design', 'Foil Stamping', 'Layout Master'],
    client: 'Independent Typography Press',
    year: '2023',
    role: 'Author & Designer',
    deliverables: ['Numbered Collector Edition', 'Custom Type Specimen Posters'],
    tools: ['InDesign', 'Illustrator'],
    highlight: 'Sold Out First Edition Print Run'
  },
  {
    id: 'editorial-botanica',
    title: 'BOTANICA ORGANIC PACKAGING SYSTEM',
    subtitle: 'Sustainable Packaging & Print Collateral',
    category: 'Graphic & Editorial Design',
    categoryNumber: '07',
    description: 'Eco-conscious packaging suite utilizing soy inks, seeded biodegradable paper stock, and blind debossed minimalist typography.',
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['Sustainable Packaging', 'Debossing', 'Eco Print', 'Label Hierarchy'],
    client: 'Botanica Organics',
    year: '2024',
    role: 'Package & Print Designer',
    deliverables: ['18 Packaging Dielines', 'Display Boxes', 'Product Brochure'],
    tools: ['Illustrator', 'InDesign', 'Photoshop'],
    highlight: '100% Recyclable Certified'
  }
];

// ==========================================
// 08 — AI CREATIVE LAB
// ==========================================
export const aiCreativeProjects: Project[] = [
  {
    id: 'ai-synesthesia',
    title: 'SYNESTHESIA NEURAL SOUNDSCAPES',
    subtitle: 'Audio-Reactive Generative Synthesizer',
    category: 'AI Creative Lab',
    categoryNumber: '08',
    description: 'Experimental creative engineering connecting real-time frequency analysis with custom-trained generative diffusion models for live visuals.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tags: ['Generative AI', 'Audio Reactive', 'Neural Shaders', 'TouchDesigner'],
    client: 'AudioVisual Festival 2024',
    year: '2024',
    role: 'Creative Technologist & AI Artist',
    deliverables: ['Live Concert Visual Engine', 'Generative Motion Loops'],
    tools: ['TouchDesigner', 'ComfyUI', 'After Effects', 'Python'],
    highlight: 'Performed Live in Front of 4,000 Attendees',
    stats: [
      { label: 'FPS Realtime', value: '60 FPS' },
      { label: 'Latency', value: '< 18ms' }
    ]
  },
  {
    id: 'ai-latent-fashion',
    title: 'LATENT SPACE AVANT-GARDE FASHION',
    subtitle: 'AI-Assisted Haute Couture Video Lookbook',
    category: 'AI Creative Lab',
    categoryNumber: '08',
    description: 'Exploring non-Euclidean fabrics, liquid metallics, and procedural textile physics using guided LoRA models and motion tracking.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['AI Fashion', 'Diffusion Video', 'Textile Physics', 'Runway Motion'],
    client: 'Atelier Futura',
    year: '2024',
    role: 'AI Motion Director',
    deliverables: ['2-minute Digital Runway Film', 'High-Res Fashion Editorial Book'],
    tools: ['Midjourney v6', 'Runway Gen-3', 'After Effects', 'Photoshop'],
    highlight: 'Featured in Digital Art Monthly'
  },
  {
    id: 'ai-cinema-pipeline',
    title: 'SYNTHETIC CINEMA PRE-VISUALIZATION',
    subtitle: 'AI-Enhanced Cinematic Storyboard Engine',
    category: 'AI Creative Lab',
    categoryNumber: '08',
    description: 'A rapid prototyping visual workflow helping directors generate cinematic camera angles, lighting moods, and animatics in minutes.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'square',
    tags: ['Pre-Vis Pipeline', 'Storyboarding', 'Camera Direction'],
    client: 'Film & Motion Incubator',
    year: '2023',
    role: 'Creative Director',
    deliverables: ['Pipeline Documentation', 'Automated Animatics Engine'],
    tools: ['Midjourney', 'After Effects', 'Premiere Pro'],
    highlight: 'Reduced Pre-Production Time by 70%'
  }
];

// ==========================================
// 10 — EXPERIENCE
// ==========================================
export const experiences: ExperienceItem[] = [
  {
    id: 'exp-01',
    role: 'Lead Motion Designer & Creative Director',
    company: 'Studio Apex / Global Brand Systems',
    location: 'Remote / Hybrid',
    period: '2022 — Present',
    type: 'fulltime',
    description: 'Directing motion identity, 2D/3D commercial campaigns, brand systems, and high-impact visual direction for global tech, fintech, and consumer brands.',
    highlights: [
      'Directed over 220+ high-engagement commercial animation videos and brand launch films.',
      'Established cohesive design systems, motion guidelines, and Lottie pipelines for multi-platform products.',
      'Led a multidisciplinary team of 6 animators, 3D artists, and illustrators delivering projects on time and within budget.'
    ],
    skills: ['Creative Direction', 'After Effects', '3D Motion', 'Brand Architecture', 'Team Leadership']
  },
  {
    id: 'exp-02',
    role: 'Senior Motion & Brand Identity Specialist',
    company: 'Nexus Digital Media',
    location: 'Chennai & Bengaluru, India',
    period: '2019 — 2022',
    type: 'fulltime',
    description: 'Spearheaded brand identity transformations, kinetic typography campaigns, and high-conversion social video advertising for venture-backed startups.',
    highlights: [
      'Created 180+ animated product videos resulting in over 85M combined views across social channels.',
      'Crafted brand identities and logotypes for 25+ emerging startups and educational institutions.',
      'Implemented automated render pipelines reducing video production turnaround time by 45%.'
    ],
    skills: ['Brand Identity', '2D Character Animation', 'Kinetic Typography', 'Social Reels Strategy']
  },
  {
    id: 'exp-03',
    role: '2D Animator & Visual Designer',
    company: 'Pulse Creative Lab',
    location: 'Kolkata, India',
    period: '2017 — 2019',
    type: 'fulltime',
    description: 'Produced frame-by-frame character animation, vector storyboards, explainer videos, and marketing collateral for enterprise clients.',
    highlights: [
      'Hand-crafted 140+ vector explainer animations and interactive educational modules.',
      'Collaborated closely with sound designers and voiceover artists for seamless audiovisual synchronization.',
      'Designed print packaging, brand books, and presentation collateral for healthcare and finance clients.'
    ],
    skills: ['DUIK Bassel', 'Vector Rigging', 'Storyboarding', 'Editorial Layout']
  },
  {
    id: 'exp-04',
    role: 'Independent Creative Consultant & Freelance Specialist',
    company: 'Selected Global Clients (US, UK, Europe, India)',
    location: 'Global Remote',
    period: '2018 — Present',
    type: 'freelance',
    description: 'Partnering directly with founders, creative agencies, and marketing directors to deliver high-converting brand identities, commercial 3D videos, and animated campaigns.',
    highlights: [
      'Delivered bespoke motion solutions to over 50+ independent clients worldwide with 100% 5-star feedback.',
      'Crafted the acclaimed identity for SUMMER, IIT Madras LC Lab, Beyond The Spelling Mistake, and Femilux.',
      'Recognized with international motion awards and creator community distinctions.'
    ],
    skills: ['Client Management', 'End-to-End Execution', 'Rapid Prototyping', 'Commercial Direction']
  }
];

// ==========================================
// 11 — EDUCATION
// ==========================================
export const educations: EducationItem[] = [
  {
    id: 'edu-01',
    degree: 'Bachelor of Design (B.Des) — Visual Communication & Digital Media',
    institution: 'National Institute of Design / Premier Design University',
    location: 'India',
    period: '2013 — 2017',
    honors: 'Graduated with First Class Honors & Best Graduation Motion Project',
    description: 'Rigorous 4-year curriculum spanning design theory, typography, Swiss grid systems, traditional 2D animation, color dynamics, semiotics, and interactive media design.'
  },
  {
    id: 'edu-02',
    degree: 'Advanced Certification in 3D Motion Design & Spatial CGI',
    institution: 'School of Motion / Master Class Certification',
    location: 'Online / International',
    period: '2020',
    honors: 'Top 5% Cohort Distinction',
    description: 'Comprehensive mastery of 3D lighting, Octane render pipelines, kinetic typography physics, and advanced character rigging mechanics.'
  }
];

// ==========================================
// 12 — AWARD (USAIN BOLT AWARD SECTION)
// ==========================================
export const awardDetails: AwardItem = {
  id: 'award-usain-bolt',
  title: 'International Motion & Creative Excellence Award',
  organization: 'Global Creative Motion Festival & Usain Bolt Foundation Campaign',
  year: '2024',
  badge: 'Gold Winner • Best High-Impact Animation',
  description: 'Honored with the prestigious Creative Excellence Gold Trophy for directing the high-energy animated campaign celebrating speed, resilience, and human athletic triumph in association with Usain Bolt’s global initiatives.',
  campaign: 'Fast as Lightning — The Kinetic Story of Usain Bolt',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // High-fidelity presentation video
  thumbnailUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
  stats: [
    { label: 'Global Jury Score', value: '98.6 / 100' },
    { label: 'Participating Studios', value: '450+ Studios' },
    { label: 'Audience Reach', value: '18M+ Global' }
  ]
};

// ==========================================
// 13 — TOOLS & SOFTWARE
// ==========================================
export const toolsData: ToolItem[] = [
  {
    name: 'Adobe After Effects',
    category: 'Motion & Animation',
    level: 'Master / Lead',
    experienceYears: '8+ Years',
    iconName: 'Sparkles'
  },
  {
    name: 'Blender 3D',
    category: '3D & CGI',
    level: 'Advanced',
    experienceYears: '5+ Years',
    iconName: 'Box'
  },
  {
    name: 'Adobe Illustrator',
    category: 'Design & Vector',
    level: 'Master',
    experienceYears: '8+ Years',
    iconName: 'PenTool'
  },
  {
    name: 'Adobe Photoshop',
    category: 'Design & Vector',
    level: 'Master',
    experienceYears: '8+ Years',
    iconName: 'Image'
  },
  {
    name: 'Cinema 4D + Octane',
    category: '3D & CGI',
    level: 'Advanced',
    experienceYears: '4+ Years',
    iconName: 'Layers'
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'Editing & Audio',
    level: 'Expert',
    experienceYears: '7+ Years',
    iconName: 'Film'
  },
  {
    name: 'Figma',
    category: 'Design & Vector',
    level: 'Expert',
    experienceYears: '6+ Years',
    iconName: 'Layout'
  },
  {
    name: 'DaVinci Resolve',
    category: 'Editing & Audio',
    level: 'Advanced',
    experienceYears: '4+ Years',
    iconName: 'Sliders'
  },
  {
    name: 'Spine 2D',
    category: 'Motion & Animation',
    level: 'Advanced',
    experienceYears: '4+ Years',
    iconName: 'Zap'
  },
  {
    name: 'Lottie / Bodymovin',
    category: 'Motion & Animation',
    level: 'Master',
    experienceYears: '5+ Years',
    iconName: 'Code'
  },
  {
    name: 'Midjourney & ComfyUI',
    category: 'AI & Gen Tools',
    level: 'Expert',
    experienceYears: '2+ Years',
    iconName: 'Cpu'
  },
  {
    name: 'Adobe InDesign',
    category: 'Design & Vector',
    level: 'Expert',
    experienceYears: '6+ Years',
    iconName: 'BookOpen'
  }
];

// ==========================================
// 14 — ABOUT & STATISTICS
// ==========================================
export const aboutData = {
  name: 'Aravind Shaw',
  title: 'Motion Designer, Brand Identity Specialist & Visual Director',
  location: 'Available for Remote & Worldwide Engagements',
  experienceYears: '8+ Years',
  headline: 'Transforming ideas into unforgettable motion, iconic brand identities, and visually stunning digital experiences.',
  bioParagraphs: [
    'I am a passionate Motion Designer and Visual Identity Specialist with over 8 years of professional experience crafting dynamic 2D/3D animations, timeless logos, and comprehensive brand systems.',
    'Over my career, I have produced more than 540+ animation videos spanning commercial explainers, high-converting social media reels, 3D product showcases, and interactive UI motion for startups and world-class organizations.',
    'My philosophy is simple: every keyframe, every curve, and every typographic choice should serve a deliberate purpose. By blending Swiss design rigor with cutting-edge kinetic pacing, I help brands stand out in crowded visual landscapes.'
  ],
  stats: [
    { value: '540+', label: 'Animation Videos Created', detail: 'Across 2D, 3D, and commercial campaigns' },
    { value: '8+', label: 'Years Experience', detail: 'Dedicated to visual design & motion craft' },
    { value: '45+', label: 'Brand Identities', detail: 'From concept to full guideline delivery' },
    { value: '120M+', label: 'Global Video Views', detail: 'Across YouTube, Instagram & commercials' }
  ],
  disciplines: [
    'Brand Identity & Logo Systems',
    '2D & 3D Motion Graphics',
    'Commercial Product Videos',
    'Short-Form Social Media Reels',
    '2D Character Rigging & Animation',
    'Editorial & Swiss Graphic Design',
    'Lottie / Interactive UI Motion',
    'AI-Assisted Generative Pipelines'
  ]
};
