import React from "react";

import { withStyles, makeStyles, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MUIHelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";

import { safeHtml } from "wdk-client/Utils/ComponentUtils";


export const StyledTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: "14px",
        border: "1px solid #dadde9",
    },
}))(Tooltip);

export const WhiteTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: "white",
    },
}))(StyledTooltip);


export const KeyedTooltip = (target: React.ReactElement, tooltip: string) => {
    return tooltip ? (
        <StyledTooltip
            key={Math.random().toString(36).slice(2)}
            arrow
            title={<Typography variant="caption">{safeHtml(tooltip)}</Typography>}
        >
            {target}
        </StyledTooltip>
    ) : (
        { target }
    );
};

export const HelpIcon: React.FC<{tooltip: string}> = ({tooltip}) => {
    return (
        <StyledTooltip title={<Typography variant="caption">{safeHtml(tooltip)}</Typography>}>
            <HelpIconButton aria-label="info" size="small">
                <MUIHelpIcon fontSize="small"/>
            </HelpIconButton>
        </StyledTooltip>
    );
};

const HelpIconButton = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.getContrastText(blue[800]),
        color: blue[800],
        "&:hover": {
            backgroundColor: blue[200],
        },
    },
}))(IconButton);
