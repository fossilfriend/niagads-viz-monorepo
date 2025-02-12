import { Column } from "@tanstack/react-table"
import React, { useMemo, useState, useEffect } from "react"
import { _get } from "@bug_sam/common";
import { SearchInput } from "@bug_sam/ui";

interface Filter {
    column: Column<any, unknown>;
}

export const Filter = ({ column }: Filter) => {
    const columnFilterValue = column.getFilterValue();
    const colType = _get("type", column.columnDef.meta);

    const sortedUniqueValues = useMemo(() => {
        return Array.from(column.getFacetedUniqueValues().keys()).sort()
    }, [column.getFacetedUniqueValues()])

    return colType === "range" ? (
        <div>
            <div className="flex space-x-2">
                {/* See faceted column filters example for min max values functionality */}
                <SearchInput
                    value={`${(columnFilterValue as [number, number])?.[0]}`}
                    onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
                    placeholder={`Min`}
                />
                <SearchInput
                    value={`${(columnFilterValue as [number, number])?.[1]}`}
                    onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
                    placeholder={`Max`}
                />
            </div>
            <div className="h-1" />
        </div>
    ) : colType === "boolean" ? (
        <select onChange={(e) => column.setFilterValue(e.target.value)} value={columnFilterValue?.toString()}>
            {sortedUniqueValues.map(val => (
                <option value={val} key={val}>
                    {val}
                </option>
            ))}
        </select>
    ) : (
        <SearchInput
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Search...`}
            value={(columnFilterValue ?? "") as string}
        />
    );
};
