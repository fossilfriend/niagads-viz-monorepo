import React from "react";

import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";

import { ColumnAccessor } from "@viz/Table/ColumnAccessors";

const useStyles = makeStyles((theme) => ({
    endIcon: {
        margin: "0px"
    },
    button: {
        minWidth: "30px",
        padding: "0px"
    }
  }));

export const RowSelectButtonAccessor: React.FC<ColumnAccessor> = ({ value, userProps }) => {
    const classes = useStyles();
    return (
        <Box component="span">
            <Button
                className="button"
                color="primary"
                variant="text"
                title={`${userProps.tooltip} ${value}`}
                aria-label={`${userProps.tooltip} ${value}`}
                onClick={() => userProps.action(value)}
                endIcon={<OpenInBrowserIcon className={classes.endIcon}/>}
            >
            </Button>
        </Box>
    );
};
