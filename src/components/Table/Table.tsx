import React, {useMemo}  from "react"

import { createColumnHelper, ColumnDef } from "@tanstack/react-table"
import { SortConfig, UserDefinedColumn } from "./column"
import { Cell, CellTypes, getCellValue } from "./cell"
import { TableRow, UserDefinedTableProps, TableProps } from "./table"
import { renderCell } from "./rendering"

// TODO: move to common utils?
const __hasOption = (key:string, options: Record<string, any>) => (options !== undefined && options.hasOwnProperty(key))

// FIXME: type of return should be custom sorting function
const __resolveSortingFn = (options:SortConfig) => {
    // ! point here says that as this point, we know options will not be undefined
    return __hasOption('sortingFn', options) ? options.sortingFn : 'alphanumeric'
}

const Table: React.FC<UserDefinedTableProps> = (props) => {
    // const tableOptions = props.options !== undefined ? props.options : undefined;

    const tableOptions: any = useMemo(() => {
        // from column definitions
            // hidden columns
            // initial sort
            // initial filter
    }, [])

    const columns:any = useMemo(() => {
        const columnHelper = createColumnHelper<TableRow>()

        const resolvedColumns: ColumnDef<TableRow>[] = []
        // TODO: add display column w/checkboxes if need row selection 
        // if __hasOption('rowSelection', props.options) { resolvedColumns.push(columHelper.display(...)) } // add display column w/checkboxes

        props.columns.map((col: UserDefinedColumn) => {

            resolvedColumns.push(
                columnHelper.accessor(row => getCellValue(col.id),
                    {
                        id: col.id,
                        cell: props => renderCell(props.getValue() as Cell),
                        // sortingFn: col.sort !== undefined && __resolveSortingFn(col.sort)
                    }

                )
            )
        })
        

       
        },
    []);
  /*
const resolvedColumns = useMemo<ColumnDef<TableData>[]>(() => {
    const columnHelper = createColumnHelper<TableData>();

    const resolved: ColumnDef<TableData>[] = [];

    columns.forEach((col) => {
        resolved.push(columnHelper.accessor(
            resolveColumnAccessor(col.id, col.accessorType),
            {
                id: col.id,
                cell: c => c.getValue(),
                sortingFn: CustomSortingFunctions[col.sortType as CustomSortingFn],
                enableSorting: col.canSort,
            }
        ))
    });

    return resolved;
}, [columns]);*/


    return <div></div>
}