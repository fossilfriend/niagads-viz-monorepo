import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const TAILWIND_CONFIG = resolveConfig(tailwindConfig)
export const TAILWIND_THEME = TAILWIND_CONFIG.theme
const TAILWIND_COLORS = Object.keys(TAILWIND_THEME.colors)

export const TAILWINDCSS_CLASSES = {
    info_link: "cursor-pointer underline decoration-dashed decoration-blue-600 underline-offset-4", 
    info_icon: "text-blue-600",
    badge_icon: "size-5"
}