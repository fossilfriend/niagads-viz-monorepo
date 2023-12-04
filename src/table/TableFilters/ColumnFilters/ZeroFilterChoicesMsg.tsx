import React from "react";

import { makeStyles } from "@mui/styles";
import { InfoAlert } from "@mui-wrappers/Alerts"

const useStyles = makeStyles((theme) => ({
    alert: {
        maxWidth: 321 // no idea but its what looks right
    },
  }));

export const ZeroFilterChoicesMsg: React.FC<{ label: string }> = ({ label }) => {
    const classes = useStyles();
    return (
        <InfoAlert title={label} className={classes.alert} message="No choices (or only NAs) available with selected filters." />    
    );
};
