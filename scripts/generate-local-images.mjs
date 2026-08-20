import fs from 'fs';
import path from 'path';

const images = [
  // Reels (9:16 vertical)
  {
    file: 'public/images/reels/reel-01.jpg',
    category: 'REEL 01',
    title: 'Kinetic Hook & Typography',
    subtitle: 'Rhythmic Pacing & Sound Design',
    accent: '#38bdf8',
    bgStart: '#0f172a',
    bgEnd: '#1e1b4b',
    aspect: 'vertical'
  },
  {
    file: 'public/images/reels/reel-02.jpg',
    category: 'REEL 02',
    title: '3D Cyber Watch Drop',
    subtitle: 'Octane Lighting & Macro Passes',
    accent: '#f59e0b',
    bgStart: '#18181b',
    bgEnd: '#27272a',
    aspect: 'vertical'
  },
  {
    file: 'public/images/reels/reel-03.jpg',
    category: 'REEL 03',
    title: 'Logo Morphing Sequence',
    subtitle: 'Elastic Easing & Vector Physics',
    accent: '#10b981',
    bgStart: '#064e3b',
    bgEnd: '#022c22',
    aspect: 'vertical'
  },
  {
    file: 'public/images/reels/reel-04.jpg',
    category: 'REEL 04',
    title: 'Character Walk-Cycle Loop',
    subtitle: 'Secondary Dynamics & Parallax',
    accent: '#ec4899',
    bgStart: '#3b0764',
    bgEnd: '#18181b',
    aspect: 'vertical'
  },

  // Product Videos (16:9)
  {
    file: 'public/images/products/product-lumina.jpg',
    category: 'PRODUCT VIDEO 01',
    title: 'Lumina Spatial Headset',
    subtitle: 'Hardware Launch Film & 3D Commercial',
    accent: '#38bdf8',
    bgStart: '#090d16',
    bgEnd: '#1e293b',
    aspect: 'video'
  },
  {
    file: 'public/images/products/product-veloce.jpg',
    category: 'PRODUCT VIDEO 02',
    title: 'Veloce Electric Hyperbike',
    subtitle: 'Aerodynamic Launch & Wind Tunnel Simulation',
    accent: '#f43f5e',
    bgStart: '#18181b',
    bgEnd: '#27272a',
    aspect: 'video'
  },
  {
    file: 'public/images/products/product-artisan.jpg',
    category: 'PRODUCT VIDEO 03',
    title: 'Aura Ceramic Pour-Over',
    subtitle: 'Minimalist Craft & Steam Physics',
    accent: '#d97706',
    bgStart: '#292524',
    bgEnd: '#1c1917',
    aspect: 'video'
  },
  {
    file: 'public/images/products/product-aegis.jpg',
    category: 'PRODUCT VIDEO 04',
    title: 'Aegis Cybersecurity Platform',
    subtitle: 'Enterprise Zero-Trust Defense Visualization',
    accent: '#10b981',
    bgStart: '#042f2e',
    bgEnd: '#0f172a',
    aspect: 'video'
  },

  // 2D Animation (16:9)
  {
    file: 'public/images/animation/anim-01.jpg',
    category: '2D ANIMATION 01',
    title: 'Fintech Onboarding Explainer',
    subtitle: 'Zenith Pay Cross-Border Remittance',
    accent: '#38bdf8',
    bgStart: '#0c4a6e',
    bgEnd: '#0f172a',
    aspect: 'video'
  },
  {
    file: 'public/images/animation/anim-02.jpg',
    category: '2D ANIMATION 02',
    title: 'HealthTech Isometric System',
    subtitle: 'Biometric Data Flow Architecture',
    accent: '#14b8a6',
    bgStart: '#134e4a',
    bgEnd: '#042f2e',
    aspect: 'video'
  },
  {
    file: 'public/images/animation/anim-03.jpg',
    category: '2D ANIMATION 03',
    title: 'EcoPulse Climate Data Story',
    subtitle: 'Carbon Reduction Organic Narratives',
    accent: '#84cc16',
    bgStart: '#365314',
    bgEnd: '#14532d',
    aspect: 'video'
  },
  {
    file: 'public/images/animation/anim-04.jpg',
    category: '2D ANIMATION 04',
    title: 'SaaS Micro-Interactions',
    subtitle: '40+ Lottie Functional Motion Library',
    accent: '#8b5cf6',
    bgStart: '#2e1065',
    bgEnd: '#1e1b4b',
    aspect: 'video'
  },
  {
    file: 'public/images/animation/anim-05.jpg',
    category: '2D ANIMATION 05',
    title: 'Cyber Guardian Storyboard',
    subtitle: 'Comic Book Inspired Security Action',
    accent: '#ef4444',
    bgStart: '#450a0a',
    bgEnd: '#18181b',
    aspect: 'video'
  },
  {
    file: 'public/images/animation/anim-06.jpg',
    category: '2D ANIMATION 06',
    title: 'EduCore Learning Universe',
    subtitle: 'Gamified EdTech Character Universe',
    accent: '#f59e0b',
    bgStart: '#451a03',
    bgEnd: '#1e293b',
    aspect: 'video'
  },
  {
    file: 'public/images/animation/anim-07.jpg',
    category: '2D ANIMATION 07',
    title: 'NeoBank Global Transfer Journey',
    subtitle: 'Multi-Cultural 60s Broadcast Commercial',
    accent: '#06b6d4',
    bgStart: '#164e63',
    bgEnd: '#0f172a',
    aspect: 'video'
  },

  // 3D Design (Square / Wide)
  {
    file: 'public/images/3d/3d-chrono.jpg',
    category: '3D DESIGN 01',
    title: 'Chrono Spatial Timepiece',
    subtitle: 'Octane Disassembly & Titanium Refraction',
    accent: '#e2e8f0',
    bgStart: '#1e293b',
    bgEnd: '#0f172a',
    aspect: 'square'
  },
  {
    file: 'public/images/3d/3d-neural-city.jpg',
    category: '3D DESIGN 02',
    title: 'Neural City Metropolis',
    subtitle: 'Geometry Nodes Procedural Sci-Fi',
    accent: '#a855f7',
    bgStart: '#3b0764',
    bgEnd: '#18181b',
    aspect: 'video'
  },
  {
    file: 'public/images/3d/3d-apex-soundform.jpg',
    category: '3D DESIGN 03',
    title: 'Apex Soundform Node',
    subtitle: 'Parametric Acoustic Diffuser Sculpture',
    accent: '#f97316',
    bgStart: '#431407',
    bgEnd: '#1c1917',
    aspect: 'square'
  },
  {
    file: 'public/images/3d/3d-holo-matrix.jpg',
    category: '3D DESIGN 04',
    title: 'Holographic Spatial UI Matrix',
    subtitle: 'Kinetic HUD & Volumetric Gestures',
    accent: '#06b6d4',
    bgStart: '#083344',
    bgEnd: '#0f172a',
    aspect: 'video'
  },

  // Character Design
  {
    file: 'public/images/character/char-kibo.jpg',
    category: 'CHARACTER 01',
    title: 'Kibo & The Starlight Bot',
    subtitle: 'Mascot & 24 Emotion Expression Matrix',
    accent: '#38bdf8',
    bgStart: '#075985',
    bgEnd: '#0c4a6e',
    aspect: 'square'
  },
  {
    file: 'public/images/character/char-nova.jpg',
    category: 'CHARACTER 02',
    title: 'Nova — Cosmic Courier',
    subtitle: 'Episodic Action Hero & Costume Sheets',
    accent: '#ec4899',
    bgStart: '#831843',
    bgEnd: '#1e1b4b',
    aspect: 'video'
  },
  {
    file: 'public/images/character/char-pip-rusty.jpg',
    category: 'CHARACTER 03',
    title: 'Pip & Rusty: Forest Guardians',
    subtitle: 'Textural Watercolor KidLit Storybook Rigs',
    accent: '#22c55e',
    bgStart: '#14532d',
    bgEnd: '#052e16',
    aspect: 'square'
  },

  // Graphic & Editorial Design
  {
    file: 'public/images/editorial/editorial-msds.jpg',
    category: 'EDITORIAL 01',
    title: 'MSDS Research Publication',
    subtitle: '240-Page Swiss Grid Typography Architecture',
    accent: '#10b981',
    bgStart: '#064e3b',
    bgEnd: '#0f172a',
    aspect: 'video'
  },
  {
    file: 'public/images/editorial/editorial-grid-monograph.jpg',
    category: 'EDITORIAL 02',
    title: 'Architecture of Grid Systems',
    subtitle: 'Limited Edition Hardcover Monograph',
    accent: '#f59e0b',
    bgStart: '#27272a',
    bgEnd: '#18181b',
    aspect: 'square'
  },
  {
    file: 'public/images/editorial/editorial-botanica.jpg',
    category: 'EDITORIAL 03',
    title: 'Botanica Packaging System',
    subtitle: 'Eco-Conscious Soy Ink & Seeded Paper',
    accent: '#84cc16',
    bgStart: '#1a2e05',
    bgEnd: '#14532d',
    aspect: 'square'
  },

  // AI Creative Lab
  {
    file: 'public/images/ai/ai-synesthesia.jpg',
    category: 'AI LAB 01',
    title: 'Synesthesia Neural Soundscapes',
    subtitle: 'Real-Time Audio Reactive Generative Synthesizer',
    accent: '#a855f7',
    bgStart: '#3b0764',
    bgEnd: '#1e1b4b',
    aspect: 'video'
  },
  {
    file: 'public/images/ai/ai-latent-fashion.jpg',
    category: 'AI LAB 02',
    title: 'Latent Space Avant-Garde',
    subtitle: 'AI Haute Couture & Non-Euclidean Physics',
    accent: '#ec4899',
    bgStart: '#4c0519',
    bgEnd: '#18181b',
    aspect: 'square'
  },
  {
    file: 'public/images/ai/ai-cinema-pipeline.jpg',
    category: 'AI LAB 03',
    title: 'Synthetic Cinema Pre-Vis',
    subtitle: 'AI-Enhanced Storyboard & Animatics Engine',
    accent: '#38bdf8',
    bgStart: '#082f49',
    bgEnd: '#0f172a',
    aspect: 'square'
  },

  // Award and Showreel
  {
    file: 'public/images/award-bolt.jpg',
    category: 'INTERNATIONAL AWARD 2024',
    title: 'Fast as Lightning — Usain Bolt',
    subtitle: 'Global Creative Motion Festival • Gold Winner',
    accent: '#eab308',
    bgStart: '#422006',
    bgEnd: '#18181b',
    aspect: 'video'
  },
  {
    file: 'public/images/showreel-thumb.jpg',
    category: 'MASTER SHOWREEL',
    title: 'Aravind Shaw — Motion Showreel',
    subtitle: '2025-2026 Commercial & Kinetic Direction',
    accent: '#38bdf8',
    bgStart: '#090d16',
    bgEnd: '#1e1b4b',
    aspect: 'video'
  }
];

