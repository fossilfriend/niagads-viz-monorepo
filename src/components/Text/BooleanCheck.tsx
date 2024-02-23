import React from "react"

import Box from "@mui/material/Box"
import CheckIcon from "@mui/icons-material/Check"

import { TextRenderer } from "@text/types"

export const BooleanCheck: React.FC<TextRenderer> = ({ value, className, htmlColor, muiColor }) => {
    if (value && ["true", "yes"].includes(value.toString().toLowerCase())) {
        return (
            <Box component="span">
            <CheckIcon
                className={className ? className : undefined}
                color={muiColor ? muiColor : undefined}
                htmlColor={htmlColor ? htmlColor : undefined}
                fontSize="inherit"
            ></CheckIcon>
        </Box>
        );
    }
    return null;
};

