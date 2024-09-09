import React, { ReactNode } from "react"

const __TAILWIND_CSS = {
    root: "bg-gray-50 text-gray-900 text-sm block w-full p-2.5",

    // modes
    outline: "border border-solid border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
    plain: "bg-white border-0",
    underline: "bg-white border-t-0 border-l-0 border-r-0 border-b-[1px] border-solid border-black focus:border-blue-500",

    // label
    label: "block p-2 text-sm font-medium text-gray-900",
    inline: "md:flex md:items-center",
}

interface Select {
    fields: string[] | { [key: string]: string } | number[]
    id: string
    label?: string
    selected?: string | undefined
    inline?: boolean
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
    mode?: 'outline' | 'underline' | 'plain'
}

export const Select = ({ fields, id, label, selected, inline=false, onChange, mode='outline' }: Select) => {
    const _optionsFromArray = (values: string[] | number[], selectedValue: string | undefined) => (
        values.map(v => (
            <option key={v.toString()} value={v} selected={!!selectedValue && v.toString() === selectedValue}>{v}</option>
        ))
    )

    const _optionsFromObj = (fieldMap: any, selectedValue: string | undefined) => (
        Object.entries(fieldMap).map(([k, v]) => (
            <option key={k} value={v as string} selected={!!selectedValue && k === selectedValue}>{k}</option>
        ))
    )

    return <>
            <div className={inline ? __TAILWIND_CSS.inline : ""}>
                <div>
                    <label htmlFor={id} className={__TAILWIND_CSS.label}>{label}</label>
                </div>
                <div>
                    <select id={id} onChange={onChange} className={`${__TAILWIND_CSS.root} ${__TAILWIND_CSS[mode]}`}>
                        {Array.isArray(fields)
                            ? _optionsFromArray(fields, selected)
                            : _optionsFromObj(fields, selected)}
                    </select>
                </div>
            </div>

    </>

}