import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    fontSize: "12px",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  alertTitle: {
    fontWeight: "bold",
    fontSize: "14px",
  },
}));

export const InfoAlert: React.FC<{
  title: string;
  message: string;
  className?: string;
}> = ({ title, message, className }) => {
  const classes = useStyles();

  return (
    <Alert
      severity="info"
      className={className ? `${className} ${classes.alert}` : classes.alert}>
      <AlertTitle className={classes.alertTitle}>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export const ErrorAlert: React.FC<{
  title: string;
  message: string;
  className?: string;
}> = ({ title, message, className }) => {
  const classes = useStyles();

  return (
    <Alert
      severity="error"
      className={className ? `${className} ${classes.alert}` : classes.alert}>
      <AlertTitle className={classes.alertTitle}>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export const WarningAlert: React.FC<{
  title: string;
  message: string;
  className?: string;
}> = ({ title, message, className }) => {
  const classes = useStyles();

  return (
    <Alert
      severity="warning"
      className={className ? `${className} ${classes.alert}` : classes.alert}>
      <AlertTitle className={classes.alertTitle}>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export const ComingSoonAlert: React.FC<{ message: string }> = ({ message }) => {
  const classes = useStyles();
  return (
    <Alert
      icon={<BuildIcon fontSize="inherit" />}
      severity="warning"
      className={classes.alert}>
      <AlertTitle className={classes.alertTitle}>Coming Soon</AlertTitle>
      {message}
    </Alert>
  );
};
