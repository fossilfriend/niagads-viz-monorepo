import React, { forwardRef } from "react"
import { Select as HeroSelect, SelectSection, SelectItem, useSelect, SelectProps } from "@heroui/react";

// https://www.heroui.com/docs/components/select

export interface CustomSelectProps extends SelectProps {
    values: string[] | { [key: string]: string } | number[]
}

export const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>((props, ref) => {
    const {values, ...rest} = props;

    const _optionsFromArray = (values: string[] | number[]) => (
        values.map(v => (
            <option key={v.toString()} value={v}>{v}</option>
        ))
    )
    
    const _optionsFromObj = (fieldMap: any) => (
        Object.entries(fieldMap).map(([k, v]) => (
            <option key={k} value={v as string}>{k}</option>
        ))
    )

    return <HeroSelect ref={ref} {...rest} />;
});

CustomSelect.displayName = "CustomSelect";

/*
    return <>
        <div className={inline ? __TAILWIND_CSS.inline : ""}>
            <div>
                <label htmlFor={id} className={__TAILWIND_CSS.label}>{label}</label>
            </div>
            <div>
                <select name={name ? name : id} defaultValue={defaultValue} id={id} onChange={onChange} className={`${__TAILWIND_CSS.root} ${__TAILWIND_CSS[variant]}`}>
                    {Array.isArray(fields)
                        ? _optionsFromArray(fields)
                        : _optionsFromObj(fields)}
                </select>
            </div>
        </div>

    </>

}*/