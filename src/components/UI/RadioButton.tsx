import React from "react"

import { 
    CheckboxProps as RadioButtonProps,
    CHECKBOX_TAILWIND_CSS as __TAILWIND_CSS
 } from "./Checkbox"


export const RadioButton = ({ variant='default', label, onChange, disabled=false, checked=false }: RadioButtonProps) => {
    const className = __TAILWIND_CSS[variant]
    return (
        <div>
            <input type="radio" className={className} 
                onChange={onChange} 
                checked={checked}
                disabled={disabled}/>
            {label && <label className="text-sm ml-2">{label}</label>}
        </div>
    )
}