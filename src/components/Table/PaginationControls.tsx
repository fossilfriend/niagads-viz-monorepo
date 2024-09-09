import React, { useState, useMemo } from "react"

import { Table } from "@tanstack/react-table"

import _range from "lodash.range"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Select, Button } from "@components/UI"
import range from "lodash.range"


interface PaginationControlsProps {
    table: Table<any>
}

// Results per page <select> start-end row count of total rows <previous> <next>

const __generatePageSizeOptions = (nRows: number) => {
    let nearestTenth = Math.ceil(nRows / 10) * 10

    if (nearestTenth >= 500)
        return [10, 20, 30, 40, 50, 100, 500]
    else if (nearestTenth >= 100)
        return [10, 20, 30, 40, 50, 100]
    else if (nearestTenth >= 50)
        return range(10, 60, 10) // range is up to but not including end
    else if (nearestTenth > 10)
        return range(10, nearestTenth + 10, 10)

    return [10]
}

export const PaginationControls = ({ table }: PaginationControlsProps) => {
    const [pageSize, setPageSize] = useState<number>(table.getState().pagination.pageSize)
    const [nRows, setNRows] = useState<number>(table.getRowCount())
    const pageSizeOptions = useMemo(() => (__generatePageSizeOptions(nRows)), [nRows])

    const minDisplayedRow = table.getState().pagination.pageIndex * pageSize + 1
    let maxDisplayedRow = minDisplayedRow + pageSize - 1
    if (maxDisplayedRow > nRows) maxDisplayedRow = nRows

    return <>
        <div className="m-2">
            <div className="inline-flex float-right gap-2">
                <Select defaultValue={pageSize.toString()} fields={pageSizeOptions} 
                    onChange={(e:any) => {table.setPageSize(Number(e.target.value))}}
                    label="Results per page" id="pages" inline mode='plain' />
                <p className="text-sm text-gray-900 px-2">{minDisplayedRow} - {maxDisplayedRow} of {nRows}</p>
                <Button mode="white" onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeftIcon className={`icon-button ${!table.getCanPreviousPage() ? 'icon-disabled' : ''}`}></ChevronLeftIcon>
                </Button>
                <Button mode="white" onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ChevronRightIcon className={`icon-button ${!table.getCanNextPage() ? 'icon-disabled' : ''}`}></ChevronRightIcon>
                </Button>
            </div>
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
