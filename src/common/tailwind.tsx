import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const TAILWIND_CONFIG = resolveConfig(tailwindConfig)
export const TAILWIND_THEME = TAILWIND_CONFIG.theme
const TAILWIND_COLORS = Object.keys(TAILWIND_THEME.colors)
