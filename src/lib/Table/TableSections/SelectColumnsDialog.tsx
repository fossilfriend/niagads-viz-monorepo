import React, { ReactElement, useState } from "react";

import { TableInstance } from "react-table";

import Switch from "@mui/core/Switch";
import FormControlLabel from "@mui/core/FormControlLabel";
import FormControl from "@mui/core/FormControl";
import FormGroup from "@mui/core/FormGroup";

import DialogTitle from "@mui/core/DialogTitle";
import DialogContent from "@mui/core/DialogContent";
import DialogActions from "@mui/core/DialogActions";
import Dialog from "@mui/core/Dialog";
import Button from "@mui/core/Button";

import { ROW_SELECTION_FIELD } from "@viz/Table";

type HideColumnProps<T extends Record<string, unknown>> = {
    instance: TableInstance<T>;
    requiredColumns: string[];
    handleClose: any;
    isOpen: boolean;
};

export function SelectColumnsDialog<T extends Record<string, unknown>>({
    instance,
    isOpen,
    requiredColumns,
    handleClose,
}: HideColumnProps<T>): ReactElement | null {
    const { allColumns, toggleHideColumn } = instance;
    const hideableColumns = allColumns.filter((column) => !(column.id === ROW_SELECTION_FIELD));
    const checkedCount = hideableColumns.reduce((acc, val) => acc + (val.isVisible ? 0 : 1), 0);

    const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;

    return (
        <Dialog maxWidth="xs" aria-labelledby="dialog-title" open={isOpen} onClose={handleClose}>
            <DialogTitle id="dialog-title">Add or Remove Columns</DialogTitle>
            <DialogContent dividers>
                <FormControl component="fieldset">
                    <FormGroup>
                        {hideableColumns.map((column) => (
                            <FormControlLabel
                                key={column.id}
                                control={
                                    <Switch
                                        size="small"
                                        value={`${column.id}`}
                                        disabled={
                                            (column.isVisible && onlyOneOptionLeft) ||
                                            (requiredColumns && requiredColumns.includes(column.id))
                                        }
                                    />
                                }
                                label={column.render("Header")}
                                checked={column.isVisible}
                                onChange={() => toggleHideColumn(column.id, column.isVisible)}
                                labelPlacement="end"
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
