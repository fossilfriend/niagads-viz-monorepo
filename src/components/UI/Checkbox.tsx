import React from "react"

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
    label?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null
    disabled?: boolean
}

export const Checkbox = ({ variant = 'secondary', value, label, onChange, disabled = false }: Checkbox) => {
    const className = __TAILWIND_CSS[variant]
    const id = 'checkbox-' + value.replace(' ', '-')
    return (
        <div>
            <input type="checkbox" className={className} id={id}
                value={value}
                onChange={onChange} 
                disabled={disabled}/>
            {label && <label htmlFor={id} className="text-sm ml-2">{label}</label>}
        </div>
    )
}