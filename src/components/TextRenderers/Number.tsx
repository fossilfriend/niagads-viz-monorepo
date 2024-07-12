import React from "react"

import { TextRenderer, renderNullValue, renderWithInfo} from "./TextRenderer"
import { Text } from "./BasicText"

import { _get, _hasOwnProperty, _isNA, _isNull } from "@common/utils";

export const Float = <T,>({ props }: TextRenderer<T>) => {
    let value = _get('value', props)

    if (_isNull(value)) {
        return renderNullValue(_get('nullValue', props))
    }

    if (_isNA(value)) {
        return renderNullValue()
    }

    const precision = _get('precision', props, false)
    const useScientificNotation = _get('useScientificNotation', props, 0)
    if (useScientificNotation) {
        const snValue = Number.parseFloat(value).toExponential(precision ? precision : 2) 
        const [mantissa, exponent] = (snValue + '').split('e')
        if (parseInt(exponent) > 3 || parseInt(exponent) < -4) {
            value = snValue
        }
    }

    if (precision && !(value + '').includes('e')) {
        value = Number.parseFloat(value).toPrecision(precision)
    }

    return <Text props={Object.assign(props as any, {value: value})}/>
}