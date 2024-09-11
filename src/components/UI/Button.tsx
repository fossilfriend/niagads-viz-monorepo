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
//<button type="button" class="font-medium rounded-lg text-sm px-5 dark:bg-blue-600 ">Default</button>
//<button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Default</button>

//<button type="button" class=" dark:hover:bg-gray-700">Alternative</button>

const __TAILWIND_CSS = {
    root: "font-inter font-medium text-sm rounded-lg border-solid border-1 focus:ring-2 focus:z-10 inline-flex items-center", //me-2 mb-2 
    primary: "text-white border-primary/50 bg-primary hover:bg-primary/85 focus:ring-primary/30",
    secondary:"border-secondary bg-secondary hover:bg-secondary/85 focus:ring-secondary/30",
    blue: "text-white border-blue-700 bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 focus:outline-none",
    white: "border-white text-primary focus:outline-none bg-white hover:bg-gray-100 hover:border-gray-100 hover:text-blue-700 focus:ring-text-blue-700",
    default: "",

    //states
    disabled: "disabled:bg-slate-50 disabled:text-slate-500 disabled:border",
    
    // Sizes
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5',
}


type ButtonVariants = 'default' | 'primary' | 'secondary' | 'white' | 'blue'
type ButtonSizes = 'sm' | 'md' | 'lg'
interface Button {
    variant?: ButtonVariants 
    size?: ButtonSizes
    children: ReactNode | string
    disabled?:boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
}


export const Button = ({ variant='default', size='md', children, onClick, disabled=false }: Button) => {
    const classes = `${__TAILWIND_CSS.root} ${__TAILWIND_CSS[variant]} ${__TAILWIND_CSS[size]} ${__TAILWIND_CSS.disabled}`

    return <button disabled={disabled}
        className={classes}
        onClick={onClick}> 
        {children} 
    </button>
}
