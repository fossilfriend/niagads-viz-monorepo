import React, { useMemo, useState, useEffect } from "react"
import { withErrorBoundary } from "react-error-boundary";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table"

import { _hasOwnProperty } from "@common/utils"

import { SortConfig, GenericColumn, getColumn } from "./Column"
import { Cell, GenericCell, getCellValue, renderCell, resolveCell, validateCellType } from "./Cell"
import { TableOptions} from "./TableProperties"
import { errorFallback } from "@common/errors"


export type TableRow = Record<string, GenericCell | GenericCell[]>
export type TableData = TableRow[]
export interface Table {
    options?: TableOptions
    columns: GenericColumn[]
    data: TableData
}



// FIXME: type of return should be custom sorting function
const __resolveSortingFn = (options: SortConfig) => {
    // ! point here says that as this point, we know options will not be undefined
    return _hasOwnProperty('sortingFn', options) ? options.sortingFn : 'alphanumeric'
}

const __resolveCell = (userCell: GenericCell | GenericCell[], column: GenericColumn, index:number) => {
    try {
        const cell = resolveCell(userCell, column?.type)
        return cell
    }
    catch (e: any) {
        throw Error("Validation Error parsing field value for row " + index + " column `" + column.id + "`.\n" + e.message)
    }
}

const Table: React.FC<Table> = ({ columns, data, options }) => {

    const [error, setError] = useState(null);

    const tableOptions: any = useMemo(() => {
        // from column definitions
        // hidden columns
        // initial sort
        // initial filter
    }, [])


    // translate GenericColumns to ColumnDefs 
    const resolvedColumns = useMemo(() => {
        const columnHelper = createColumnHelper<TableRow>();
        const columnDefs: ColumnDef<TableRow>[] = [];
        // TODO: add display column w/checkboxes if need row selection 
        // if _hasOwnProperty('rowSelection', props.options) { resolvedColumns.push(columHelper.display(...)) } // add display column w/checkboxes

        columns.forEach((col: GenericColumn) => {
            try {
                col.type = validateCellType(col.type)
            }
            catch (e: any) {
                throw Error("Error processing column definition for `" + col.id + "`.\n" + e.message)
            }
            columnDefs.push(
                //columnHelper.accessor()
                columnHelper.accessor(row => getCellValue(row[col.id] as Cell),
                    {
                        id: col.id,
                        // header: renderCellHeader(col.header, col.info),
                        cell: props => renderCell(props.getValue() as Cell, col.type!),
                        // sortingFn: col.sort !== undefined && __resolveSortingFn(col.sort)
                    }
                )
            )
        });
        return columnDefs;
    }, []);

    const resolvedData = useMemo(() => {
        const tableData: TableData = []
        const enFields = columns.length // expected number of fields
        try {  
            data.forEach((row: TableRow, index:number) => {
                // validate expected number of fields per row observed
                const onFields = Object.keys(row).length // observed number of fields
                if (onFields > enFields) {
                    throw new Error(`Too many values detected in row ${index}: expected ${enFields}; found ${onFields}`)
                }
                if (onFields < enFields) {
                    throw new Error(`Missing columns in row ${index}: each row must provide a value for every column`)
                }

                // 
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