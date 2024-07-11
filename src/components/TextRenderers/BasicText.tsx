import React, { useState } from "react"

import { _deepCopy, _get, _hasOwnProperty, _isJSON, _isNA, _isNull } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"

import { TextRenderer, renderWithInfo, renderStyledText, renderNullValue } from "./TextRenderer";

const DEFAULT_MAX_LENGTH = 100

export const Text = <T,>({ props }: TextRenderer<T>) => {
    const hasTooltip = _hasOwnProperty('tooltip', props)
    const useInfoLink = _get('inlineTooltip', props, false) // tooltip rendered as info link instead of info icon
    const value = _get('value', props)
    const maxLength = _get('truncateTo', props, DEFAULT_MAX_LENGTH)
    const style = _hasOwnProperty('color', props)
        ? { 'color': _get('color', props) }
        : {}


    if (_isNull(value)) {
        const nullValue = _get('nullValue', props)
        return (_isNA(nullValue))
            ? renderNullValue()
            : renderNullValue(nullValue)
    }

    if (_isNA(value)) {
        return renderNullValue()
    }

    if (value.length > maxLength) {
        return <LargeText props={props} />
    }

    const textElement = renderStyledText(value, style,
        hasTooltip && useInfoLink ? TAILWINDCSS_CLASSES.info_link : "")

    return hasTooltip
        ? renderWithInfo(textElement, _get('tooltip', props), useInfoLink)
        : textElement
}


export const LargeText = <T,>({ props }: TextRenderer<T>) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const value = _get('value', props)
    const hasTooltip = _hasOwnProperty('tooltip', props)
    const maxLength = _get('truncateTo', props, DEFAULT_MAX_LENGTH)
    const truncatedValue = `${value.slice(0, maxLength - 3)}...`

    if (hasTooltip) {
        let newProps = _deepCopy(props)
        newProps.value = truncatedValue
        return <Text props={newProps} />
    }

    const style = _hasOwnProperty('color', props)
        ? { 'color': _get('color', props) }
        : {}

    const textElement = renderStyledText(isExpanded ? value : truncatedValue, style, "")
    const action = isExpanded ? 'Show Less' : 'Show More'
    return (
        <div>
            {textElement}{"   "}
            <a className={`text-xs ${TAILWINDCSS_CLASSES.info_link}`} onClick={toggleIsExpanded}>{action}</a>
        </div>
    )
};