import React, { ReactNode } from "react"

const __TAILWIND_CSS = {
    form: "max-w-sm mx-auto w-full",
    inline_container: "md:flex md:items-center",
    inline_label_container: "md:w-1/3",
    inline_select_container: "md:w-2/3",
    label: "block p-2 text-sm font-medium text-gray-900 dark:text-white",
    select: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
}

interface Select {
    fields: string[] | { [key: string]: string } | number[]
    id: string
    label?: string
    selected?: string
    inline?: boolean
}

export const Select = ({ fields, id, label, selected, inline = false }: Select) => {
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
        <form className={__TAILWIND_CSS.form}>
            <div className={inline ? __TAILWIND_CSS.inline_container : ""}>
                <div className={inline ? __TAILWIND_CSS.inline_label_container : ""}>
                    <label htmlFor={id} className={__TAILWIND_CSS.label}>{label}</label>
                </div>
                <div className={inline ? __TAILWIND_CSS.inline_select_container : ""}>
                    <select id={id} className={__TAILWIND_CSS.select}>
                        {Array.isArray(fields)
                            ? _optionsFromArray(fields, selected)
                            : _optionsFromObj(fields, selected)}
                    </select>
                </div>
            </div>
        </form>
    </>

}