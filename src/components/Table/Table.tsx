import React, { useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSort,
    faSortUp,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";

import { Column, TableData } from "./types";
import { resolveColumnAccessor } from "@table/ColumnAccessors";
import PaginationControls from "@table/PaginationControls";

interface TableProps<T> {
    data: TableData[];
    columns: Column<T>[];
}

const Table: React.FC<TableProps<any>> = ({ data, columns }) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const resolvedColumns = useMemo(() => {
        columns.forEach((col, index, cols) => {
            cols[index].accessorFn = resolveColumnAccessor(col.id, col.accessorType);
        });

        return columns;
    }, []);

    const table = useReactTable({
        data,
        columns: resolvedColumns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <table className="table-auto">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    sort: <FontAwesomeIcon icon={faSort} />,
                                                    asc: <FontAwesomeIcon icon={faSortUp} />,
                                                    desc: <FontAwesomeIcon icon={faSortDown} />,
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    <>{cell.renderValue()}</>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaginationControls table={table} />
        </>
    );
};

export default Table;
