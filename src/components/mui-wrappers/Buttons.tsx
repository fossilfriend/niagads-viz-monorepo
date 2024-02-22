import React from "react";

import { withStyles } from "@mui/styles";
import { muiTheme } from "@mui-wrappers/index"
import { ButtonProps, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";


export const LabelButton = withStyles((theme) =>
  ({
    root: {
      "&:hover": {
        backgroundColor: "white",
      },
      justifyContent: "left",
    },
  })
)(Button);


export const MaterialUIThemedButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Button {...props}>{children}</Button>
    </ThemeProvider>
  );
};
