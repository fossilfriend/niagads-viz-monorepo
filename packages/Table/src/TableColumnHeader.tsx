import React, { useMemo, useState, useEffect } from "react"

import { TableRow } from "./TableProperties"
import { flexRender, Header } from "@tanstack/react-table"

import { ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";

import { Button, renderTooltip } from "@bug_sam/ui";
import { _get } from "@bug_sam/common";
import { Filter } from "./Filter";

const __TAILWIND_CSS = {
    root: "bg-primary/10 px-6 py-3 border-0 border-r-[1px] border-solid border-slate-50",
    text: "text-sm text-nowrap text-slate-700  font-bold", //"px-2",
    icon: "ml-1 text-slate-700 pl-px size-5",
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
    const isSorted = header.column.getIsSorted()
    const SortIcon = __ICONS[isSorted !== false ? isSorted : 'sort']
    const description = _get('description', header.column.columnDef.meta)
    const [filterOpen, setFilterOpen] = useState(false);
    
    return (
        <th key={header.id} scope="col" className={`${__TAILWIND_CSS.root} ${__TAILWIND_CSS.text}`}>
            <div className="inline-flex">
                <div
                    className={`inline-flex py-1 ${header.column.getCanSort() ? "cursor-pointer" : "cursor-default"}`}
                    onClick={header.column.getToggleSortingHandler()}
                >
                    <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                    {description &&
                        renderTooltip(
                            <InformationCircleIcon className="info-bubble ml-1 text-slate-500" />,
                            description
                        )}
                    {header.column.getCanSort() ? <SortIcon className={__TAILWIND_CSS.icon}> </SortIcon> : null}
                </div>

                {header.column.getCanFilter() && (
                    <div className="ml-5">
                        <Button variant="primary" size="sm" onClick={() => setFilterOpen(!filterOpen)}>
                            <FunnelIcon className="icon-button stroke-white"></FunnelIcon>
                        </Button>
                    </div>
                )}
            </div>
            {filterOpen && (
                <Filter column={header.column} />
            )}
        </th>
    );
}

