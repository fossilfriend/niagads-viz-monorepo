import React from "react";
import Box from "@mui/material/Box";
import { ColumnAccessor } from "@table/ColumnAccessors";

export const NASpan: React.FC<ColumnAccessor> = ({value="N/A", className="grey"}) => {
    return (
        <Box className={className} component="span">
            {value}
        </Box>
    );
};

