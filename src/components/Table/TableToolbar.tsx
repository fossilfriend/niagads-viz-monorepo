import React, { useState, useMemo } from "react"

import { Table } from "@tanstack/react-table"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Select, Button } from "@components/UI"


interface ToolbarProps {
    table: Table<any>
    allowableExports: string[] | null
}

export const TableToolbar = ({ table }: ToolbarProps) => {

}