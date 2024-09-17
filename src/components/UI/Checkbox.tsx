import React from "react"

export const CHECKBOX_TAILWIND_CSS = {
    root: "",
    default: "",
    primary: "accent-primary",
    secondary: "accent-secondary",
    accent: "accent-accent",
    pink: "accent-pink-500"
}

export type CheckboxVariants = 'default' | 'primary' | 'secondary' | 'pink' | 'accent'
export interface CheckboxProps {
    variant?: CheckboxVariants
    label?: string
    checked?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null
    disabled?: boolean
}

export const Checkbox = ({ variant = 'secondary', label, onChange, disabled = false, checked = false }: CheckboxProps) => {
    const className = CHECKBOX_TAILWIND_CSS[variant]
    return (
        <div>
            <input type="checkbox" className={className} 
                onChange={onChange} 
                disabled={disabled}
                checked={checked} />
            {label && <label className="text-sm ml-2">{label}</label>}
        </div>
    )
}