import React, { useMemo } from "react"
import { createColumnHelper, ColumnDef } from "@tanstack/react-table"

import { _hasOwnProperty } from "@common/utils"

import { SortConfig, UserDefinedColumn } from "./column"
import { Cell, CellTypes, getCellValue } from "./cell"
import { TableRow, UserDefinedTable, TableProps } from "./table"
import { renderCell } from "./rendering"


// FIXME: type of return should be custom sorting function
const __resolveSortingFn = (options: SortConfig) => {
    // ! point here says that as this point, we know options will not be undefined
    return _hasOwnProperty('sortingFn', options) ? options.sortingFn : 'alphanumeric'
}

const Table: React.FC<UserDefinedTable> = ({ columns, data, options }) => {

    const tableOptions: any = useMemo(() => {
        // from column definitions
        // hidden columns
        // initial sort
        // initial filter
    }, [])

    const resolvedColumns: any = useMemo(() => {
        const columnHelper = createColumnHelper<TableRow>();
        const columnDefs: ColumnDef<TableRow>[] = [];

        // TODO: add display column w/checkboxes if need row selection 
        // if _hasOwnProperty('rowSelection', props.options) { resolvedColumns.push(columHelper.display(...)) } // add display column w/checkboxes

        columns.map((col: UserDefinedColumn) => {
            columnDefs.push(
                columnHelper.accessor(row => getCellValue(col.id),
                    {
                        id: col.id,
                        cell: props => renderCell(props.getValue() as Cell),
                        // sortingFn: col.sort !== undefined && __resolveSortingFn(col.sort)
                    }

                )
            )
        });

        return columnDefs;
    }, []);

    console.log(resolvedColumns);

    return <div></div>
}

export default Table