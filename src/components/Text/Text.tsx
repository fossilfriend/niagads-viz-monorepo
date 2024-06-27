import React from "react"

import {
    InformationCircleIcon
} from "@heroicons/react/24/outline";

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
    const useInfoLink = _hasOwnProperty('inlineTooltip', props) // tooltip rendered as info link instead of info icon

    if (_hasOwnProperty('color', props)) {
        style = Object.assign({ 'color': _get('color', props) }, style)
    }

    let textElement = _renderTextElement(_get('value', props), style,
        hasTooltip && useInfoLink ? TAILWINDCSS_CLASSES['info_link'] : "")

    if (hasTooltip) {
        if (useInfoLink) {
            textElement = renderTooltip(textElement, _get('tooltip', props))
        }
        else { // draw info icon and attach the tooltip to the icon
            textElement = <div className="flex">
                {textElement}
                <InformationCircleIcon className="ml-1 size-3 text-blue-600" title={_get('tooltip', props)} />
                </div>
        }
    }

    return (<>{textElement}</>)
}