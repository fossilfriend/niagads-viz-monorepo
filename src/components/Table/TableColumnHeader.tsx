import React, { useMemo, useState, useEffect } from "react"

import { TableRow } from "@table/TableProperties"
import { flexRender, Header } from "@tanstack/react-table"

import { ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";

import { Button } from "@components/UI/Button";

const __TAILWIND_CSS = {
    root: "text-sm text-nowrap text-white bg-primary px-6 py-3 font-normal", //"px-2",
    icon: "ml-1 text-white pl-px size-5",
    sortable: "cursor-pointer"
}

interface TableColumnHeader {
    header: Header<TableRow, unknown>
}

const __ICONS = {
    sort: ArrowsUpDownIcon,
    asc: ArrowUpIcon,
    desc: ArrowDownIcon
}


export const TableColumnHeader = ({ header }: TableColumnHeader) => {

    const canSort = header.column.getCanSort()
    const isSorted = header.column.getIsSorted()
    const SortIcon = __ICONS[isSorted !== false ? isSorted : 'sort']

    return <th key={header.id} scope="col" className={__TAILWIND_CSS.root}>
        <div className="inline-flex">
            <div className={`inline-flex ${header.column.getCanSort() ? "cursor-pointer" : "cursor-default"}`}
                onClick={header.column.getToggleSortingHandler()}>
                <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                {header.column.getCanSort() ? <SortIcon className={__TAILWIND_CSS.icon}> </SortIcon> : null}
            </div>
            {/* TODO: make into toggle button */}
            {
                header.column.getCanFilter() && 
                <FunnelIcon className={`${__TAILWIND_CSS.icon} ml-8`}></FunnelIcon>
            }
        </div>

    </th>
}