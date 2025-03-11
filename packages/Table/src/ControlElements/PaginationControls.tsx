import React, { useState, useMemo } from "react";

import { Table as ReactTable } from "@tanstack/react-table";
import range from "lodash.range";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { Button, Select, SelectItem } from "@heroui/react";

interface PaginationControlsProps {
    table: ReactTable<any>;
}

const __generatePageSizeOptions = (nRows: number) => {
    const nearestTenth = Math.ceil(nRows / 10) * 10;

    if (nearestTenth >= 500) return [10, 20, 30, 40, 50, 100, 500];
    else if (nearestTenth >= 100) return [10, 20, 30, 40, 50, 100];
    else if (nearestTenth >= 50)
        return [
            10,
            20,
            30,
            40,
            50,
            nRows,
        ]; // range is up to but not including end
    else if (nearestTenth >= 10 && nRows >= 10) {
        const options = range(10, nearestTenth + 10, 10);
        options.push(nRows);
        return options;
    }

    return [nRows];
};

export const PaginationControls = ({ table }: PaginationControlsProps) => {
    const [pageSize, setPageSize] = useState<number>(
        table.getState().pagination.pageSize
    );
    const nRows = table.getPrePaginationRowModel().rows.length;
    const pageSizeOptions = useMemo(
        () => __generatePageSizeOptions(nRows),
        [nRows]
    );

    const minDisplayedRow =
        table.getState().pagination.pageIndex * pageSize + 1;
    let maxDisplayedRow = minDisplayedRow + pageSize - 1;
    if (maxDisplayedRow > nRows) maxDisplayedRow = nRows;

    const onChangePageSize = (pSize: number) => {
        table.setPageSize(pSize);
        setPageSize(pSize);
    };

    return (
        <>
            <div className="flex flex-row gap-4" aria-label="pagination">
                <Select className="max-w-xs" labelPlacement="outside-left" size="md"
                    defaultSelectedKeys={[pageSizeOptions[0].toString()]}
                    aria-label="Select results per page"
                    value={pageSizeOptions[0]}
                    label="Results per page" id="pages" onChange={(e: any) => {onChangePageSize(Number(e.target.value));}}>
                    {pageSizeOptions.map((v) => <SelectItem key={v.toString()}>{v.toString()}</SelectItem>)}
                </Select>

                <div className="self-center text-sm text-gray-900 px-2">
                    {minDisplayedRow} - {maxDisplayedRow} of {nRows}
                </div>
                <Button
                    aria-label="pagination-previous"
                    isIconOnly={true}
                    onPress={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon
                        className={`icon-button stroke-1 ${!table.getCanPreviousPage()
                                ? "stroke-slate-300"
                                : "stroke-black"
                            }`}
                    ></ChevronLeftIcon>
                </Button>
                <Button
                    aria-label="pagination-next"
                    isIconOnly={true}
                    variant="light"
                    onPress={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon
                        className={`icon-button stroke-1 ${!table.getCanNextPage()
                                ? "stroke-slate-300;"
                                : "stroke-black"
                            }`}
                    ></ChevronRightIcon>
                </Button>
            </div>
        </>
    );
};
