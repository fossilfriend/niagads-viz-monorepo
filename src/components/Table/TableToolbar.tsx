import React, { useState, useMemo } from "react"

import { Table } from "@tanstack/react-table"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Select, Button } from "@components/UI"
import { FileFormat } from "@common/types"

// column.getCanHide

interface ToolbarProps {
    table: Table<any>
    exportTypes: FileFormat[]
}

const TableToolbar = ({table, exportTypes}: ToolbarProps) => {
    return <></>
}
