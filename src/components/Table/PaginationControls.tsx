import React from "react"
import { Table } from "@tanstack/react-table"

import { Select } from "@components/UI/Select"

interface PaginationControlsProps {
    table: Table<any>
}

// Results per page <select> start-end row count of total rows <previous> <next>

export const PaginationControls = ({ table }: PaginationControlsProps) => {
    return <>
        <div className="flex float-right items-center gap-2">
            <Select fields={[0,10,20,50,100,500]} label="Results per page" id="pages" inline/>
        </div>
    </>
}

/*
const PaginationControls: React.FC<PaginationControlsProps> = ({
    table
}) => {

    return (
        <>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
             
            </div>
        </>
    )
}
*/
export default PaginationControls;
