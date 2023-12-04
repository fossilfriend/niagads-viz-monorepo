import React from "react";
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider} from "@mui/material/styles";

import { Table } from "@table/TableSections"
import { data as tableData, columns as tableColumns, options as tableOptions } from "@data/examples/table.js"

const theme = createTheme();

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript


const App = () => (
  <ThemeProvider theme={theme}>
    <Table data={tableData} columns={tableColumns} options={tableOptions}></Table>
  </ThemeProvider>
);

root.render(<App tab="home" />);
