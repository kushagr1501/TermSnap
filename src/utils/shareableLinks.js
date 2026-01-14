/**
 * Shareable Links Utility
 * Encodes terminal state into URL-safe strings for sharing
 * Uses native base64 encoding (no external deps)
 */

/**
 * Encode string to URL-safe base64
 */
const encodeBase64 = (str) => {
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode('0x' + p1)
    )).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch (e) {
    console.error('Encode error:', e)
    return ''
  }
}

/**
 * Decode URL-safe base64 to string
 */
const decodeBase64 = (str) => {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    return decodeURIComponent(atob(padded).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''))
  } catch (e) {
    console.error('Decode error:', e)
    return ''
  }
}

/**
 * Encode snap state to shareable string
 */
export const encodeSnapState = (state) => {
  const { text, gradient, padding, fontSize, windowWidth, showLineNumbers, theme } = state
  
  const payload = {
    t: text,
    g: gradient,
    p: padding,
    f: fontSize,
    w: windowWidth,
    l: showLineNumbers ? 1 : 0,
    th: theme || null
  }

  return encodeBase64(JSON.stringify(payload))
}

/**
 * Decode snap state from URL string
 */
export const decodeSnapState = (encoded) => {
  try {
    const json = decodeBase64(encoded)
    const payload = JSON.parse(json)
    
    return {
      text: payload.t || '',
      gradient: payload.g || 'cyberpunk',
      padding: payload.p || 48,
      fontSize: payload.f || 14,
      windowWidth: payload.w || 640,
      showLineNumbers: payload.l === 1,
      theme: payload.th || null
    }
  } catch (e) {
    console.error('Failed to decode snap state:', e)
    return null
  }
}

/**
 * Generate shareable URL
 */
export const generateShareUrl = (state, baseUrl = window.location.origin) => {
  const encoded = encodeSnapState(state)
  return `${baseUrl}/#/s/${encoded}`
}

/**
 * Parse share URL and extract state
 */
export const parseShareUrl = (url) => {
  const match = url.match(/\/s\/([^/?]+)/)
  if (!match) return null
  return decodeSnapState(match[1])
}

/**
 * Get state from current URL (for initial load)
 */
export const getStateFromUrl = () => {
  const hash = window.location.hash
  if (hash.startsWith('#/s/')) {
    const encoded = hash.slice(4)
    return decodeSnapState(encoded)
  }
  
  const path = window.location.pathname
  if (path.startsWith('/s/')) {
    const encoded = path.slice(3)
    return decodeSnapState(encoded)
  }
  
  return null
}

/**
 * Update URL without page reload (for SPA)
 */
export const updateUrlWithState = (state) => {
  const encoded = encodeSnapState(state)
  window.location.hash = `/s/${encoded}`
}

/**
 * Copy share link to clipboard
 */
export const copyShareLink = async (state) => {
  const url = generateShareUrl(state)
  await navigator.clipboard.writeText(url)
  return url
}

/**
 * Generate Twitter/X share intent URL
 */
export const getTwitterShareUrl = (state, customText = '') => {
  const snapUrl = generateShareUrl(state)
  const text = customText || '✨ Check out my terminal screenshot made with TermSnap'
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(snapUrl)}`
}

/**
 * Short hash generator for cleaner URLs (optional backend integration)
 */
export const generateShortId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}