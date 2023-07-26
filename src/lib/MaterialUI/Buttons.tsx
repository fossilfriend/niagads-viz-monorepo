import React from "react";
import {
  Button,
  ButtonProps,
  IconButton,
  Theme,
  ThemeProvider,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { muiTheme } from "@m-ui/index";

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
