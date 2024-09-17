// TODO: put sorting back in
// TODO: filtering

import React, { useMemo, useState, useLayoutEffect } from "react"
import { withErrorBoundary } from "react-error-boundary";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    createColumnHelper,
    ColumnDef,
    HeaderGroup,
} from "@tanstack/react-table"

import { _get, _hasOwnProperty, toTitleCase } from "@common/utils"
import { errorFallback } from "@common/errors"

import {
    Cell,
    GenericCell,
    getCellValue,
    renderCell,
    resolveCell,
    validateCellType
} from "@table/Cell"
import { TableConfig, TableData, TableRow } from "@table/TableProperties";
import { ColumnSortConfig, GenericColumn, getColumn } from "@table/Column"
import { PaginationControls } from "@table/PaginationControls";
import { TableColumnHeader } from "@table/TableColumnHeader";
import { Checkbox } from "@components/UI/Checkbox";
import { Button } from "@components/UI";
import { RadioButton } from "@components/UI/RadioButton";

const __TAILWIND_CSS = {
    container: "block mx-2 max-w-full", //"block max-w-full relative shadow-md",
    table_border: "border-collapse border-0 border-t-[4px] border-solid border-black",
    table_layout: "w-full overflow-x-scroll",
    table_text: "text-sm text-left rtl:text-right text-gray-700",
    td: "py-1.5 pr-6 pl-4 text-xs font-roboto border-solid border-slate-200 border-0 border-b-[1px] border-r-[1px]",
    dtr: "hover:bg-gray-50 bg-white border-b odd:border-gray-700"
}

const TABLE_CLASSES = `${__TAILWIND_CSS.table_border} ${__TAILWIND_CSS.table_layout} ${__TAILWIND_CSS.table_text}`

export interface Table {
    options?: TableConfig
    columns: GenericColumn[]
    data: TableData
}


// FIXME: type of return should be custom sorting function
const __resolveSortingFn = (options: ColumnSortConfig) => {
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

// NOTE: according to documentation https://tanstack.com/table/latest/docs/guide/column-visibility#column-visibility-state
// the HeaderGroup API will take column visibility into account
const __renderTableHeader = (hGroups: HeaderGroup<TableRow>[]) => (
    <thead>
        {hGroups.map((headerGroup: HeaderGroup<TableRow>) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                        <TableColumnHeader key={header.id} header={header} />
                    );
                })}
            </tr>
        ))}
    </thead>
)


// TODO: use table options to initialize the state (e.g., initial sort, initial filter)
const Table: React.FC<Table> = ({ columns, data, options }) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const enableRowSelect = !!options?.rowSelect?.onRowSelect


    // translate GenericColumns to ColumnDefs 
    const resolvedColumns = useMemo<ColumnDef<TableRow>[]>(() => {
        const columnHelper = createColumnHelper<TableRow>();
        const columnDefs: ColumnDef<TableRow>[] = [];

        if (enableRowSelect) {
            const multiSelect: boolean = !!options?.rowSelect?.disableMultiSelect;
            columnDefs.push(
                {
                    id: 'select-col',
                    header: ({ table }) => (
                        multiSelect ?
                            <div>
                                <span>{options?.rowSelect?.header}</span>
                                <Button variant="secondary"
                                    disabled={table.getIsSomeRowsSelected()}
                                    onClick={() => { table.resetRowSelection(true) }}>
                                    Clear Selection
                                </Button>
                            </div>
                            : options?.rowSelect?.header
                    ),
                    meta: { description: _get('description', options?.rowSelect?.description) },
                    cell: ({ row }) => (
                        multiSelect ? <Checkbox
                            variant="secondary"
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            onChange={row.getToggleSelectedHandler()}
                        /> : <RadioButton
                            variant="pink"
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            onChange={row.getToggleSelectedHandler()} />
                    ),
                },
            )
        }



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
                        header: _get('header', col, toTitleCase(col.id)),
                        enableColumnFilter: _get('canFilter', col, true),
                        enableGlobalFilter: _get('disableGlobalFilter', col, false),
                        enableSorting: _get('canSort', col, true),
                        enableHiding: !(_get('required', col, false)), // if required is true, enableHiding is false
                        meta: { description: _get('description', col) },
                        cell: props => renderCell(props.cell.row.original[col.id] as Cell),
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
        /* defaultColumn: {
            size: 150,
            minSize: 0,
            maxSize: 300,
        }, */
        enableColumnResizing: true
        /*state: { sorting },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),      
        */
        // sortingFns: CustomSortingFunctions,
    });

    useLayoutEffect(() => {
        if (options?.onTableLoad) {
            // TODO: if (firstUpdate.current)  // firstUpdate is a useRef / from GenomicsDB code / something to do w/linked panels and too many re-renders
            table && options.onTableLoad(table);
        }
    }, [table]);


    return (
        table ? (<>
            <div className={__TAILWIND_CSS.container}>
                <PaginationControls table={table} />
                <div className="overflow-auto">
                    <table className={TABLE_CLASSES}>
                        {__renderTableHeader(table.getHeaderGroups())}
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className={__TAILWIND_CSS.dtr}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td className={__TAILWIND_CSS.td} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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