function generateSvg(spec) {
  const isVertical = spec.aspect === 'vertical';
  const isSquare = spec.aspect === 'square';
  const width = isVertical ? 1080 : 1200;
  const height = isVertical ? 1920 : (isSquare ? 1200 : 675);
  
  const cardW = width - 80;
  const cardH = height - 80;
  const cx = width / 2;
  const cy = height / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${spec.bgStart}" />
      <stop offset="60%" stop-color="${spec.bgEnd}" />
      <stop offset="100%" stop-color="#05070c" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${spec.accent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${spec.accent}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />
  <circle cx="${cx}" cy="${cy - 40}" r="${width * 0.45}" fill="url(#glowGrad)" />

  <!-- Outer Frame -->
  <rect x="40" y="40" width="${cardW}" height="${cardH}" rx="28" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />

  <!-- Top Badge -->
  <g transform="translate(80, 90)">
    <rect x="0" y="0" width="220" height="38" rx="10" fill="${spec.accent}" fill-opacity="0.15" stroke="${spec.accent}" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="110" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="14" font-weight="800" fill="${spec.accent}" letter-spacing="2" text-anchor="middle">
      ${spec.category}
    </text>
  </g>

  <!-- Center Graphic Elements -->
  <g transform="translate(${cx}, ${cy - (isVertical ? 120 : 30)})" text-anchor="middle">
    <!-- Outer Glow Ring -->
    <circle cx="0" cy="0" r="${isVertical ? 180 : 120}" fill="none" stroke="${spec.accent}" stroke-opacity="0.2" stroke-width="3" stroke-dasharray="12 12" />
    <circle cx="0" cy="0" r="${isVertical ? 140 : 90}" fill="${spec.accent}" fill-opacity="0.1" stroke="${spec.accent}" stroke-opacity="0.5" stroke-width="2" />
    
    <!-- Central Play Symbol -->
    <circle cx="0" cy="0" r="${isVertical ? 70 : 45}" fill="${spec.accent}" fill-opacity="0.9" />
    <polygon points="-10,-16 16,0 -10,16" fill="#090d16" transform="scale(${isVertical ? 1.8 : 1.2})" />
  </g>

  <!-- Typography Content -->
  <g transform="translate(${isVertical ? cx : 80}, ${isVertical ? height - 380 : height - 120})" ${isVertical ? 'text-anchor="middle"' : ''}>
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="${isVertical ? 48 : 34}" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      ${spec.title}
    </text>
    ${spec.subtitle ? `
    <text x="0" y="${isVertical ? 46 : 32}" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="${isVertical ? 24 : 17}" font-weight="500" fill="#94a3b8">
      ${spec.subtitle}
    </text>` : ''}
  </g>

  <!-- Bottom Brand Mark -->
  <g transform="translate(${width - 80}, ${height - 60})" text-anchor="end">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#64748b" letter-spacing="2">
      ARAVIND SHAW · MOTION PORTFOLIO
    </text>
  </g>
</svg>`;
}

for (const spec of images) {
  const dir = path.dirname(spec.file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const svg = generateSvg(spec);
  fs.writeFileSync(spec.file, svg, 'utf-8');
  console.log(`Generated ${spec.file}`);
}
