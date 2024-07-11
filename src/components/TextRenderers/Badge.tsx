import React from "react"
import { TextRenderer, buildElementStyle, renderNullValue, renderStyledText, renderWithIcon, renderWithInfo } from "./TextRenderer"
import { _get, _hasOwnProperty, _isNA, _isNull } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind";


export const Badge = <T,>({ props }: TextRenderer<T>) => {
    const value = _get('value', props)

    if (_isNull(value)) {
        return renderNullValue(_get('nullValue', props))
    }

    if (_isNA(value)) {
        return renderNullValue()
    }

    const style = buildElementStyle(props)
    const hasTooltip = _hasOwnProperty('tooltip', props)
    let textElement = renderStyledText(value, style, "")
    if (_hasOwnProperty('icon', props)) {
        textElement = renderWithIcon(textElement, _get('icon', props), _get('iconOnly', props))
    }

    return hasTooltip
        ? renderWithInfo(textElement, _get('tooltip', props), true)
        : textElement
}

export const BooleanBadge = <T,>({ props }: TextRenderer<T>) => {
    let value = _get('displayText', props, _get('value', props))

    if (_isNull(value)) {
        value = _get('nullValue', props, 'NA')
    }

    return <Badge props={Object.assign(props as any,
        {
            'value': value.toString(),
            'iconOnly': _hasOwnProperty('icon', props) ? true : false
        })} />

}