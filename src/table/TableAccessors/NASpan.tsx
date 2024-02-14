import React from "react";
import { ColumnAccessor } from "../Common/types";

export const NASpan: React.FC<ColumnAccessor> = ({value="N/A", className="grey"}) => {
    return (
        <span className={className}>
            {value}
        </span>
    );
};

