import React from "react";

import { makeStyles } from "@mui/core/styles";
import Box from "@mui/core/Box";
import Button from "@mui/core/Button";
import OpenInBrowserIcon from "@mui/icons/OpenInBrowser";

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

export const RowSelectButtonAccessor: React.SFC<ColumnAccessor> = ({ value, userProps }) => {
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
