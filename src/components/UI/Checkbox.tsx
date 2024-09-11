import React, { useMemo, ReactNode } from "react"

const __TAILWIND_CSS = {
    root: "",
    default: "",
    primary: "accent-primary",
    secondary: "accent-secondary",
    accent: "accent-accent",
    pink: "accent-pink-500"
}

type CheckboxVariants = 'default' | 'primary' | 'secondary' | 'pink' | 'accent'
interface Checkbox {
    variant: CheckboxVariants
    value: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null
    disabled?: boolean
}

export const Checkbox = ({ variant = 'secondary', value, onChange, disabled = false }: Checkbox) => {
    const className = __TAILWIND_CSS[variant]
    return (
        <div>
            <input type="checkbox" className={className} 
                    onChange={onChange} 
                    disabled={disabled}/>
            <label className="text-sm ml-2">{value}</label> 
        </div>
    )
}