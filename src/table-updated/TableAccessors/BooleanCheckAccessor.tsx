import React from "react";
import { ColumnAccessor } from "../Common/types";

export const BooleanCheckAccessor: React.FC<ColumnAccessor> = ({ value, className, htmlColor, muiColor }) => {
    if (value && ["true", "yes"].includes(value.toString().toLowerCase())) {
        return (
            <span>X</span>
        );
    }
    return null;
};
