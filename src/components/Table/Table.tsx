import React, {useMemo}  from "react"

import { createColumnHelper } from "@tanstack/react-table"
import { UserDefinedColumn } from "./column"
import { getCellValue } from "./cell"
import { UserDefinedTableData, UserDefinedTableProps } from "./table"

const Table: React.FC<UserDefinedTableProps> = (props) => {
    const tableOptions = props.options !== undefined ? props.options : undefined;

    const columns:any = useMemo(() => {
        const columnHelper = createColumnHelper()
        return columns.forEach((col: UserDefinedColumn) => {
        })
      
        },
    [props.columns]);
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