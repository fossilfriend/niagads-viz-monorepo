import React, { useState, useMemo } from "react"

import { Column as ReactTableColumn, Table as ReactTable } from "@tanstack/react-table"
import { ViewColumnsIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'

import { Button, SearchInput, Tooltip } from "@components/UI"
import { FileFormat } from "@common/types"
import { TableRow } from "@table/TableProperties"
import { TableExportControls } from "./TableExportControls"


// column.getCanHide

interface ToolbarProps {
    table: ReactTable<TableRow>
    exportTypes?: FileFormat[]
}

// if all columns are required, then cannot toggle column visibility for the table
const __canToggleColumns = (columns: ReactTableColumn<TableRow>[]) => {
    const requiredColumns = columns.map((col) => (!col.getCanHide()))
    return requiredColumns.some(x => (x === false))
}


export const TableToolbar = ({ table, exportTypes }: ToolbarProps) => {
    const canToggleColumns = useMemo(() => (__canToggleColumns(table.getAllColumns())), [])
    const tableIsFiltered: boolean = table.getState().globalFilter !== '' /* && table.getState().columnFilters ? -> array so not sure what to test yet */


    return <div className="relative flex justify-end gap-2 m-2">
        <SearchInput value={table.getState().globalFilter} onChange={val => table.setGlobalFilter(val)} />
        {canToggleColumns && <Tooltip message="Show/Hide Columns">
            <Button variant="white" onClick={() => alert('show hide columns')} >
                <ViewColumnsIcon className={`icon-button`}></ViewColumnsIcon>
                <span className="ml-2 uppercase">Columns</span>
            </Button>
        </Tooltip>}
        {exportTypes && <Tooltip message="export table data">
            <TableExportControls isFiltered={tableIsFiltered} exportOptions={exportTypes}/>
        </Tooltip>}


    </div>
}

