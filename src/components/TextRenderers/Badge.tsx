import React from "react"
import { TextRenderer, buildElementStyle, getIconElement, renderNullValue, renderStyledText, renderWithIcon, renderWithInfo } from "./TextRenderer"
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

    let displayProps =  {
        'value': value.toString(),
    }

    if (value === false && !_hasOwnProperty('color', props)) {
        Object.assign(displayProps, {
            'color': 'rgb(229, 231, 235)' // same as the n/a color
        })
    }


    if (_hasOwnProperty('icon', props)) {
        const iconStyle = buildElementStyle(props, 'color')
        const IconComponent = getIconElement(_get('icon', props))
        Object.assign(displayProps, {'iconOnly': true, 'icon': <IconComponent style={iconStyle} className={`${TAILWINDCSS_CLASSES.badge_icon} m-auto`}/>})
    }

    return <Badge props={Object.assign(props as any, displayProps)} />

}