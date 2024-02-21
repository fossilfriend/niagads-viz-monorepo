import React from "react";

import { NASpan } from "@renderers/index";

export const isObject = (a: any) => a instanceof Object;

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

/* altValue defines what should be displayed if not n/a */
export const resolveNAs = (value: string, altValue: any = null) => {
    const MemoNASpan = React.memo(NASpan);
    if (value === "N/A" || value === null || value === "") {
        return <MemoNASpan key={Math.random().toString(36).slice(2)}></MemoNASpan>;
    }
    return altValue != null ? altValue : value;
};

