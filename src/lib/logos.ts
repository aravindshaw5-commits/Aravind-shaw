// Clean vector brand logos designed at exact 1080 x 1350 (4:5 portrait) Instagram format

export const samamAiLogo = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <rect width="1080" height="1350" fill="#090d16"/>
  
  <!-- Subtle background grid -->
  <defs>
    <pattern id="grid" width="45" height="45" patternUnits="userSpaceOnUse">
      <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#1e293b" stroke-width="1"/>
    </pattern>
    <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="45%" r="40%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1350" fill="url(#grid)" opacity="0.3"/>
  <rect width="1080" height="1350" fill="url(#halo)"/>
  
  <!-- Border Frame -->
  <rect x="40" y="40" width="1000" height="1270" rx="24" fill="none" stroke="#1e293b" stroke-width="2"/>
  <rect x="52" y="52" width="976" height="1246" rx="16" fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="8,6" opacity="0.4"/>

  <!-- Top Metadata Stamp -->
  <g transform="translate(80, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#64748b">
      01 · BRAND IDENTITY SYSTEM
    </text>
  </g>
  <g transform="translate(1000, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#10b981" text-anchor="end">
      1080 × 1350 · 4:5
    </text>
  </g>

  <!-- Central Emblem & Wordmark -->
  <g transform="translate(540, 640)">
    <!-- Tech Node Icon Symbol -->
    <g transform="translate(0, -140) scale(1.6)">
      <!-- Outer Hex/Diamond Node -->
      <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#0f172a" stroke="#334155" stroke-width="2.5"/>
      <polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" fill="#1e293b" stroke="#10b981" stroke-width="2.2"/>
      
      <!-- Core Neural Node -->
      <circle cx="0" cy="0" r="16" fill="url(#aiGrad)"/>
      <circle cx="0" cy="0" r="6" fill="#ffffff"/>
      
      <!-- Connected Node Rays -->
      <line x1="0" y1="-46" x2="0" y2="-16" stroke="#34d399" stroke-width="2.5" stroke-dasharray="4,2"/>
      <line x1="0" y1="16" x2="0" y2="46" stroke="#34d399" stroke-width="2.5" stroke-dasharray="4,2"/>
      <line x1="-40" y1="0" x2="-16" y2="0" stroke="#34d399" stroke-width="2.5" stroke-dasharray="4,2"/>
      <line x1="16" y1="0" x2="40" y2="0" stroke="#34d399" stroke-width="2.5" stroke-dasharray="4,2"/>
    </g>

    <!-- Wordmark -->
    <text x="-48" y="70" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="82" font-weight="900" letter-spacing="4" fill="#ffffff" text-anchor="middle">
      SAMAM
    </text>
    <text x="180" y="70" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="82" font-weight="800" fill="#10b981">
      .ai
    </text>

    <!-- Tagline / Descriptor -->
    <text x="0" y="130" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="17" font-weight="700" letter-spacing="8" fill="#94a3b8" text-anchor="middle">
      AI-POWERED EDUCATION PLATFORM
    </text>

    <!-- Category Pill -->
    <g transform="translate(0, 180)">
      <rect x="-170" y="-18" width="340" height="36" rx="18" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="0" y="5" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#cbd5e1" text-anchor="middle">
        LOGO & VISUAL IDENTITY
      </text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(540, 1260)">
    <text font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#475569" text-anchor="middle">
      VISUAL DIRECTION & DESIGN BY ARAVIND SHAW
    </text>
  </g>
</svg>
`)}`;

