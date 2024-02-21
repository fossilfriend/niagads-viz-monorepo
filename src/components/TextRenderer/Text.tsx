import React, { useState } from "react";

import { isJSON, TextRenderer, JSONRenderer } from "@renderers/index";


export const DefaultText: React.FC<TextRenderer> = ({ value, maxLength = 100 }) => {
    if (isJSON(value)) {
        return <JSONRenderer value={value} />;
    }
    if (value.toString().length > maxLength) {
        return <Clob value={value} maxLength={maxLength} />;
    }
    // catch numerics
    return value
};

// large text, show more or tooltip
// if not JSON & no tooltip, show more
export const Clob: React.FC<TextRenderer> = ({ value, maxLength = 100 }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return isJSON(value) && "tooltip" in value ? (
        <AnnotatedText value={{ value: value.slice(0, maxLength - 3) + "...", tooltip: value.tooltip }} />
    ) : isExpanded ? (
        <div>
            {value} <a onClick={toggleIsExpanded}>Show less</a>
        </div>
    ) : (
        <div>
            {`${value.slice(0, maxLength - 3)}...`} <a onClick={toggleIsExpanded}>Show more</a>
        </div>
    );
};

export const ColoredText: React.FC<TextRenderer> = ({ value, className, muiColor }) => {
    return (
        <span className={className ? className : ""} color={muiColor ? muiColor : ""}>
            {value}
        </span>
    );
};

// text with tooltip value = { value: string, tooltip: string}
// so technically, takes JSON

export const AnnotatedText: React.FC<TextRenderer> = ({ value }) => {
    return (    
        <div title={value.tooltip} arial-label={value.tooltip}>
           <span className="annotated-text">{value.value}</span>
        </div>
    );
};
