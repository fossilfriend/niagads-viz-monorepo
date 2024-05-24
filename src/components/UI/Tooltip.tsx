import React, { ReactNode } from "react"

interface Tooltip {
    contents: string | ReactNode,
    target: string
}

export const Tooltip = ({ contents, target }: Tooltip) => {
    return (
        <div data-tooltip={`${target}-tooltip`}
            className="absolute z-50 rounded-lg whitespace-normal break-words bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none">
            {
                typeof contents === 'string'
                ? <span className="">{contents}</span>
                : contents
            }
        </div>)
}

export const renderTooltip = (contents:any, target:string)  => {
    return <Tooltip contents={contents} target={target}/>
}
