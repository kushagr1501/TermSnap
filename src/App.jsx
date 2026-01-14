import { useState, useRef, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { 
  Download, 
  Terminal, 
  Palette, 
  SlidersHorizontal,
  Sparkles,
  Copy,
  Check,
  Zap,
  Share2,
  Film,
  Twitter,
  Link2,
  ChevronDown,
  Monitor,
  Tv,
  Newspaper,
  Flame,
  Gem
} from 'lucide-react'

import { WILD_THEMES, THEME_CATEGORIES, getThemesByCategory } from './themes/wildThemes'
import { 
  encodeSnapState, 
  decodeSnapState, 
  copyShareLink, 
  getTwitterShareUrl,
  getStateFromUrl 
} from './utils/shareableLinks'

// ═══════════════════════════════════════════════════════════════════════════
// ORIGINAL GRADIENTS (kept for backward compat)
// ═══════════════════════════════════════════════════════════════════════════
const BASIC_GRADIENTS = {
  cyberpunk: {
    name: 'Cyberpunk',
    class: 'bg-gradient-to-br from-fuchsia-600 via-purple-900 to-cyan-500',
    accent: '#f0abfc'
  },
  midnight: {
    name: 'Midnight',
    class: 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900',
    accent: '#a78bfa'
  },
  matrix: {
    name: 'Matrix',
    class: 'bg-gradient-to-br from-emerald-900 via-black to-green-800',
    accent: '#34d399'
  },
  sunset: {
    name: 'Sunset',
    class: 'bg-gradient-to-br from-orange-500 via-pink-600 to-purple-700',
    accent: '#fb923c'
  },
  ocean: {
    name: 'Ocean',
    class: 'bg-gradient-to-br from-blue-600 via-cyan-700 to-teal-800',
    accent: '#22d3ee'
  },
  noir: {
    name: 'Noir',
    class: 'bg-gradient-to-br from-zinc-900 via-neutral-950 to-zinc-800',
    accent: '#71717a'
  },
  aurora: {
    name: 'Aurora',
    class: 'bg-gradient-to-br from-violet-600 via-emerald-500 to-amber-400',
    accent: '#a78bfa'
  },
  blood: {
    name: 'Blood Moon',
    class: 'bg-gradient-to-br from-red-900 via-rose-950 to-black',
    accent: '#f87171'
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SYNTAX HIGHLIGHTING
// ═══════════════════════════════════════════════════════════════════════════
const highlightLine = (line, theme = null) => {
  const trimmed = line.trim().toLowerCase()
  
  // Use theme colors if provided
  const colors = theme ? {
    error: theme.errorColor,
    success: theme.successColor,
    warning: theme.warningColor,
    command: theme.commandColor,
    default: theme.textColor
  } : {
    error: '#ff6b6b',
    success: '#69db7c',
    warning: '#ffd43b',
    command: '#74c0fc',
    default: '#dee2e6'
  }
  
  if (/error|failed|fatal|exception|panic|crash/.test(trimmed)) {
    return { color: colors.error, bg: `${colors.error}15`, icon: '✗' }
  }
  if (/success|done|complete|passed|ok|✓|√/.test(trimmed)) {
    return { color: colors.success, bg: `${colors.success}15`, icon: '✓' }
  }
  if (/warn|warning|deprecat|notice/.test(trimmed)) {
    return { color: colors.warning, bg: `${colors.warning}10`, icon: '⚠' }
  }
  if (/^[>$#%λ→]/.test(line.trim()) || /^\[.*\]\$/.test(line.trim())) {
    return { color: colors.command, bg: 'transparent', icon: null, isCommand: true }
  }
  if (/info|log|debug|→/.test(trimmed)) {
    return { color: `${colors.default}99`, bg: 'transparent', icon: null }
  }
  if (/^(\/|\.\/|https?:)/.test(line.trim())) {
    return { color: '#da77f2', bg: 'transparent', icon: null }
  }
  
  return { color: colors.default, bg: 'transparent', icon: null }
}

// ═══════════════════════════════════════════════════════════════════════════
// TERMINAL WINDOW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
const TerminalWindow = ({ text, showLineNumbers, fontSize, theme, showCursor }) => {
  const lines = text.split('\n')
  const activeTheme = theme ? WILD_THEMES[theme] : null
  
  // Get effect classes
  const getEffectClasses = () => {
    if (!activeTheme?.effects) return ''
    return activeTheme.effects.map(e => `effect-${e}`).join(' ')
  }
  
  return (
    <div 
      className={`relative ${getEffectClasses()}`}
      style={{
        '--accent-color': activeTheme?.accent || '#f0abfc'
      }}
    >
      {activeTheme?.overlayText && (
        <div 
          className="absolute top-4 right-4 text-6xl font-bold opacity-10 pointer-events-none select-none"
          style={{ color: activeTheme.accent }}
        >
          {activeTheme.overlayText}
        </div>
      )}
      
      <div 
        className="flex items-center gap-2 px-4 py-3 border-b rounded-t-xl"
        style={{
          background: activeTheme?.terminalBg || 'rgba(24, 24, 27, 0.8)',
          borderColor: activeTheme ? `${activeTheme.accent}30` : 'rgba(63, 63, 70, 0.5)'
        }}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.5)]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div 
            className="flex items-center gap-2 px-3 py-1 rounded-md"
            style={{ background: activeTheme ? `${activeTheme.accent}15` : 'rgba(39, 39, 42, 0.6)' }}
          >
            <Terminal className="w-3.5 h-3.5" style={{ color: activeTheme?.accent || '#71717a' }} />
            <span 
              className="text-xs font-medium tracking-wide"
              style={{ color: activeTheme?.accent || '#a1a1aa' }}
            >
              {activeTheme?.name || 'terminal'}
            </span>
          </div>
        </div>
        <div className="w-16" />
      </div>
      
      <div 
        className="backdrop-blur-xl rounded-b-xl overflow-hidden"
        style={{ 
          background: activeTheme?.terminalBg || 'rgba(9, 9, 11, 0.9)',
          fontFamily: activeTheme?.font || "'JetBrains Mono', 'Fira Code', monospace"
        }}
      >
        <div className="p-5 overflow-x-auto">
          <pre className="m-0" style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}>
            {lines.map((line, i) => {
              const { color, bg, icon, isCommand } = highlightLine(line, activeTheme)
              const isLastLine = i === lines.length - 1
              return (
                <div 
                  key={i} 
                  className="flex items-start group transition-all duration-200"
                  style={{ backgroundColor: bg }}
                >
                  {showLineNumbers && (
                    <span 
                      className="select-none pr-4 w-10 text-right shrink-0 transition-colors"
                      style={{ 
                        fontSize: `${fontSize - 2}px`,
                        color: activeTheme ? `${activeTheme.textColor}40` : '#52525b'
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span style={{ color }} className="flex-1">
                    {isCommand && (
                      <span style={{ color: activeTheme?.successColor || '#34d399' }} className="mr-1">›</span>
                    )}
                    {icon && <span className="mr-2">{icon}</span>}
                    {line || '\u00A0'}
                    {showCursor && isLastLine && (
                      <span className="animate-pulse ml-0.5">█</span>
                    )}
                  </span>
                </div>
              )
            })}
          </pre>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARE MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
const ShareModal = ({ isOpen, onClose, state }) => {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    if (isOpen) {
      const url = `${window.location.origin}/#/s/${encodeSnapState(state)}`
      setShareUrl(url)
    }
  }, [isOpen, state])

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    const twitterUrl = getTwitterShareUrl(state, 'Check out my terminal screenshot made with TermSnap')
    window.open(twitterUrl, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share your Snap
        </h3>
        
        <div className="mb-4">
          <label className="text-xs text-zinc-500 mb-2 block">Shareable Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-300 font-mono truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleTwitterShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1d9bf0] hover:bg-[#1a8cd8] transition-colors font-medium"
          >
            <Twitter className="w-4 h-4" />
            Share on X
          </button>
        </div>

        <p className="mt-4 text-xs text-zinc-600 text-center">
          Anyone with the link can view and remix your snap
        </p>
      </div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════
// THEME SELECTOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
const ThemeSelector = ({ currentTheme, currentGradient, onThemeChange, onGradientChange }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  
  const categoryIcons = {
    anime: <Flame className="w-4 h-4" />,
    retro: <Tv className="w-4 h-4" />,
    neon: <Sparkles className="w-4 h-4" />,
    editorial: <Newspaper className="w-4 h-4" />,
    glass: <Gem className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-zinc-500 mb-2 block">Basic</label>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(BASIC_GRADIENTS).map(([key, { name, class: gradientClass }]) => (
            <button
              key={key}
              onClick={() => { onGradientChange(key); onThemeChange(null); }}
              className={`
                relative aspect-square rounded-xl overflow-hidden transition-all duration-200
                ${!currentTheme && currentGradient === key 
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-105' 
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
                }
              `}
              title={name}
            >
              <div className={`absolute inset-0 ${gradientClass}`} />
              {!currentTheme && currentGradient === key && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Check className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(THEME_CATEGORIES).map(([catKey, { name, icon }]) => (
        <div key={catKey}>
          <button
            onClick={() => setActiveCategory(activeCategory === catKey ? null : catKey)}
            className="flex items-center justify-between w-full text-xs text-zinc-500 mb-2 hover:text-zinc-300 transition-colors"
          >
            <span className="flex items-center gap-2">
              {categoryIcons[catKey]}
              {name} {icon}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${activeCategory === catKey ? 'rotate-180' : ''}`} />
          </button>
          
          {activeCategory === catKey && (
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(getThemesByCategory(catKey)).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => { onThemeChange(key); onGradientChange(null); }}
                  className={`
                    relative aspect-square rounded-xl overflow-hidden transition-all duration-200
                    ${currentTheme === key 
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-105' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }
                  `}
                  title={theme.name}
                >
                  <div className={`absolute inset-0 ${theme.gradient}`} />
                  <div 
                    className="absolute bottom-1 left-1 right-1 text-[8px] font-medium truncate text-center px-1 py-0.5 rounded bg-black/50"
                    style={{ color: theme.accent }}
                  >
                    {theme.name}
                  </div>
                  {currentTheme === key && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Check className="w-4 h-4 text-white drop-shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const captureRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  
  // State
  const [text, setText] = useState(`$ npm install termsnap
⠋ Resolving packages...
⠙ Fetching packages...
✓ Packages installed successfully

$ npm run build
→ Building for production...
→ Optimizing assets...

✓ Build complete in 2.4s

Warning: Bundle size exceeds 500kb

$ npm run deploy
✓ Deployed successfully!
→ https://termsnap.dev

Error: Rate limit exceeded`)

  const [gradient, setGradient] = useState('cyberpunk')
  const [theme, setTheme] = useState(null)
  const [padding, setPadding] = useState(48)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [fontSize, setFontSize] = useState(14)
  const [windowWidth, setWindowWidth] = useState(640)

  // Load from URL on mount
  useEffect(() => {
    const urlState = getStateFromUrl()
    if (urlState) {
      setText(urlState.text || text)
      setGradient(urlState.gradient || gradient)
      setTheme(urlState.theme || null)
      setPadding(urlState.padding || padding)
      setFontSize(urlState.fontSize || fontSize)
      setWindowWidth(urlState.windowWidth || windowWidth)
      setShowLineNumbers(urlState.showLineNumbers ?? showLineNumbers)
    }
  }, [])

  // Get current state for sharing
  const getCurrentState = () => ({
    text, gradient, theme, padding, fontSize, windowWidth, showLineNumbers
  })

  // Get active gradient/theme info
  const getActiveStyle = () => {
    if (theme && WILD_THEMES[theme]) {
      return {
        gradient: WILD_THEMES[theme].gradient,
        accent: WILD_THEMES[theme].accent,
        border: WILD_THEMES[theme].terminalBorder
      }
    }
    return {
      gradient: BASIC_GRADIENTS[gradient]?.class || BASIC_GRADIENTS.cyberpunk.class,
      accent: BASIC_GRADIENTS[gradient]?.accent || '#f0abfc',
      border: '1px solid rgba(255,255,255,0.1)'
    }
  }

  const activeStyle = getActiveStyle()

  // Export PNG handler
  const handleExport = useCallback(async () => {
    if (!captureRef.current) return
    
    setExporting(true)
    try {
      const dataUrl = await toPng(captureRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: null,
      })
      
      const link = document.createElement('a')
      link.download = `termsnap-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    }
    setExporting(false)
  }, [])

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    if (!captureRef.current) return
    
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 3 })
      const blob = await (await fetch(dataUrl)).blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }, [])



  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[128px] opacity-20"
          style={{ background: activeStyle.accent }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[128px] opacity-15"
          style={{ background: activeStyle.accent }}
        />
      </div>

      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-10">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${activeStyle.accent}40, transparent)` }}
            >
              <Terminal className="w-6 h-6" style={{ color: activeStyle.accent }} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                TermSnap
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-medium">v1</span>
              </h1>
              <p className="text-xs text-zinc-500">Beautiful terminal screenshots</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50 transition-all text-sm font-medium"
            >
              <Share2 className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-300 hidden sm:inline">Share</span>
            </button>

            
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50 transition-all text-sm font-medium"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-zinc-400" />
              )}
            </button>
            
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
              style={{ 
                background: `linear-gradient(135deg, ${activeStyle.accent}, ${activeStyle.accent}99)`,
                color: '#000'
              }}
            >
              {exporting ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-[340px,1fr] gap-8">
          <aside className="space-y-6">
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                <Terminal className="w-4 h-4 text-zinc-500" />
                Terminal Output
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your terminal output here..."
                className="w-full h-48 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm font-mono text-zinc-300 placeholder-zinc-600 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
              />
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                <Palette className="w-4 h-4 text-zinc-500" />
                Theme
              </label>
              <ThemeSelector
                currentTheme={theme}
                currentGradient={gradient}
                onThemeChange={setTheme}
                onGradientChange={setGradient}
              />
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm space-y-5">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
                Settings
              </label>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Padding</span>
                  <span className="text-zinc-500 font-mono">{padding}px</span>
                </div>
                <input
                  type="range" min="16" max="96" value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-zinc-800"
                  style={{ accentColor: activeStyle.accent }}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Font Size</span>
                  <span className="text-zinc-500 font-mono">{fontSize}px</span>
                </div>
                <input
                  type="range" min="10" max="20" value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-zinc-800"
                  style={{ accentColor: activeStyle.accent }}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Width</span>
                  <span className="text-zinc-500 font-mono">{windowWidth}px</span>
                </div>
                <input
                  type="range" min="400" max="900" value={windowWidth}
                  onChange={(e) => setWindowWidth(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-zinc-800"
                  style={{ accentColor: activeStyle.accent }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Line Numbers</span>
                <button
                  onClick={() => setShowLineNumbers(!showLineNumbers)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${showLineNumbers ? 'bg-emerald-500/80' : 'bg-zinc-700'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg transition-all duration-300 ${showLineNumbers ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </aside>

          <main>
            <div className="sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-500">Preview</span>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Zap className="w-3.5 h-3.5" />
                  <span>3x retina</span>
                </div>
              </div>
              
              <div 
                ref={captureRef}
                className={`${activeStyle.gradient} rounded-2xl overflow-hidden shadow-2xl`}
                style={{ padding: `${padding}px` }}
              >
                <div 
                  className="rounded-xl overflow-hidden shadow-2xl"
                  style={{ 
                    maxWidth: `${windowWidth}px`,
                    margin: '0 auto',
                    border: activeStyle.border,
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px -20px ${activeStyle.accent}40`
                  }}
                >
                  <TerminalWindow 
                    text={text} 
                    showLineNumbers={showLineNumbers}
                    fontSize={fontSize}
                    theme={theme}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-600">
                <Terminal className="w-3 h-3" />
                <span>Made with TermSnap</span>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        state={getCurrentState()} 
      />
      
    </div>
  )
}
