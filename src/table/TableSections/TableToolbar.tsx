import React, { useState, useCallback } from "react";

import { CSVLink } from "react-csv";

import { useTableStyles, parseFieldValue } from "@table/index";
import { FilterPageProps, GlobalFilterFlat } from "@table/TableFilters";
import {
  SelectColumnsDialog,
  FilterDialog,
  MemoTableHelpDialog as TableHelpDialog,
} from "@table/TableSections";

import {
  StyledTooltip as Tooltip,
  MaterialUIThemedButton as BlueButton,
} from "@mui-wrappers/index";

import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterIcon from "@mui/icons-material/FilterList";
import InfoIcon from "@mui/icons-material/Info";
import DownloadIcon from "@mui/icons-material/GetApp";

interface PanelOptions {
  toggle: any;
  label: string;
  tooltip?: string;
}

interface DialogOptions extends Omit<PanelOptions, "toggle"> {
  options?: any;
}

interface TableToolbar {
  filter?: { hasGlobalFilter: boolean; advancedFilter: DialogOptions };
  columnsDialog?: DialogOptions;
  canExport?: boolean;
  linkedPanel?: PanelOptions;
}

export const TableToolbar: React.FC<TableToolbar & FilterPageProps> = ({
  instance,
  canExport = true,
  linkedPanel,
  columnsDialog,
  filter,
}) => {
  //@ts-ignore
  const { preGlobalFilteredRows, globalFilter, setGlobalFilter, sortedRows,
    prepareRow,
    visibleColumns,
  } = instance;
  const [columnsDialogIsOpen, setColumnsDialogIsOpen] =
    useState<boolean>(false);
  const [filterDialogIsOpen, setFilterDialogIsOpen] = useState<boolean>(false);
  const [helpDialogIsOpen, setHelpDialogIsOpen] = useState<boolean>(false);
  const [tableExportData, setTableExportData] = useState<any>({
    data: "",
    headers: [],
  });

  const tClasses = useTableStyles();

  const hasGlobalFilter =
    filter.hasGlobalFilter === null ? false : filter.hasGlobalFilter;

  const closeFilterDialog = () => {
    setFilterDialogIsOpen(false);
  };

  const closeColumnsDialog = () => {
    setColumnsDialogIsOpen(false);
  };

  const closeHelpDialog = () => {
    setHelpDialogIsOpen(false);
  };

  const generateTableExportData = () => {
    // get columns in order, to set as header; save in tableExportHeader state variable
    const header = visibleColumns.map((col: any) => {
      return { label: col.Header.toString(), key: col.id };
    });

    const exportData = sortedRows.map((row: any) => {
      prepareRow(row);
      // key on header display values; parse values
      const newRow = Object.entries(row.values).reduce(function (
        obj: any,
        [key, value]
      ) {
        obj[key] = parseFieldValue(value, "NA");
        return obj;
      },
      {});
      return newRow;
    });

    setTableExportData({ data: exportData, headers: header });
  };

  return (
    <>
      <Toolbar
        variant="dense"
        disableGutters
        style={{ display: "flex", justifyContent: "flex-end" }}>
        {hasGlobalFilter && (
          <GlobalFilterFlat
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}

        {linkedPanel && (
          <Box mr={1} ml={2}>
            <FormControlLabel
              control={
                <Switch
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    linkedPanel.toggle(event.target.checked)
                  }
                />
              }
              label={linkedPanel.label}
              title={`Toggle to reveal or hide ${linkedPanel.label} explorer`}
            />
          </Box>
        )}

        {/* span is b/c button is disabled, allows tooltip to fire */}
        {canExport && (
          <CSVLink
            headers={tableExportData.headers}
            data={tableExportData.data}
            onClick={generateTableExportData}
            //@ts-ignore
            filename={instance.state.name}>
            <Button
              startIcon={<DownloadIcon />}
              variant="text"
              color="primary"
              aria-label="download table data">
              Export
            </Button>
          </CSVLink>
        )}

        {columnsDialog !== null && (
          <Box mr={1} ml={1}>
            <Button
              variant="text"
              color="primary"
              startIcon={<ViewColumnIcon />}
              onClick={() => {
                setColumnsDialogIsOpen(true);
              }}
              title="Set visible columns.">
              Columns
            </Button>
          </Box>
        )}

        {filter.advancedFilter !== null && (
          <Box mr={1} ml={1}>
            <Button
              variant="text"
              color="primary"
              startIcon={<FilterIcon />}
              onClick={() => {
                setFilterDialogIsOpen(true);
              }}
              title="View advanced filters.">
              Filter
            </Button>
          </Box>
        )}
        <Box mr={1} ml={1}>
          <BlueButton
            variant="text"
            color="primary"
            onClick={() => {
              setHelpDialogIsOpen(true);
            }}
            title="Learn about searching, filtering, and modifying this table.">
            <InfoIcon />
          </BlueButton>
        </Box>
      </Toolbar>
      {columnsDialog !== null && (
        <SelectColumnsDialog
          isOpen={columnsDialogIsOpen}
          handleClose={closeColumnsDialog}
          instance={instance}
          requiredColumns={columnsDialog.options.requiredColumns}
        />
      )}
      {filter.advancedFilter !== null && (
        <FilterDialog
          isOpen={filterDialogIsOpen}
          handleClose={closeFilterDialog}
          instance={instance}
          filterGroups={filter.advancedFilter.options.filterGroups}
          includeChips={false}
        />
      )}
      <TableHelpDialog
        isOpen={helpDialogIsOpen}
        handleClose={closeHelpDialog}
        canAddColumns={columnsDialog !== null}
        hasLinkedPanel={linkedPanel !== null}
        canFilter={filter.advancedFilter !== null}
      />
    </>
  );
};
