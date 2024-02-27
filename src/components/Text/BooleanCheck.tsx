import React from "react"

import Box from "@mui/material/Box"
import CheckIcon from "@mui/icons-material/Check"

import { TextRenderer } from "./types"

export const BooleanCheck: React.FC<TextRenderer> = ({ value, className, color, muiColor }) => {
    if (value && ["true", "yes"].includes(value.toString().toLowerCase())) {
        return (
            <Box component="span">
            <CheckIcon
                className={className ? className : undefined}
                color={muiColor ? muiColor : undefined}
                htmlColor={color ? color : undefined}
                fontSize="inherit"
            ></CheckIcon>
        </Box>
        );
    }
    return null;
};