export const iitMadrasLcLabLogo = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <rect width="1080" height="1350" fill="#070e20"/>
  
  <defs>
    <linearGradient id="iitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <radialGradient id="iitHalo" cx="50%" cy="45%" r="40%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1350" fill="url(#iitHalo)"/>
  
  <!-- Border Frame -->
  <rect x="40" y="40" width="1000" height="1270" rx="24" fill="none" stroke="#1e293b" stroke-width="2"/>
  <rect x="52" y="52" width="976" height="1246" rx="16" fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="8,6" opacity="0.4"/>

  <!-- Top Metadata Stamp -->
  <g transform="translate(80, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#64748b">
      02 · INSTITUTIONAL IDENTITY
    </text>
  </g>
  <g transform="translate(1000, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#38bdf8" text-anchor="end">
      1080 × 1350 · 4:5
    </text>
  </g>

  <g transform="translate(540, 640)">
    <!-- Emblem Box -->
    <g transform="translate(0, -140)">
      <!-- Interlocking L and C Monogram -->
      <rect x="-90" y="-80" width="180" height="160" rx="28" fill="#0f172a" stroke="#334155" stroke-width="3"/>
      
      <!-- 'L' Shape -->
      <path d="M -44 -44 L -44 40 L -4 40" fill="none" stroke="#38bdf8" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- 'C' Shape -->
      <path d="M 40 -28 C 34 -44 14 -44 0 -34 C -12 -22 -12 22 0 34 C 14 44 34 44 40 28" fill="none" stroke="#60a5fa" stroke-width="13" stroke-linecap="round"/>
      
      <!-- Connection node -->
      <circle cx="-4" cy="40" r="6" fill="#38bdf8"/>
    </g>

    <!-- Lab Name -->
    <text x="0" y="60" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="58" font-weight="900" letter-spacing="4" fill="#ffffff" text-anchor="middle">
      IIT MADRAS
    </text>
    
    <text x="0" y="120" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="40" font-weight="800" letter-spacing="8" fill="#38bdf8" text-anchor="middle">
      LC LAB
    </text>

    <text x="0" y="170" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" letter-spacing="6" fill="#94a3b8" text-anchor="middle">
      LANGUAGE & COMPUTATION LAB
    </text>

    <!-- Category Pill -->
    <g transform="translate(0, 220)">
      <rect x="-160" y="-18" width="320" height="36" rx="18" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="0" y="5" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#cbd5e1" text-anchor="middle">
        INSTITUTIONAL IDENTITY
      </text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(540, 1260)">
    <text font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#475569" text-anchor="middle">
      DEPARTMENT OF CSE · IIT MADRAS
    </text>
  </g>
</svg>
`)}`;

export const beyondSpellingMistakeLogo = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <rect width="1080" height="1350" fill="#111113"/>
  
  <defs>
    <radialGradient id="btsmHalo" cx="50%" cy="45%" r="40%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1350" fill="url(#btsmHalo)"/>

  <!-- Border Frame -->
  <rect x="40" y="40" width="1000" height="1270" rx="24" fill="none" stroke="#27272a" stroke-width="2"/>
  <rect x="52" y="52" width="976" height="1246" rx="16" fill="none" stroke="#3f3f46" stroke-width="1" stroke-dasharray="8,6" opacity="0.4"/>

  <!-- Top Metadata Stamp -->
  <g transform="translate(80, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#71717a">
      03 · CREATOR BRANDING
    </text>
  </g>
  <g transform="translate(1000, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#f43f5e" text-anchor="end">
      1080 × 1350 · 4:5
    </text>
  </g>
  
  <g transform="translate(540, 630)">
    <!-- Stylized correction pen & strikethrough mark -->
    <g transform="translate(0, -140)">
      <rect x="-80" y="-80" width="160" height="160" rx="30" fill="#1c1917" stroke="#3f3f46" stroke-width="2.5"/>
      
      <!-- Letter BTSM Icon & Edit Stroke -->
      <text x="0" y="14" font-family="Inter, monospace, sans-serif" font-size="54" font-weight="900" fill="#f43f5e" text-anchor="middle">
        BTSM
      </text>
      <!-- Proofreader caret & stroke -->
      <path d="M -45 34 L 45 34" stroke="#e11d48" stroke-width="5" stroke-linecap="round"/>
      <path d="M -12 48 L 0 36 L 12 48" fill="none" stroke="#f43f5e" stroke-width="4" stroke-linecap="round"/>
    </g>

    <text x="0" y="60" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="3" fill="#ffffff" text-anchor="middle">
      BEYOND THE SPELLING MISTAKE
    </text>

    <!-- Subtitle with influencer mention -->
    <text x="0" y="115" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" letter-spacing="4" fill="#fb7185" text-anchor="middle">
      ARUN FERNANDES
    </text>

    <text x="0" y="165" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" letter-spacing="5" fill="#a1a1aa" text-anchor="middle">
      CREATOR BRANDING & IDENTITY
    </text>

    <!-- Category Pill -->
    <g transform="translate(0, 220)">
      <rect x="-150" y="-18" width="300" height="36" rx="18" fill="#27272a" stroke="#3f3f46" stroke-width="1"/>
      <text x="0" y="5" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#e4e4e7" text-anchor="middle">
        LOGO & CREATOR IDENTITY
      </text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(540, 1260)">
    <text font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#52525b" text-anchor="middle">
      IDENTITY CREATED FOR ARUN FERNANDES
    </text>
  </g>
</svg>
`)}`;

export const femiluxLogo = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <rect width="1080" height="1350" fill="#141110"/>
  
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
    <radialGradient id="goldHalo" cx="50%" cy="45%" r="40%">
      <stop offset="0%" stop-color="#eab308" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ca8a04" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1350" fill="url(#goldHalo)"/>

  <!-- Border Frame -->
  <rect x="40" y="40" width="1000" height="1270" rx="24" fill="none" stroke="#292524" stroke-width="2"/>
  <rect x="52" y="52" width="976" height="1246" rx="16" fill="none" stroke="#44403c" stroke-width="1" stroke-dasharray="8,6" opacity="0.4"/>

  <!-- Top Metadata Stamp -->
  <g transform="translate(80, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#78716c">
      04 · BEAUTY BRAND IDENTITY
    </text>
  </g>
  <g transform="translate(1000, 100)">
    <text font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#eab308" text-anchor="end">
      1080 × 1350 · 4:5
    </text>
  </g>

  <g transform="translate(540, 630)">
    <!-- Botanical / Beauty Icon -->
    <g transform="translate(0, -140)">
      <circle cx="0" cy="0" r="75" fill="#201c1a" stroke="#44403c" stroke-width="2.5"/>
      <!-- Delicate floral leaf motif -->
      <path d="M 0 -42 C 28 -22 34 16 0 42 C -34 16 -28 -22 0 -42 Z" fill="none" stroke="url(#goldGrad)" stroke-width="4.5"/>
      <path d="M 0 -42 L 0 42" stroke="url(#goldGrad)" stroke-width="3"/>
      <circle cx="0" cy="-9" r="4.5" fill="#fef08a"/>
    </g>

    <!-- Serif Luxury Logotype -->
    <text x="0" y="70" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="700" letter-spacing="12" fill="url(#goldGrad)" text-anchor="middle">
      FEMILUX
    </text>

    <!-- Descriptor -->
    <text x="0" y="125" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" letter-spacing="10" fill="#e7e5e4" text-anchor="middle">
      BEAUTY PARLOUR
    </text>

    <text x="0" y="170" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="5" fill="#a8a29e" text-anchor="middle">
      BRAND IDENTITY & VISUAL DESIGN
    </text>

    <!-- Category Pill -->
    <g transform="translate(0, 220)">
      <rect x="-150" y="-18" width="300" height="36" rx="18" fill="#292524" stroke="#44403c" stroke-width="1"/>
      <text x="0" y="5" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#f5f5f4" text-anchor="middle">
        BEAUTY BRAND IDENTITY
      </text>
    </g>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(540, 1260)">
    <text font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" letter-spacing="4" fill="#78716c" text-anchor="middle">
      FEMILUX BEAUTY PARLOUR BRANDING
    </text>
  </g>
</svg>
`)}`;
