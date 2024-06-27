import React from "react"

import { _get, _hasOwnProperty } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"
import { renderTooltip } from "@components/UI/Tooltip";

import { TextRenderer } from "./TextRendererProperties";


const renderTextElement = (value: any, style: any, className: string) => {
    return <span className={className} style={style}>{value}</span>
}

//const MyComponent = <T,>({ data }: MyComponentProps<T>) => {
export const Text = <T,>({ props }: TextRenderer<T>) => {
    let style = {}
    const hasTooltip = _hasOwnProperty('tooltip', props)


    if (_hasOwnProperty('color', props)) {
        style = Object.assign({ 'color': _get('color', props) }, style)
    }

    const textElement = renderTextElement(_get('value', props), 
        style,  
        hasTooltip ?TAILWINDCSS_CLASSES['infolink'] : "")

    const tooltip = hasTooltip ? renderTooltip(textElement, _get('tooltip', props)) : undefined

    return (<>{tooltip ? tooltip : textElement}</>)

};