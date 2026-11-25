// ten forty five Tailwind preset. Usage: module.exports = { presets: [require('./brand-kit/tokens/tailwind.preset.js')] }
module.exports = {
  theme: {
    extend: {
      colors: {
        midnight: '#142C3B', steel: '#52788F', mist: '#A9BDC9', cloud: '#EDF2F5',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        accent: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: { wordmark: '-0.045em', display: '-0.04em', heading: '-0.025em', label: '0.08em' },
      fontSize: {
        display: ['76px', { lineHeight: '1', letterSpacing: '-0.045em' }],
        h1: ['56px', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
        h2: ['40px', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        h3: ['28px', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        label: ['11px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      maxWidth: { page: '1280px' },
      borderRadius: { DEFAULT: '0', none: '0' },
    },
  },
};
