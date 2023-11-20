import React from "react";
import { render } from "react-dom";
import { createTheme, ThemeProvider} from "@mui/material/styles";

import { Table } from "@table/TableSections"
import { data as tableData, clean_columns as tableColumns } from "@data/examples/table.js"

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <h1>Hello React</h1>
    <Table data={tableData} columns={tableColumns}></Table>
  </ThemeProvider>
);

render(<App />, document.getElementById("root"));
