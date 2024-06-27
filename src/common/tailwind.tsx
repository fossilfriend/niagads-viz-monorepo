import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const TAILWIND_CONFIG = resolveConfig(tailwindConfig)
export const TAILWIND_THEME = TAILWIND_CONFIG.theme
const TAILWIND_COLORS = Object.keys(TAILWIND_THEME.colors)

export const TAILWINDCSS_CLASSES = {
    info_link: "underline decoration-dashed decoration-blue-500 underline-offset-4" 
}