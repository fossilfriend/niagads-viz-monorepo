import React, { useState } from "react"

import { _get, _hasOwnProperty, _isNull } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"

import { TextRenderer, renderWithInfo, renderStyledText, renderNullValue } from "./TextRenderer";

const DEFAULT_MAX_LENGTH = 100

// TODO: truncateTo --> long text


export const Text = <T,>({ props }: TextRenderer<T>) => {
    let style = {}
    const hasTooltip = _hasOwnProperty('tooltip', props)
    const useInfoLink = _get('inlineTooltip', props, false) // tooltip rendered as info link instead of info icon
    const value = _get('value', props)
    const maxLength = _get('truncateTo', props, DEFAULT_MAX_LENGTH)

    if (_hasOwnProperty('color', props)) {
        style = Object.assign({ 'color': _get('color', props) }, style)
    }

    if (_isNull(value)) {
        return renderNullValue(_get('naString', props))
    }

    if (value.length > maxLength ) {
        return <LargeText props={props}/>
    }

    const textElement = renderStyledText(value, style,
        hasTooltip && useInfoLink ? TAILWINDCSS_CLASSES.info_link : "")

    if (hasTooltip) {
        return renderWithInfo(textElement, _get('tooltip', props), useInfoLink)
    }

    return (<>{textElement}</>)
}

export const LargeText = <T,>({props}: TextRenderer<T>) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const hasTooltip = _hasOwnProperty('tooltip', props)
    const value = _get('value', props)
    const maxLength = _get('truncateTo', props, DEFAULT_MAX_LENGTH)
    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return <div>large text</div>    
   /* return _isJSON(value) && "tooltip" in value ? (
        <AnnotatedText value={{ value: value.slice(0, maxLength - 3) + "...", tooltip: value.tooltip }} />
    ) : isExpanded ? (
        <div>
            {value} <a className="cursor-pointer decoration-dashed" onClick={toggleIsExpanded}>Show less</a>
        </div>
    ) : (
        <div>
            {`${value.slice(0, maxLength - 3)}...`} <a className="cursor-pointer decoration-dashed" onClick={toggleIsExpanded}>Show more</a>
        </div>
    ); */
};