import React from "react"

import { _get, _hasOwnProperty } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"
import { renderTooltip } from "@components/UI/Tooltip";

import { TextRenderer } from "./TextRendererProperties";


const _renderTextElement = (value: any, style: any, className: string) => {
    return <span className={className} style={style}>{value}</span>
}

//const MyComponent = <T,>({ data }: MyComponentProps<T>) => {
export const Text = <T,>({ props }: TextRenderer<T>) => {
    let style = {}
    const hasTooltip = _hasOwnProperty('tooltip', props)

    if (_hasOwnProperty('color', props)) {
        style = Object.assign({ 'color': _get('color', props) }, style)
    }

    let textElement = _renderTextElement(_get('value', props), 
        style,  
        hasTooltip ? TAILWINDCSS_CLASSES['info_link'] : "")

    if (hasTooltip) {
        textElement = renderTooltip(textElement, _get('tooltip', props))
    }

    return (<>{textElement}</>)
}