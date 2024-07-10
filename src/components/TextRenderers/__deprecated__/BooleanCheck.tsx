import React from "react"

import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import { TextRenderer } from "./types"

export const BooleanCheck: React.FC<TextRenderer> = ({ value, className, color }) => {
    if (value && ["true", "yes"].includes(value.toString().toLowerCase())) {
        return (
            <CheckBadgeIcon style={{color: `${color}`}} className={className ? className : "h-6"}/>
        );
    }
    return null;
};

