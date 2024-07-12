import React from "react"

import { _deepCopy, _get, _hasOwnProperty, _isJSON, _isNA, _isNull, toExponential, toFixedWithoutZeros } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"

import {
    TextRenderer,
    renderWithInfo,
    renderStyledText,
    renderNullValue,
    buildElementStyle
} from "./TextRenderer";
import { formatFloat } from "./Number";

export const PercentageBar = <T,>({ props }: TextRenderer<T>) => {
    const value = _get('value', props)
    
    if (_isNull(value)) {
        return renderNullValue(_get('nullValue', props))
    }

    if (_isNA(value)) {
        return renderNullValue()
    }

    const formattedValue = formatFloat(value, _get('precision', props, null) )

    return <>{"Percentage Bar: " + JSON.stringify(Object.assign(props as any, {formattedValue: formattedValue}))}</>
}