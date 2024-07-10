import React from "react"

import { _get, _hasOwnProperty, _isNull } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"

import { TextRenderer, renderWithInfo, renderStyledText, renderNullValue } from "./TextRenderer";


// TODO: truncateTo --> long text


export const Text = <T,>({ props }: TextRenderer<T>) => {
    let style = {}
    const hasTooltip = _hasOwnProperty('tooltip', props)
    const useInfoLink = _get('inlineTooltip', props, false) // tooltip rendered as info link instead of info icon
    const value = _get('value', props)
    const maxLength = _get('truncateTo', props, 100)

    if (_hasOwnProperty('color', props)) {
        style = Object.assign({ 'color': _get('color', props) }, style)
    }

    if (_isNull(value)) {
        return renderNullValue(_get('naString', props))
    }

    const textElement = renderStyledText(value, style,
        hasTooltip && useInfoLink ? TAILWINDCSS_CLASSES.info_link : "")

    if (hasTooltip) {
        return renderWithInfo(textElement, _get('tooltip', props), useInfoLink)
    }

    return (<>{textElement}</>)
}