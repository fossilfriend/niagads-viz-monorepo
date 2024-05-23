import React from "react"
import { NASpan } from "@text/NASpan"

/* altValue defines what should be displayed if not n/a */
export const resolveNAs = (value: string, altValue: any = null) => {
    const MemoNASpan = React.memo(NASpan);
    if (value === "N/A" || value === null || value === "") {
        return <MemoNASpan key={Math.random().toString(36).slice(2)}></MemoNASpan>;
    }
    return altValue != null ? altValue : value;
};




