import React from "react"

import { _get, _hasOwnProperty } from "@common/utils";
import { BasicType } from "@common/types";

import { Tooltip, renderTooltip } from "@components/UI/Tooltip";

import { TextRenderer } from "./TextRendererProperties";




const renderTextElement = (value: any, style: any, tooltipTarget: string | undefined) => {
    return tooltipTarget 
        ? <span style={style} data-tooltip-target={`${tooltipTarget}-tooltip`}>{value}</span>
        : <span style={style}>{value}</span>
}

//const MyComponent = <T,>({ data }: MyComponentProps<T>) => {
export const Text = <T,>({ props }: TextRenderer<T>) => {
    let style = {}
    let tooltip = undefined
    let target = undefined

    if (_hasOwnProperty('color', props)) {
        style = Object.assign({ 'color': _get('color', props) }, style)
    }

    if (_hasOwnProperty('tooltip', props)) {
        target = `${_get('columnId', props)}_${_get('rowId', props)}`
        tooltip = renderTooltip(_get('tooltip', props), target)

    }

    return (
        <>
            {tooltip && tooltip}
            {renderTextElement(_get('value', props), style, target)}
        </>)

};