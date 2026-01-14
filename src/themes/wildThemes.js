/**
 * WILD THEMES - Anime, CRT, Neon, Editorial
 * Each theme includes gradient, frame style, effects, and overlays
 */

export const WILD_THEMES = {
  // ═══════════════════════════════════════════════════════════════
  // ANIME THEMES
  // ═══════════════════════════════════════════════════════════════
  
  evangelion: {
    name: 'Evangelion',
    category: 'anime',
    gradient: 'bg-gradient-to-br from-orange-600 via-red-900 to-black',
    accent: '#ff6b00',
    terminalBg: 'rgba(0, 0, 0, 0.95)',
    terminalBorder: '2px solid #ff6b00',
    textColor: '#ff9940',
    successColor: '#00ff00',
    errorColor: '#ff0000',
    warningColor: '#ffcc00',
    commandColor: '#ff6b00',
    frameStyle: 'evangelion',
    effects: ['scanlines', 'warning-border'],
    overlayText: '警告',
    font: 'JetBrains Mono'
  },

  ghostInShell: {
    name: 'Ghost in Shell',
    category: 'anime',
    gradient: 'bg-gradient-to-br from-teal-900 via-cyan-950 to-slate-950',
    accent: '#2dd4bf',
    terminalBg: 'rgba(0, 20, 20, 0.85)',
    terminalBorder: '1px solid rgba(45, 212, 191, 0.3)',
    textColor: '#5eead4',
    successColor: '#34d399',
    errorColor: '#f87171',
    warningColor: '#fbbf24',
    commandColor: '#22d3ee',
    frameStyle: 'hexagonal',
    effects: ['matrix-rain', 'glow'],
    overlayText: 'システム',
    font: 'JetBrains Mono'
  },

  akira: {
    name: 'Akira',
    category: 'anime',
    gradient: 'bg-gradient-to-br from-red-700 via-red-950 to-black',
    accent: '#dc2626',
    terminalBg: 'rgba(10, 0, 0, 0.9)',
    terminalBorder: '2px solid #dc2626',
    textColor: '#fca5a5',
    successColor: '#4ade80',
    errorColor: '#ff0000',
    warningColor: '#fbbf24',
    commandColor: '#f87171',
    frameStyle: 'glitch',
    effects: ['glitch', 'noise'],
    overlayText: 'ネオ東京',
    font: 'JetBrains Mono'
  },

  cyberpunkEdgerunners: {
    name: 'Edgerunners',
    category: 'anime',
    gradient: 'bg-gradient-to-br from-yellow-500 via-pink-600 to-cyan-500',
    accent: '#facc15',
    terminalBg: 'rgba(0, 0, 0, 0.9)',
    terminalBorder: '2px solid #facc15',
    textColor: '#fef08a',
    successColor: '#22d3ee',
    errorColor: '#f43f5e',
    warningColor: '#facc15',
    commandColor: '#e879f9',
    frameStyle: 'chrome',
    effects: ['glitch', 'chromatic-aberration'],
    overlayText: 'BREACH',
    font: 'JetBrains Mono'
  },

  serialExperimentsLain: {
    name: 'Lain',
    category: 'anime',
    gradient: 'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950',
    accent: '#6b7280',
    terminalBg: 'rgba(0, 0, 0, 0.98)',
    terminalBorder: '1px solid #374151',
    textColor: '#9ca3af',
    successColor: '#6ee7b7',
    errorColor: '#f87171',
    warningColor: '#fcd34d',
    commandColor: '#60a5fa',
    frameStyle: 'minimal',
    effects: ['static', 'crt-curve'],
    overlayText: 'WIRED',
    font: 'JetBrains Mono'
  },

  steinsGate: {
    name: 'Steins;Gate',
    category: 'anime',
    gradient: 'bg-gradient-to-br from-amber-900 via-yellow-950 to-stone-950',
    accent: '#d97706',
    terminalBg: 'rgba(20, 10, 0, 0.95)',
    terminalBorder: '1px solid #92400e',
    textColor: '#fbbf24',
    successColor: '#84cc16',
    errorColor: '#ef4444',
    warningColor: '#f59e0b',
    commandColor: '#d97706',
    frameStyle: 'retro-pc',
    effects: ['amber-glow', 'scanlines'],
    overlayText: 'El Psy Kongroo',
    font: 'JetBrains Mono'
  },

  // ═══════════════════════════════════════════════════════════════
  // CRT / RETRO THEMES
  // ═══════════════════════════════════════════════════════════════

  crtGreen: {
    name: 'CRT Green',
    category: 'retro',
    gradient: 'bg-gradient-to-br from-black via-green-950 to-black',
    accent: '#22c55e',
    terminalBg: 'rgba(0, 10, 0, 0.95)',
    terminalBorder: '3px solid #166534',
    textColor: '#4ade80',
    successColor: '#22c55e',
    errorColor: '#86efac',
    warningColor: '#a3e635',
    commandColor: '#4ade80',
    frameStyle: 'crt-monitor',
    effects: ['scanlines', 'crt-curve', 'flicker', 'glow'],
    overlayText: null,
    font: 'VT323, monospace'
  },

  crtAmber: {
    name: 'CRT Amber',
    category: 'retro',
    gradient: 'bg-gradient-to-br from-black via-amber-950 to-black',
    accent: '#f59e0b',
    terminalBg: 'rgba(10, 5, 0, 0.95)',
    terminalBorder: '3px solid #92400e',
    textColor: '#fbbf24',
    successColor: '#fcd34d',
    errorColor: '#fbbf24',
    warningColor: '#f59e0b',
    commandColor: '#fbbf24',
    frameStyle: 'crt-monitor',
    effects: ['scanlines', 'crt-curve', 'flicker', 'glow'],
    overlayText: null,
    font: 'VT323, monospace'
  },

  commodore64: {
    name: 'C64',
    category: 'retro',
    gradient: 'bg-[#4040e0]',
    accent: '#a0a0ff',
    terminalBg: '#4040e0',
    terminalBorder: '8px solid #a0a0ff',
    textColor: '#a0a0ff',
    successColor: '#a0a0ff',
    errorColor: '#a0a0ff',
    warningColor: '#a0a0ff',
    commandColor: '#ffffff',
    frameStyle: 'c64',
    effects: ['pixelated'],
    overlayText: 'READY.',
    font: '"C64 Pro", monospace'
  },

  msdos: {
    name: 'MS-DOS',
    category: 'retro',
    gradient: 'bg-[#0000aa]',
    accent: '#aaaaaa',
    terminalBg: '#0000aa',
    terminalBorder: 'none',
    textColor: '#aaaaaa',
    successColor: '#55ff55',
    errorColor: '#ff5555',
    warningColor: '#ffff55',
    commandColor: '#ffffff',
    frameStyle: 'dos',
    effects: [],
    overlayText: 'C:\\>',
    font: '"Perfect DOS VGA", monospace'
  },

  // ═══════════════════════════════════════════════════════════════
  // NEON / SYNTHWAVE THEMES
  // ═══════════════════════════════════════════════════════════════

  synthwave: {
    name: 'Synthwave',
    category: 'neon',
    gradient: 'bg-gradient-to-b from-purple-900 via-fuchsia-900 to-slate-950',
    accent: '#e879f9',
    terminalBg: 'rgba(20, 0, 30, 0.85)',
    terminalBorder: '2px solid #e879f9',
    textColor: '#f0abfc',
    successColor: '#22d3ee',
    errorColor: '#fb7185',
    warningColor: '#facc15',
    commandColor: '#e879f9',
    frameStyle: 'neon',
    effects: ['neon-glow', 'grid-floor'],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  vaporwave: {
    name: 'Vaporwave',
    category: 'neon',
    gradient: 'bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400',
    accent: '#f472b6',
    terminalBg: 'rgba(0, 0, 0, 0.7)',
    terminalBorder: '3px solid #f472b6',
    textColor: '#fbcfe8',
    successColor: '#67e8f9',
    errorColor: '#fda4af',
    warningColor: '#fde047',
    commandColor: '#c084fc',
    frameStyle: 'vaporwave',
    effects: ['chromatic-aberration', 'noise'],
    overlayText: 'アスセティック',
    font: 'JetBrains Mono'
  },

  neonNoir: {
    name: 'Neon Noir',
    category: 'neon',
    gradient: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    accent: '#f43f5e',
    terminalBg: 'rgba(0, 0, 0, 0.9)',
    terminalBorder: '1px solid #f43f5e',
    textColor: '#fda4af',
    successColor: '#4ade80',
    errorColor: '#f43f5e',
    warningColor: '#fbbf24',
    commandColor: '#fb7185',
    frameStyle: 'minimal',
    effects: ['neon-glow'],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  hotlineMiami: {
    name: 'Hotline Miami',
    category: 'neon',
    gradient: 'bg-gradient-to-br from-fuchsia-600 via-violet-700 to-cyan-500',
    accent: '#f0abfc',
    terminalBg: 'rgba(0, 0, 0, 0.85)',
    terminalBorder: '3px solid #f0abfc',
    textColor: '#fdf4ff',
    successColor: '#2dd4bf',
    errorColor: '#fb923c',
    warningColor: '#facc15',
    commandColor: '#e879f9',
    frameStyle: 'miami',
    effects: ['noise', 'vhs'],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  // ═══════════════════════════════════════════════════════════════
  // EDITORIAL / MINIMAL THEMES
  // ═══════════════════════════════════════════════════════════════

  newspaper: {
    name: 'Newspaper',
    category: 'editorial',
    gradient: 'bg-[#f5f5dc]',
    accent: '#1a1a1a',
    terminalBg: '#ffffff',
    terminalBorder: '2px solid #1a1a1a',
    textColor: '#1a1a1a',
    successColor: '#166534',
    errorColor: '#991b1b',
    warningColor: '#854d0e',
    commandColor: '#1e3a5f',
    frameStyle: 'newspaper',
    effects: ['paper-texture', 'halftone'],
    overlayText: null,
    font: '"IBM Plex Mono", monospace'
  },

  blueprint: {
    name: 'Blueprint',
    category: 'editorial',
    gradient: 'bg-[#1e3a5f]',
    accent: '#ffffff',
    terminalBg: 'rgba(30, 58, 95, 0.95)',
    terminalBorder: '1px solid rgba(255,255,255,0.3)',
    textColor: '#e0f2fe',
    successColor: '#7dd3fc',
    errorColor: '#fda4af',
    warningColor: '#fde047',
    commandColor: '#ffffff',
    frameStyle: 'blueprint',
    effects: ['grid-overlay'],
    overlayText: null,
    font: '"Architects Daughter", cursive'
  },

  terminal: {
    name: 'Pure Terminal',
    category: 'editorial',
    gradient: 'bg-black',
    accent: '#ffffff',
    terminalBg: '#000000',
    terminalBorder: 'none',
    textColor: '#ffffff',
    successColor: '#22c55e',
    errorColor: '#ef4444',
    warningColor: '#eab308',
    commandColor: '#3b82f6',
    frameStyle: 'none',
    effects: [],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  notion: {
    name: 'Notion',
    category: 'editorial',
    gradient: 'bg-[#ffffff]',
    accent: '#37352f',
    terminalBg: '#f7f6f3',
    terminalBorder: '1px solid #e3e2de',
    textColor: '#37352f',
    successColor: '#0f7b6c',
    errorColor: '#e03e3e',
    warningColor: '#dfab01',
    commandColor: '#0b6e99',
    frameStyle: 'notion',
    effects: [],
    overlayText: null,
    font: '"SFMono-Regular", monospace'
  },

  // ═══════════════════════════════════════════════════════════════
  // GLASS / GLASSMORPHISM THEMES
  // ═══════════════════════════════════════════════════════════════

  glass: {
    name: 'Glass',
    category: 'glass',
    gradient: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    accent: '#ffffff',
    terminalBg: 'rgba(255, 255, 255, 0.08)',
    terminalBorder: '1px solid rgba(255, 255, 255, 0.15)',
    textColor: '#ffffff',
    successColor: '#4ade80',
    errorColor: '#f87171',
    warningColor: '#fbbf24',
    commandColor: '#60a5fa',
    frameStyle: 'glass',
    effects: ['glass-blur', 'glass-shine'],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  glassDark: {
    name: 'Glass Dark',
    category: 'glass',
    gradient: 'bg-gradient-to-br from-gray-950 via-zinc-900 to-black',
    accent: '#a1a1aa',
    terminalBg: 'rgba(0, 0, 0, 0.4)',
    terminalBorder: '1px solid rgba(255, 255, 255, 0.1)',
    textColor: '#e4e4e7',
    successColor: '#4ade80',
    errorColor: '#f87171',
    warningColor: '#fbbf24',
    commandColor: '#60a5fa',
    frameStyle: 'glass',
    effects: ['glass-blur'],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  glassAurora: {
    name: 'Glass Aurora',
    category: 'glass',
    gradient: 'bg-gradient-to-br from-emerald-500 via-cyan-600 to-blue-700',
    accent: '#ffffff',
    terminalBg: 'rgba(0, 0, 0, 0.25)',
    terminalBorder: '1px solid rgba(255, 255, 255, 0.2)',
    textColor: '#ffffff',
    successColor: '#6ee7b7',
    errorColor: '#fca5a5',
    warningColor: '#fde047',
    commandColor: '#ffffff',
    frameStyle: 'glass',
    effects: ['glass-blur', 'glass-shine'],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  glassSunset: {
    name: 'Glass Sunset',
    category: 'glass',
    gradient: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
    accent: '#ffffff',
    terminalBg: 'rgba(0, 0, 0, 0.3)',
    terminalBorder: '1px solid rgba(255, 255, 255, 0.25)',
    textColor: '#ffffff',
    successColor: '#86efac',
    errorColor: '#fecaca',
    warningColor: '#fef08a',
    commandColor: '#e0f2fe',
    frameStyle: 'glass',
    effects: ['glass-blur', 'glass-shine'],
    overlayText: null,
    font: 'JetBrains Mono'
  },

  glassMint: {
    name: 'Glass Mint',
    category: 'glass',
    gradient: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-green-600',
    accent: '#ffffff',
    terminalBg: 'rgba(0, 0, 0, 0.2)',
    terminalBorder: '1px solid rgba(255, 255, 255, 0.3)',
    textColor: '#ffffff',
    successColor: '#bbf7d0',
    errorColor: '#fecaca',
    warningColor: '#fef9c3',
    commandColor: '#e0f2fe',
    frameStyle: 'glass',
    effects: ['glass-blur', 'glass-shine'],
    overlayText: null,
    font: 'JetBrains Mono'
  }
}

// Category labels
export const THEME_CATEGORIES = {
  anime: { name: 'Anime', icon: '' },
  retro: { name: 'Retro', icon: '' },
  neon: { name: 'Neon', icon: '' },
  editorial: { name: 'Editorial', icon: '' },
  glass: { name: 'Glass', icon: '' }
}

// Get themes by category
export const getThemesByCategory = (category) => {
  return Object.entries(WILD_THEMES)
    .filter(([_, theme]) => theme.category === category)
    .reduce((acc, [key, theme]) => ({ ...acc, [key]: theme }), {})
}

// Get all theme keys
export const getAllThemeKeys = () => Object.keys(WILD_THEMES)
