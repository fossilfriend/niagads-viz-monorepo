import React from "react"

import { parseFieldValue, ColumnAccessor, ColumnAccessorType } from  "@table/index"

import {
    BooleanCheck as BooleanCheckAccessor,
    NASpan,
    SparkPercentageBar as SparkPercentageBarAccessor,
    Link as LinkAccessor,
    LinkList as LinkListAccessor,
    JSONRenderer as JSONAccessor,
    isJSON,
    Clob,
    ColoredText as ColoredTextAccessor,
} from "@renderers/index"


export const DefaultTextAccessor: React.FC<ColumnAccessor> = ({ value, maxLength = 100 }) => {
    if (isJSON(value)) {
        return <JSONAccessor value={value} />;
    }
    if (value.toString().length > maxLength) {
        return <Clob value={value} maxLength={maxLength} />;
    }
    // catch numerics
    return parseFieldValue(value);
};

export {
    BooleanCheckAccessor,
    NASpan, 
    SparkPercentageBarAccessor, 
    LinkAccessor, 
    LinkListAccessor, 
    JSONAccessor, 
    ColoredTextAccessor
}
