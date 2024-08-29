import { _get } from "@common/utils"
import React, { useMemo, ReactNode } from "react"

/*  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
 */


//<a className="text-white"/>

const __TAILWIND_CSS = {
    root: "py-2 px-4 rounded border-0 hover:bg-opacity-60",
    primary: {
        filled: 'bg-primary text-white',
        outline: 'text-primary border-1 border-primary bg-white',
    },
    secondary: {
        filled: 'bg-secondary text-primary',
        outline:'text-primary border-1 border-secondary bg-white',
    },
    disabled: {

    },
    // Sizes
    sm: 'px-3 py-2',
    md: 'px-4 py-2',
    lg: 'px-5 py-2',
}

interface ButtonOptions {
    mode: 'outline' | 'filled' | 'link',
    color?: string
    size?: string
}

interface Button {
    options: ButtonOptions
    children: ReactNode | string
    disabled?:boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
}

const _buildButtonStyling = (opts: ButtonOptions) => {
    let classes = __TAILWIND_CSS.root
    const color = _get('color', opts, 'primary') 
    const mode = _get('mode', opts, 'filled')
    const size = _get('size', opts, 'md')

    // @ts-ignore
    classes = `${classes} ${__TAILWIND_CSS[color][mode]}`

    return classes
}

export const Button = ({ options, children, onClick, disabled=false }: Button) => {

    const buttonClasses =  useMemo(() => _buildButtonStyling(options), [options]);
    
    if (options.mode === "link") {
        return "LINK BUTTON"
    }
    
    return <button 
        className={buttonClasses}
        onClick={onClick}> 
        {children} 
    </button>
}