import React, { useState, useMemo } from "react"

import { Column, Table } from "@tanstack/react-table"

import { ViewColumnsIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { Button, Tooltip } from "@components/UI"
import { FileFormat } from "@common/types"
import { TableRow } from "./TableProperties"

// column.getCanHide

interface ToolbarProps {
    table: Table<TableRow>
    exportTypes?: FileFormat[]
}


// if all columns are required, then cannot toggle column visibility for the table
const __canToggleColumns = (columns: Column<TableRow>[]) => {
    const requiredColumns = columns.map((col) => (!col.getCanHide()))
    return requiredColumns.some(x => (x === false))
}

export const TableToolbar = ({ table, exportTypes }: ToolbarProps) => {
    const canToggleColumns = useMemo(() => (__canToggleColumns(table.getAllColumns())), [])

    return <div className="flex justify-end gap-2 m-2">
        {canToggleColumns && <Tooltip message="select visible columns">
            <Button variant="white" onClick={() => alert('show hide columns')} >
                <ViewColumnsIcon className={`icon-button`}></ViewColumnsIcon>
                <span className="ml-2 uppercase">Columns</span>
            </Button>
        </Tooltip>}
        {exportTypes && <Tooltip message="export table data">
            <Button variant="white" onClick={() => alert('export')} >
                <ArrowDownTrayIcon className="icon-button"></ArrowDownTrayIcon> 
                <span className="ml-2 uppercase">Export</span>
            </Button>
        </Tooltip>}
    </div>
}


/*
<Select defaultValue={pageSize.toString()} fields={pageSizeOptions}
    onChange={(e: any) => { onChangePageSize(Number(e.target.value)) }}
    label="Results per page" id="pages" inline variant='plain' />
<p className="text-sm text-gray-900 px-2">{minDisplayedRow} - {maxDisplayedRow} of {nRows}</p>

</div>
*/