import React from "react"

import { _get, _hasOwnProperty } from "@common/utils";
import { BasicType } from "@common/types";

import { Tooltip, renderTooltip } from "@components/UI/Tooltip";

import { TextRenderer } from "./TextRendererProperties";


const renderTextElement = (value: any, style: any) => {
    return <span style={style}>{value}</span>
}

//const MyComponent = <T,>({ data }: MyComponentProps<T>) => {
export const Text = <T,>({ props }: TextRenderer<T>) => {
    let style = {}
    let tooltip = undefined


    if (_hasOwnProperty('color', props)) {
        style = Object.assign({ 'color': _get('color', props) }, style)
    }

    const textElement = renderTextElement(_get('value', props), style)

    if (_hasOwnProperty('tooltip', props)) {
        //const key = `${_get('columnId', props)}_${_get('rowId', props)}`
        tooltip = renderTooltip(textElement, _get('tooltip', props))
    }

    return (<>{tooltip ? tooltip : textElement}</>)

};