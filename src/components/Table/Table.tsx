

import React, { useMemo } from "react"
import { createColumnHelper, ColumnDef } from "@tanstack/react-table"

import { _hasOwnProperty } from "@common/utils"

import { SortConfig, UserDefinedColumn } from "./Column"
import { Cell, CellTypes, UserDefinedCell, getCellValue, renderCell } from "./Cell"
import { UserDefinedTable, UserDefinedRow, UserTableProps } from "./UserDefinedTable"


type TableRow = Record<string, Cell | Cell[]>;
type TableData = TableRow[]




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

    const resolvedColumns = useMemo(() => {
        const columnHelper = createColumnHelper<TableRow>();
        const columnDefs: ColumnDef<TableRow>[] = [];
        // TODO: add display column w/checkboxes if need row selection 
        // if _hasOwnProperty('rowSelection', props.options) { resolvedColumns.push(columHelper.display(...)) } // add display column w/checkboxes

        columns.forEach((col: UserDefinedColumn) => {  
            columnDefs.push(
                //columnHelper.accessor()
                columnHelper.accessor(row => getCellValue(row[col.id]),
                    {
                        id: col.id,
                        // header: renderCellHeader(col.header, col.info),
                        cell: props => renderCell(props.getValue() as Cell),
                        // sortingFn: col.sort !== undefined && __resolveSortingFn(col.sort)
                    }
                )
            )
        });
        return columnDefs;
    }, []);

    const resolvedData = useMemo(() => {
        const tableData: TableData = []
        const tableRow: TableRow = {}
        data.map((row: UserDefinedRow) => {
            // validate columns
            asserts __validateColumn
            for (const [columnId, value] of Object.entries(row)) {

                //const cellType = resolveCellType(columns)
            }
    
        });
        return tableData;
    }, [])


    return <div>{JSON.stringify(resolvedColumns)}</div>
}

export default Table