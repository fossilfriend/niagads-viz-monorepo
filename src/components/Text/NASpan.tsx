import React from "react";
import { TextRenderer } from "./types";

export const NASpan: React.FC<TextRenderer> = ({value="N/A", className="grey"}) => {
    return (
        <span className={className}>
            {value}
        </span>
    );
};

