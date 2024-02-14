import React, { useState } from "react";

import { JSONAccessor } from ".";
import { parseFieldValue, isObject } from "../Common/TableUtils";
import { ColumnAccessor } from "../Common/types";

export const isJSON = (value: any) => {
    try {
        value = JSON.parse(value);
    } catch (e) {
        // catch numbers, nulls, booleans
        return isObject(value) && value != null;
    }

    // catch numbers, nulls, booleans
    return isObject(value) && value != null;
    
};

export const DefaultTextAccessor: React.FC<ColumnAccessor> = ({ value, maxLength = 100 }) => {
    if (isJSON(value)) {
        return <JSONAccessor value={value} />;
    }
    if (value.toString().length > maxLength) {
        return <ClobTextAccessor value={value} maxLength={maxLength} />;
    }
    // catch numerics
    return parseFieldValue(value);
};

// large text, show more or tooltip
// if not JSON & no tooltip, show more
export const ClobTextAccessor: React.FC<ColumnAccessor> = ({ value, maxLength = 100 }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return isJSON(value) && "tooltip" in value ? (
        <AnnotatedTextAccessor value={{ value: value.slice(0, maxLength - 3) + "...", tooltip: value.tooltip }} />
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

export const ColoredTextAccessor: React.FC<ColumnAccessor> = ({ value, className, muiColor }) => {
    return (
        <span className={className ? className : ""} color={muiColor ? muiColor : ""}>
            {value}
        </span>
    );
};

// text with tooltip value = { value: string, tooltip: string}
// so technically, takes JSON

export const AnnotatedTextAccessor: React.FC<ColumnAccessor> = ({ value }) => {
    return (    
        <div title={value.tooltip} arial-label={value.tooltip}>
           <span className="annotated-text">{value.value}</span>
        </div>
    );
};
