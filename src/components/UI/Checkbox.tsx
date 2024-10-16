import React from "react"

export const CHECKBOX_TAILWIND_CSS = {
    root: "",
    default: "",
    primary: "accent-primary",
    secondary: "accent-secondary",
    accent: "accent-accent",
    pink: "accent-pink-500",
    alignCenter: "text-center align-middle"
}

export type CheckboxVariants = 'default' | 'primary' | 'secondary' | 'pink' | 'accent'
export interface CheckboxProps {
    variant?: CheckboxVariants
    label?: string
    checked?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null
    disabled?: boolean
    alignCenter?: boolean
}

export const Checkbox = ({ variant = 'secondary', label, onChange, disabled = false, checked = false, alignCenter=false }: CheckboxProps) => {
    const className = CHECKBOX_TAILWIND_CSS[variant]
    return (
        <div className={alignCenter ? CHECKBOX_TAILWIND_CSS.alignCenter : ""}>
            <input type="checkbox" className={className} 
                onChange={onChange} 
                disabled={disabled}
                defaultChecked={checked} />
            {label && <label className="text-sm ml-2">{label}</label>}
        </div>
    )
}