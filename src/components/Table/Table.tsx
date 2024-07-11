// TODO: put sorting back in
// TODO: filtering

import React, { useMemo, useState, useEffect } from "react"
import { withErrorBoundary } from "react-error-boundary";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    createColumnHelper,
    ColumnDef,
} from "@tanstack/react-table"

import { ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

import { _get, _hasOwnProperty } from "@common/utils"
import { errorFallback } from "@common/errors"

import { SortConfig, GenericColumn, getColumn } from "./Column"
import { Cell, GenericCell, getCellValue, renderCell, resolveCell, validateCellType } from "./Cell"
import { TableConfig } from "./TableProperties"
import PaginationControls from "./PaginationControls";


const TAILWIND_TABLE = {
    table: "table-auto", //"table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse",
    thead: "", //"uppercase text-xs text-left text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
    th: "", //"px-2",
    htr: "",
    td: "",
    dtr: "hover:bg-gray-50 bg-white border-b dark:bg-gray-800 odd:border-gray-700"
}

export type TableRow = Record<string, GenericCell | GenericCell[]>
export type TableData = TableRow[]
export interface Table {
    options?: TableConfig
    columns: GenericColumn[]
    data: TableData
}


// FIXME: type of return should be custom sorting function
const __resolveSortingFn = (options: SortConfig) => {
    // ! point here says that as this point, we know options will not be undefined
    return _hasOwnProperty('sortingFn', options) ? options.sortingFn : 'alphanumeric'
}

const __resolveCell = (userCell: GenericCell | GenericCell[], column: GenericColumn, index: number) => {
    try {
        const cell = resolveCell(userCell, column)
        return cell
    }
    catch (e: any) {
        throw Error("Validation Error parsing field value for row " + index + " column `" + column.id + "`.\n" + e.message)
    }
}



// add row and column indexes to the object so that unique ui keys can be generated 
// if required; e.g., tooltips
// TODO: array of values?!
const __resolveRenderableCell = (value: Cell, rowId: string, columnId: string): Cell => (
    Object.assign(
        {
            rowId: rowId,
            columnId: columnId,
        },
        value)
)



const Table: React.FC<Table> = ({ columns, data, options }) => {

    const [sorting, setSorting] = useState<SortingState>([]);

    // TODO: parse table options from column definitions to set the following
    // to be later passed to the useReactTable config
    const tableOptions: any = useMemo(() => {
        // from column definitions
        // hidden columns
        // initial sort
        // initial filter
    }, [])


    // translate GenericColumns to ColumnDefs 
    const resolvedColumns = useMemo<ColumnDef<TableRow>[]>(() => {
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
                columnHelper.accessor(row => getCellValue(row[col.id as keyof typeof row] as Cell),
                    {
                        id: col.id,
                        // TODO: custom renderer for cell headers that has information bubbles
                        // header: renderCellHeader(col.header, col.description),
                        cell: props => renderCell(__resolveRenderableCell(props.cell.row.original[col.id] as Cell, props.row.id, props.column.id)),
                        // TODO: sortingFn: col.sort !== undefined && __resolveSortingFn(col.sort)
                    }
                )
            )
        });
        return columnDefs;
    }, []);

    const resolvedData = useMemo<TableData>(() => {
        let tableData: TableData = []
        const enFields = columns.length // expected number of fields
        try {
            data.forEach((row: TableRow, index: number) => {
                // validate expected number of fields per row observed
                const onFields = Object.keys(row).length // observed number of fields
                if (onFields > enFields) {
                    throw new Error(`Too many values detected in row ${index}: expected ${enFields}; found ${onFields}`)
                }
                if (onFields < enFields) {
                    throw new Error(`Missing columns in row ${index}: each row must provide a value for every column`)
                }

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


    const table = useReactTable({
        data: resolvedData,
        columns: resolvedColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        /*state: { sorting },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),      
        defaultColumn: {
            size: 150,
            minSize: 20,
            maxSize: 300,
        },*/
        // sortingFns: CustomSortingFunctions,
    });


    return (
        table ? (<>
            <table className={TAILWIND_TABLE.table}>
                <thead className={TAILWIND_TABLE.thead}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className={TAILWIND_TABLE.htr}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan} scope="col" className={TAILWIND_TABLE.th}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                style={
                                                    header.column.getCanSort() ? { "cursor": "pointer" } : {}
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    sort: <ArrowsUpDownIcon className="h4 text-blue-600 pl-px" />,
                                                    asc: <ArrowUpIcon className="h-4 text-blue-600 pl-px" />,
                                                    desc: <ArrowDownIcon className="h-4 text-blue-600 pl-px" />,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className={TAILWIND_TABLE.dtr}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table >
            <PaginationControls table={table} />
        </>
        ) :
            <div>No data</div>
    )
}


const TableWithErrorBoundary = withErrorBoundary(Table, {
    FallbackComponent: errorFallback,
    onError(error, info) {
        console.error(error);
    },
})

export default TableWithErrorBoundary