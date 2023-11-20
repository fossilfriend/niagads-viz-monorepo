import React from "react";
import { render } from "react-dom";
import { createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <h1>Hello React</h1>
  </ThemeProvider>
);

render(<App />, document.getElementById("root"));
