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
    image: '/images/Samam Linkin post-01.jpg',
    aspectRatio: 'portrait',
    tags: ['AI Education', 'Logo Design', 'Brand Identity', 'Visual Design'],
    roles: ['Logo Design', 'Brand Identity', 'Visual Design'],
    role: 'Logo Design & Brand Identity',
    details: {
      overview: 'A visual identity created for a modern education startup — an AI-powered learning platform designed for accessibility, especially for dyslexic learners.',
      gallerySlots: [
        { slotNumber: '01', title: 'BRAND IDENTITY DESIGN', image: '/images/Samam Linkin post-01.jpg' },
        { slotNumber: '02', title: 'PRIMARY LOGO', image: '/images/Samam Linkin post-02.jpg' },
        { slotNumber: '03', title: 'LOGO VARIATIONS', image: '/images/Samam Linkin post-03.jpg' },
        { slotNumber: '04', title: 'SYMBOL / ICON', image: '/images/Samam Linkin post-04.jpg' },
        { slotNumber: '05', title: 'BRAND IN ACTION', image: '/images/Samam Linkin post-05.jpg' }
      ]
    }
  },
  {
    id: 'branding-iit-madras-lc-lab',
    title: 'IIT MADRAS — LC LAB',
    category: 'Logo Design · Institutional Identity',
    categoryNumber: '01',
    description: 'Logo design created for an LC Lab at IIT Madras.',
    image: '/images/LC Lab 01.png',
    aspectRatio: 'portrait',
    tags: ['Logo Design', 'Institutional Identity', 'Visual Identity'],
    roles: ['Logo Design', 'Visual Identity'],
    role: 'Logo Design & Visual Identity',
    details: {
      overview: 'Logo design created for an LC Lab at IIT Madras.',
      gallerySlots: [
        { slotNumber: '01', title: 'PRIMARY LOGO', image: '/images/LC Lab 01.png' },
        { slotNumber: '02', title: 'LOGO PRESENTATION', image: '/images/LC Lab 02.png' },
        { slotNumber: '03', title: 'LOGO VARIATION', image: '/images/LC Lab 03.png' },
        { slotNumber: '04', title: 'BRAND APPLICATION', image: '/images/LC Lab 04.png' },
        { slotNumber: '05', title: 'FINAL BRAND SHOWCASE', image: '/images/LC Lab 05.png' }
      ]
    }
  },
  {
    id: 'branding-beyond-the-spelling-mistake',
    title: 'BEYOND THE SPELLING MISTAKE',
    category: 'Logo Design · Creator Branding',
    categoryNumber: '01',
    description: 'Logo design created for the Beyond the Spelling Mistake channel associated with influencer Arun Fernandes.',
    image: '/images/BTSM 01.png',
    aspectRatio: 'portrait',
    tags: ['Logo Design', 'Creator Branding', 'Visual Design'],
    roles: ['Logo Design', 'Creator Branding', 'Visual Design'],
    role: 'Logo Design & Creator Branding',
    details: {
      overview: 'Logo identity created for the Beyond the Spelling Mistake channel associated with influencer Arun Fernandes.',
      gallerySlots: [
        { slotNumber: '01', title: 'PRIMARY LOGO', image: '/images/BTSM 01.png' },
        { slotNumber: '02', title: 'LOGO PRESENTATION', image: '/images/BTSM 02.png' },
        { slotNumber: '03', title: 'LOGO VARIATION', image: '/images/BTSM 03.png' },
        { slotNumber: '04', title: 'BRAND APPLICATION', image: '/images/BTSM 04.png' },
        { slotNumber: '05', title: 'FINAL BRAND SHOWCASE', image: '/images/BTSM 05.png' }
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
        { slotNumber: '01', title: 'LOGO', image: '/images/Samam Linkin post-01.jpg' },
        { slotNumber: '02', title: 'POSTER DESIGN', image: '/images/LC Lab 01.png' },
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
    image: '/images/reels/05 Th.png',
    videoUrl: '/Video/Kiera Knightley.mp4',
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
    image: '/images/reels/Different Brain Different Way of Learning 1.png',
    videoUrl: '/Video/Myth & Fact Video (1).mp4',
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
    image: '/images/reels/03.png',
    videoUrl: '/Video/BTSM Arun Video.mp4',
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
    image: '/images/reels/04.png',
    videoUrl: '/Video/Video Screening App.mp4',
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
    image: '/images/products/01.jpg',
    videoUrl: '/Final video.mp4',
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
        '/images/products/product-lumina.jpg',
        '/images/products/product-veloce.jpg'
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
    image: '/images/products/02 product .png',
    videoUrl: '/images/products/Ref 02.mp4',
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
    image: '/images/products/product-artisan.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
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
    image: '/images/products/product-aegis.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
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
    image: '/images/animation/anim-01.jpg',
    videoUrl: '/Final video.mp4',
    duration: '1:30',
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
    image: '/images/animation/anim-02.jpg',
    videoUrl: '/Video/Kiera Knightley.mp4',
    duration: '0:45',
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
    image: '/images/animation/anim-03.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '2:00',
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
    image: '/images/animation/anim-04.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '0:30',
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
    image: '/images/animation/anim-05.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '1:15',
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
    image: '/images/animation/anim-06.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    duration: '1:45',
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
    image: '/images/animation/anim-07.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '1:00',
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
    image: '/images/3d/3d-chrono.jpg',
    videoUrl: '/Final video.mp4',
    duration: '1:30',
    aspectRatio: 'video',
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
    image: '/images/3d/3d-neural-city.jpg',
    videoUrl: '/Video/Kiera Knightley.mp4',
    duration: '0:45',
    aspectRatio: 'video',
    tags: ['Blender Geometry Nodes', 'Procedural Modeling', 'Sci-Fi Vistas'],
    client: 'MetaSpace Urbanism',
    year: '2023',
    role: 'Environment Artist & Animator',
    deliverables: ['4K Loop Sequence', 'Virtual Production Backdrops'],
    tools: ['Blender 4.0', 'Unreal Engine 5', 'DaVinci Resolve'],
    highlight: 'Staff Pick on ArtStation'
  }
];

// ==========================================
// 06 — CHARACTER DESIGN & ANIMATION (3 DISTINCT FRAMES, 4 ITEMS EACH)
// ==========================================

export const characterFrame1Projects: Project[] = [
  {
    id: 'char-kibo',
    title: 'KIBO & THE STARLIGHT BOT',
    subtitle: 'Brand Mascot & Turnaround System',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Beloved robotic companion mascot created with complete orthographic turnarounds, 24 facial emotion expressions, and 3D rig readiness.',
    image: '/images/character/char-kibo.jpg',
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
    id: 'char-tinkerbot',
    title: 'TINKERBOT EXPRESSION MATRIX',
    subtitle: 'Modular 2D Mascot Rig',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Modular educational robot mascot with interchangeable mechanical limbs, eye-screen glyphs, and dynamic mouth visemes.',
    image: '/images/character/char-kibo.jpg',
    aspectRatio: 'square',
    tags: ['Modular Mascot', 'Viseme Rigs', 'Vector Sheet'],
    client: 'RoboLearn Global',
    year: '2024',
    role: 'Mascot System Designer',
    deliverables: ['Vector Model Sheets', 'After Effects Lip Sync Rig'],
    tools: ['Illustrator', 'After Effects', 'DUIK Bassel'],
    highlight: '50+ Dynamic Emotion States'
  },
  {
    id: 'char-aero',
    title: 'AERO — VECTOR DRONE MASCOT',
    subtitle: 'Smart Aerial Companion Concept',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Playful hover-drone character engineered for tech branding, featuring LED mood panels and kinetic wing articulation.',
    image: '/images/animation/anim-04.jpg',
    aspectRatio: 'square',
    tags: ['Drone Character', 'Tech Mascot', 'Vector Motion'],
    client: 'AeroTech Systems',
    year: '2023',
    role: 'Character Designer',
    deliverables: ['360 Turnaround', 'UI Micro-Interaction Loops'],
    tools: ['Illustrator', 'After Effects'],
    highlight: 'Brand Mascot of the Year'
  },
  {
    id: 'char-mech-scout',
    title: 'PROTO-7 ROVING SCOUT',
    subtitle: 'Tactical Companion Model Sheet',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Rugged terrain exploratory automaton with detailed joint kinematics, gear callouts, and expressive optical sensors.',
    image: '/images/animation/anim-02.jpg',
    aspectRatio: 'square',
    tags: ['Automaton Rig', 'Kinematics', 'Sci-Fi Model Sheet'],
    client: 'ExoWorld Studios',
    year: '2024',
    role: 'Concept & Rigging Artist',
    deliverables: ['Detailed CAD Callouts', 'Action Poses'],
    tools: ['Photoshop', 'Clip Studio Paint'],
    highlight: 'Featured in Concept Art Showcase'
  }
];

export const characterFrame2Projects: Project[] = [
  {
    id: 'char-nova',
    title: 'NOVA — THE COSMIC COURIER',
    subtitle: 'Original Episodic Animation Hero',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Futuristic solar-skater heroine design featuring detailed costume breakdowns, propulsion boots, and cybernetic accessories.',
    image: '/images/character/char-nova.jpg',
    aspectRatio: 'square',
    tags: ['Sci-Fi Character', 'Costume Design', 'Hero Silhouette'],
    client: 'Indie Animated Pilot',
    year: '2023',
    role: 'Character & Concept Artist',
    deliverables: ['Costume Colorway Variants', 'Silhouette & Action Poses', 'Storyboard Model Sheets'],
    tools: ['Procreate', 'Photoshop', 'Clip Studio Paint'],
    highlight: 'Over 80k Character Design Likes'
  },
  {
    id: 'char-valkyrie',
    title: 'VALKYRIE X MECHA HEROINE',
    subtitle: 'Stylized Cybernetic Warrior',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'High-agility armored mecha pilot with customizable exo-wings, hard-surface armor layering, and combat weapon loadouts.',
    image: '/images/character/char-nova.jpg',
    aspectRatio: 'square',
    tags: ['Mecha Pilot', 'Hard Surface', 'Action Pose'],
    client: 'NovaStrike Games',
    year: '2024',
    role: 'Lead Concept Artist',
    deliverables: ['Colorway Turnaround', 'Modular Weapon Sheet'],
    tools: ['Procreate', 'Photoshop'],
    highlight: 'Lead Hero Character'
  },
  {
    id: 'char-zephyr',
    title: 'CAPTAIN ZEPHYR',
    subtitle: 'Retro-Futuristic Airship Pilot',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Charismatic steampunk sky-captain character with detailed leather textures, brass chronometer goggles, and expressive facial sculpt.',
    image: '/images/animation/anim-05.jpg',
    aspectRatio: 'square',
    tags: ['Steampunk Character', 'Silhouette Art', 'Model Sheet'],
    client: 'CloudVessel Media',
    year: '2023',
    role: 'Character Designer',
    deliverables: ['Full Turnaround Sheet', 'Expression Chart'],
    tools: ['Clip Studio Paint', 'Photoshop'],
    highlight: 'Selected for Character Annual'
  },
  {
    id: 'char-shadow-cat',
    title: 'CYBER SHADOW STALKER',
    subtitle: 'Stealth Vector Model Sheet',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Sleek bionic feline operative with neon cloaking accents, articulated carbon-fiber tail, and fluid acrobatic action stances.',
    image: '/images/animation/anim-07.jpg',
    aspectRatio: 'square',
    tags: ['Bionic Feline', 'Cyberpunk', 'Vector Rig Ready'],
    client: 'Nightfall Animation',
    year: '2024',
    role: 'Character & Rigging Artist',
    deliverables: ['Vector Pose Library', 'After Effects Puppet'],
    tools: ['Illustrator', 'After Effects'],
    highlight: 'Over 50k Views on ArtStation'
  }
];

export const characterFrame3Projects: Project[] = [
  {
    id: 'char-pip-rusty',
    title: 'PIP & RUSTY: FOREST GUARDIANS',
    subtitle: 'Children’s Book & Interactive Game Rigs',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Charming forest gnome and his mechanical golem friend, designed for rich storytelling with warm textural watercolor feel.',
    image: '/images/character/char-pip-rusty.jpg',
    aspectRatio: 'square',
    tags: ['Textural Illustration', 'Rigged Assets', 'KidLit Design'],
    client: 'TimberTales Publishing',
    year: '2023',
    role: 'Illustrator & Rigging Artist',
    deliverables: ['Children’s Book Character Cast', 'Spine 2D Game Rigs'],
    tools: ['Photoshop', 'Spine 2D', 'Illustrator'],
    highlight: 'Illustrated 3 Published Books'
  },
  {
    id: 'char-luma-sol',
    title: 'LUMA & SOL DUAL ELEMENTALS',
    subtitle: 'Co-op Interactive Game Sprites',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Whimsical light and shadow elemental duo crafted for cooperative puzzle platformers with vibrant color gradients.',
    image: '/images/character/char-pip-rusty.jpg',
    aspectRatio: 'square',
    tags: ['Game Sprites', 'Elemental Characters', 'Spine 2D'],
    client: 'Twinkle Interactive',
    year: '2024',
    role: 'Lead Sprite Animator',
    deliverables: ['Spine 2D Run/Jump Cycles', 'Texture Atlas'],
    tools: ['Spine 2D', 'Photoshop', 'Illustrator'],
    highlight: 'Indie Game Festival Finalist'
  },
  {
    id: 'char-flora',
    title: 'FLORA THE FOREST SPRITE',
    subtitle: 'Rigged 2D Character System',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Organic leaf-cloaked sprite character with botanical accessories and smooth skeletal bone hierarchies for 60fps animation.',
    image: '/images/animation/anim-03.jpg',
    aspectRatio: 'square',
    tags: ['Botanical Character', 'Skeletal Rig', 'KidLit'],
    client: 'Grove Interactive',
    year: '2023',
    role: 'Character Artist & Animator',
    deliverables: ['Bone Hierarchy Sheets', 'Idle/Walk Animations'],
    tools: ['DUIK Bassel', 'After Effects', 'Photoshop'],
    highlight: 'Adopted in 4 Educational Games'
  },
  {
    id: 'char-chrono-knight',
    title: 'CHRONO KNIGHT HERO',
    subtitle: 'Action Adventure Vector Rig',
    category: 'Character Design',
    categoryNumber: '06',
    description: 'Time-bending armored knight character featuring radiant hourglass energy blade and multi-angle orthographic projections.',
    image: '/images/animation/anim-06.jpg',
    aspectRatio: 'square',
    tags: ['Action Hero', 'Vector Turnaround', 'Animation Ready'],
    client: 'Chronos Arc Games',
    year: '2024',
    role: 'Character & Concept Artist',
    deliverables: ['Orthographic Turnaround', 'Combat Spritesheet'],
    tools: ['Illustrator', 'Animate CC', 'Photoshop'],
    highlight: 'Featured Character on Steam'
  }
];

export const characterProjects: Project[] = [
  ...characterFrame1Projects,
  ...characterFrame2Projects,
  ...characterFrame3Projects
];

// ==========================================
// 07 — GRAPHIC & EDITORIAL DESIGN
// ==========================================
export const graphicEditorialProjects: Project[] = [
  {
    id: 'editorial-book-cover',
    title: 'DIFFERENT BRAIN DIFFERENT WAY OF LEARNING — BOOK COVER',
    subtitle: 'Book Cover Design & Typography Architecture',
    category: 'Graphic & Editorial Design',
    categoryNumber: '07',
    description: 'A 1920×1080 static cover design for "Different Brain Different Way of Learning", featuring Swiss grid typography, expressive hierarchy, and neurodiverse educational themes.',
    image: '/Different Brain Different Way of Learning 1.png',
    aspectRatio: 'video',
    tags: ['Book Cover', 'Editorial Design', 'Swiss Typography', 'Print Production'],
    client: 'Educational Publishing House',
    year: '2024',
    role: 'Lead Editorial & Cover Designer',
    deliverables: ['1920×1080 Hardcover Print Wrap', 'Typography Hierarchy', 'Dust Jacket Print Ready'],
    tools: ['InDesign', 'Illustrator', 'Photoshop'],
    highlight: '1920×1080 Static Cover',
    stats: [
      { label: 'Aspect Ratio', value: '16:9 Landscape' },
      { label: 'Resolution', value: '1920 × 1080' }
    ],
    details: {
      overview: 'Full-bleed 1920×1080 landscape book cover design for "Different Brain Different Way of Learning", meticulously balancing bold title typography, visual clarity, and educational accessibility.',
      challenge: 'Crafting an engaging, respectful visual identity that communicates complex neurodiversity research clearly.',
      solution: 'Applied a rationalist baseline grid, high-contrast typography, and expressive visual motifs tailored for academic and general readership.',
      gallery: [
        '/Different Brain Different Way of Learning 1.png'
      ]
    }
  },
  {
    id: 'editorial-book-video',
    title: 'BOOK OPENING & INSIDE PAGES SPREAD',
    subtitle: 'Inside Pages Reveal & Editorial Motion Showcase',
    category: 'Graphic & Editorial Design',
    categoryNumber: '07',
    description: 'A 1920×1080 landscape video showcase demonstrating the physical book opening, chapter transitions, page-by-page grid layout, and interior typography rhythm.',
    image: '/Different Brain Different Way of Learning 1.png',
    videoUrl: '/Final video.mp4',
    aspectRatio: 'video',
    tags: ['Book Opening', 'Inside Pages', 'Editorial Video', 'Page-by-Page'],
    client: 'Educational Publishing House',
    year: '2024',
    role: 'Editorial Designer & Motion Showcase Artist',
    deliverables: ['1920×1080 Book Opening Video', 'Interior Editorial Layout', 'Print Specifications'],
    tools: ['InDesign', 'After Effects', 'Premiere Pro'],
    highlight: '1920×1080 HD Video',
    stats: [
      { label: 'Format', value: '16:9 HD Video' },
      { label: 'Resolution', value: '1920 × 1080' }
    ],
    details: {
      overview: 'Dynamic video capture of the book opening and inside pages, providing an immersive preview of the interior layout, margins, and typography.',
      challenge: 'Presenting multi-page editorial content dynamically without losing typographic fidelity.',
      solution: 'Produced a high-definition 16:9 video sequence showcasing page flips, spreads, and typographic hierarchy.',
      gallery: [
        '/Different Brain Different Way of Learning 1.png'
      ]
    }
  }
];

// ==========================================
// 08 — AI CREATIVE LAB
// ==========================================
export const aiCreativeProjects: Project[] = [
  // -------------------------------------------------------------------------
  // 1. LANDSCAPE VIDEO 1 (1920 × 1080 px • 16:9 Landscape Video)
  // -------------------------------------------------------------------------
  {
    id: 'ai-synesthesia-video',
    title: 'SYNESTHESIA NEURAL SOUNDSCAPES',
    subtitle: 'Audio-Reactive Generative Synthesizer',
    category: 'AI Creative Lab',
    categoryNumber: '08',
    description: 'Experimental creative engineering connecting real-time frequency analysis with custom-trained generative diffusion models for live 16:9 visuals.',
    image: '/images/ai/ai-synesthesia.jpg',
    videoUrl: '/Video/Myth & Fact Video (1).mp4',
    aspectRatio: 'video',
    tags: ['Generative AI', '16:9 Video', 'Audio Reactive', 'Neural Shaders'],
    client: 'AudioVisual Festival 2024',
    year: '2024',
    role: 'Creative Technologist & AI Artist',
    deliverables: ['1920×1080 Generative Motion Film', 'Live Concert Visual Engine', 'Real-Time Audio Shaders'],
    tools: ['TouchDesigner', 'ComfyUI', 'After Effects', 'Python'],
    highlight: '1920 × 1080 • 16:9 Video',
    stats: [
      { label: 'Aspect Ratio', value: '16:9 Landscape' },
      { label: 'Resolution', value: '1920 × 1080' }
    ],
    details: {
      overview: 'Full-resolution 16:9 audio-reactive cinematic generative performance piece reacting to micro-tonal sound frequencies in real-time.',
      challenge: 'Zero-latency neural synthesis synchronized with multichannel audio spectrum feeds.',
      solution: 'Custom TouchDesigner pipeline routing OSC and FFT audio data directly into accelerated TensorRT latent operators.',
      gallery: [
        '/images/ai/ai-synesthesia.jpg'
      ]
    }
  },

  // -------------------------------------------------------------------------
  // 2. LANDSCAPE VIDEO 2 (1920 × 1080 px • 16:9 Landscape Video)
  // -------------------------------------------------------------------------
  {
    id: 'ai-holodeck-motion',
    title: 'NEURAL FLUID MOTION & KINETIC LAB',
    subtitle: 'High-Fidelity Generative Motion Sequence',
    category: 'AI Creative Lab',
    categoryNumber: '08',
    description: 'A 1920×1080 landscape cinematic sequence exploring fluid dynamics, neural particle flow, and volumetric atmospheric light synthesis.',
    image: '/images/ai/ai-cinema-pipeline.jpg',
    videoUrl: '/Video/Kiera Knightley.mp4',
    aspectRatio: 'video',
    tags: ['Generative Motion', '16:9 Video', 'Diffusion Models', 'Real-Time FX'],
    client: 'Apex Visual Research',
    year: '2024',
    role: 'Lead AI Motion Director',
    deliverables: ['1920×1080 Cinematic Master Film', 'Volumetric Shader Library', 'Motion Presets'],
    tools: ['Runway Gen-3', 'After Effects', 'Premiere Pro', 'Topaz Video AI'],
    highlight: '1920 × 1080 • 16:9 Video',
    stats: [
      { label: 'Aspect Ratio', value: '16:9 Landscape' },
      { label: 'Resolution', value: '1920 × 1080' }
    ],
    details: {
      overview: 'High-definition 16:9 generative cinematic sequence demonstrating complex atmospheric lighting, volumetric depth, and realistic camera physics.',
      challenge: 'Eliminating motion artifacts while maintaining crisp cinematic motion blur and lens optical aberrations.',
      solution: 'Multi-pass AI upscaling, optical flow stabilization, and post-production color grading in DaVinci Resolve.',
      gallery: [
        '/images/ai/ai-cinema-pipeline.jpg'
      ]
    }
  }
];

// ==========================================
// 10 — EXPERIENCE
// ==========================================
export const experiences: ExperienceItem[] = [
  {
    id: 'exp-01',
    role: '2D Motion Graphic Designer',
    company: 'DLearners.com',
    location: 'India',
    period: 'December 2024 – Present',
    type: 'fulltime',
    description: 'Lead 2D motion graphic designer crafting high-impact social media animations, educational reels, and promotional video campaigns for D-Learners.',
    highlights: [
      'Designed and edited high-retention social media content and motion graphics for digital channels.',
      'Produced engaging vector character animations, kinetic typography, and brand-consistent video assets.',
      'Optimized animation templates and asset workflows, speeding up turnaround times for weekly releases.'
    ],
    skills: ['After Effects', 'Premiere Pro', 'Motion Graphics', 'Social Media Design', 'Kinetic Typography'],
    impactMetric: 'Key Milestone: High-Retention Video Assets & Active Campaign Direction'
  },
  {
    id: 'exp-02',
    role: 'Animator',
    company: 'UEDUCATE',
    location: 'India',
    period: 'May 2024 – September 2024',
    type: 'fulltime',
    description: 'Created 3D and 2.5D educational explainer videos using After Effects, turning intricate subject matter into accessible visual stories.',
    highlights: [
      'Created 3D and 2.5D educational explainer videos utilizing camera layers, lights, and After Effects plugins.',
      'Developed clear visual explanations for complex educational concepts, formulas, and diagrams.',
      'Collaborated with scriptwriters and audio engineers to maintain tight audio-visual pacing and narrative flow.'
    ],
    skills: ['After Effects', '3D Educational Video', 'Motion Design', 'Visual Storytelling', 'Camera Rigs'],
    impactMetric: 'Key Milestone: 3D Camera Rigging & Complex Explainer Series'
  },
  {
    id: 'exp-03',
    role: '2D Animator',
    company: 'Mystic Media House',
    location: 'India',
    period: 'May 2023 – April 2024',
    type: 'fulltime',
    description: 'Spearheaded full-cycle 2D vector animation production, creating over 100 engaging educational videos with custom character rigging.',
    highlights: [
      'Created 100+ engaging educational videos using vector animation and character rigging techniques.',
      'Maintained consistent character anatomy, expressive facial visemes, and fluid motion across all series.',
      'Designed custom background environments, scene layouts, and vector prop libraries in Adobe Illustrator.'
    ],
    skills: ['Vector Animation', 'Character Rigging', 'After Effects', 'Illustrator', 'Scene Layout'],
    impactMetric: 'Key Milestone: 100+ Production Educational Videos Delivered'
  }
];

// ==========================================
// 11 — EDUCATION
// ==========================================
export const educations: EducationItem[] = [
  {
    id: 'edu-01',
    degree: 'Bachelor in Computer Application (BCA)',
    institution: 'Tamil Nadu Open University (TNOU)',
    location: 'Tamil Nadu, India',
    period: 'Completed',
    description: 'Undergraduate studies in computer applications, programming fundamentals, and digital media technologies.'
  },
  {
    id: 'edu-02',
    degree: 'Visual Effects Course',
    institution: 'Arena Animation',
    location: 'India',
    period: '2024',
    description: 'Specialized professional training in visual effects, compositing, motion graphics, and digital animation pipelines.'
  },
  {
    id: 'edu-03',
    degree: 'Diploma in Electrical & Electronics Engineering',
    institution: 'Little Polytechnic College',
    location: 'Tamil Nadu, India',
    period: '2022',
    honors: '75%',
    description: 'Technical engineering diploma completed with 75% aggregate score.'
  },
  {
    id: 'edu-04',
    degree: 'SSLC',
    institution: 'Private School',
    location: 'Tamil Nadu, India',
    period: '2019',
    honors: '65%',
    description: 'Secondary School Leaving Certificate completed with 65% aggregate score.'
  }
];

// ==========================================
// 12 — AWARD (ARCHIVED / UNUSED)
// ==========================================
export const awardDetails: AwardItem = {
  id: 'award-detail',
  title: 'Animation & Motion Craft',
  organization: 'Creative Recognition',
  year: '2024',
  badge: 'Featured Work',
  description: 'Motion design and animation showcase.',
  campaign: 'Animation Showcase',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnailUrl: '/images/award-bolt.jpg'
};

// ==========================================
// 13 — TOOLS & SOFTWARE
// ==========================================
export const toolsData: ToolItem[] = [
  {
    name: 'Adobe After Effects',
    category: 'Motion & Animation',
    percentage: 95,
    level: '95%',
    iconName: 'Sparkles'
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'Editing & Audio',
    percentage: 92,
    level: '92%',
    iconName: 'Film'
  },
  {
    name: 'Adobe Photoshop',
    category: 'Design & Vector',
    percentage: 90,
    level: '90%',
    iconName: 'Image'
  },
  {
    name: 'Adobe Illustrator',
    category: 'Design & Vector',
    percentage: 90,
    level: '90%',
    iconName: 'PenTool'
  },
  {
    name: 'Adobe Animate CC',
    category: 'Motion & Animation',
    percentage: 84,
    level: '84%',
    iconName: 'Zap'
  },
  {
    name: 'Autodesk Maya',
    category: '3D & CGI',
    percentage: 80,
    level: '80%',
    iconName: 'Box'
  },
  {
    name: 'Nuke',
    category: 'VFX & Compositing',
    percentage: 75,
    level: '75%',
    iconName: 'Layers'
  }
];

// ==========================================
// 14 — ABOUT & STATISTICS
// ==========================================
export const aboutData = {
  name: 'Aravind Shaw',
  title: '2D Motion Graphic Designer & Animator',
  location: 'Available for Remote & Full-time Opportunities',
  headline: 'Creating engaging motion graphics, 2D vector animations, and compelling visual content.',
  bioParagraphs: [
    'I am a passionate 2D Motion Graphic Designer and Animator specializing in engaging educational videos, social media content, character animation, and visual design.',
    'Over my career, I have created numerous animated video productions across vector techniques, After Effects motion graphics, and social media reels.',
    'My focus is on creating clean, communicative visuals that explain concepts clearly and capture viewer attention.'
  ],
  stats: [
    { value: '[ADD REAL NUMBER]', label: 'Years Experience', detail: 'Professional motion design and animation' },
    { value: '[ADD REAL NUMBER]', label: 'Global Views', detail: 'Across social media and educational platforms' },
    { value: '[ADD REAL NUMBER]', label: 'Brand Identities', detail: 'Logos and visual design systems' },
    { value: '540+', label: 'Videos Created', detail: 'Educational and social media motion assets' }
  ],
  disciplines: [
    '2D Vector Animation',
    'Motion Graphics & After Effects',
    'Social Media Video Editing',
    'Character Design & Animation',
    'Logo Design & Visual Identity',
    'Educational Video Production',
    'Compositing & VFX',
    'AI-Generated Video Workflows'
  ]
};
