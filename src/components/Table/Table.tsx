import React, { useMemo, useState } from "react"
import { withErrorBoundary } from "react-error-boundary";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table"

import { _hasOwnProperty } from "@common/utils"

import { SortConfig, UserDefinedColumn, getColumn } from "./Column"
import { Cell, CellType, UserDefinedCell, getCellValue, renderCell, resolveCell, validateCellType } from "./Cell"
import { UserDefinedTable, UserDefinedRow, UserTableProps } from "./UserDefinedTable"
import { errorFallback } from "@common/errors"


type TableRow = Record<string, Cell | Cell[]>;
type TableData = TableRow[]


// FIXME: type of return should be custom sorting function
const __resolveSortingFn = (options: SortConfig) => {
    // ! point here says that as this point, we know options will not be undefined
    return _hasOwnProperty('sortingFn', options) ? options.sortingFn : 'alphanumeric'
}

const __resolveCell = (userCell: UserDefinedCell | UserDefinedCell[], column: UserDefinedColumn, index:number) => {
    try {
        const cell = resolveCell(userCell, column?.type)
        return cell
    }
    catch (e: any) {
        throw Error("Validation Error parsing field value for row " + index + " column `" + column.id + "`.\n" + e.message)
    }
}

const Table: React.FC<UserDefinedTable> = ({ columns, data, options }) => {

    const [error, setError] = useState(null);

    const tableOptions: any = useMemo(() => {
        // from column definitions
        // hidden columns
        // initial sort
        // initial filter
    }, [])


    // translate UserDefinedColumns to ColumnDefs 
    const resolvedColumns = useMemo(() => {
        const columnHelper = createColumnHelper<TableRow>();
        const columnDefs: ColumnDef<TableRow>[] = [];
        // TODO: add display column w/checkboxes if need row selection 
        // if _hasOwnProperty('rowSelection', props.options) { resolvedColumns.push(columHelper.display(...)) } // add display column w/checkboxes

        columns.forEach((col: UserDefinedColumn) => {
            try {
                col.type = validateCellType(col.type)
            }
            catch (e: any) {
                throw Error("Error processing column definition for `" + col.id + "`.\n" + e.message)
            }
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

        try {
            data.forEach((row: UserDefinedRow, index:number) => {
                const tableRow: TableRow = {}
                for (const [columnId, value] of Object.entries(row)) {
                    let currentColumn = getColumn(columnId, columns)
                    if (currentColumn === undefined) {
                        throw new Error("Invalid column name found in table data definition `" + columnId + "`");
                    }

                    tableRow[columnId] = __resolveCell(value, currentColumn, index)
                }

                tableData.push(tableRow)
            });
        }
        catch (e: any) {
            throw Error(e.message)
        }
        return tableData;
    }, [columns])


    return <div>
        <h3>Columns: {JSON.stringify(resolvedColumns)}</h3>
        <p> Data: {JSON.stringify(resolvedData)}</p>
    </div>
}


const TableWithErrorBoundary = withErrorBoundary(Table, {
    FallbackComponent: errorFallback,
    onError(error, info) {
        console.error(error);
    },
})

export default TableWithErrorBoundary