import React, { ReactNode } from 'react'

import {
    CheckIcon, CheckCircleIcon,
    ExclamationCircleIcon, ExclamationTriangleIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";

import { Color } from "@common/palettes"
import { BasicType } from '@common/types'
import { Modify, TypeMapper, Expand } from "@common/types"
import { isJSON } from '@text/utils';

const NA_STRINGS = ['NA', 'N/A', 'NULL', '.', '']
const INTERNAL_NA_STR = 'NA'

type NAString = 'NA' | 'N/A' | 'NULL' | '.' | ''

const BadgeIcons = {
    check: CheckIcon,
    solidCheck: CheckCircleIcon,
    info: ExclamationCircleIcon,
    warning: ExclamationTriangleIcon,
    user: UserCircleIcon
}

export type BadgeIconType = keyof typeof BadgeIcons;

export type UserDefinedCell = BasicType | Record<string, BasicType | BasicType[]> | null

export type AbstractCell = {
    type: "abstract"
    value: BasicType | null
    naString?: NAString
}

export type StringCell = Expand<Modify<AbstractCell, {type: "string", value: string}>>

export type FloatCell = Expand<Modify<AbstractCell,
    { type: "float", value: number | null, precision?: number, useScientificNotation?: boolean }>>

export type TextCell = Expand<Modify<AbstractCell,
    { type: "text", truncateTo?: number }>>

export type AnnotatedTextCell = Expand<Modify<TextCell,
    { type: "annotated_text", color?: Color, tooltip?: ReactNode | string }>>

export type BadgeCell = Expand<Modify<AnnotatedTextCell,
    { type: "badge", backgroundColor?: Color, borderColor?: Color, icon?: BadgeIconType }>>

export type BooleanCell = Expand<Modify<BadgeCell,
    {
        type: "boolean",
        value: boolean | null
        trueStr?: string // what value to display for TRUE (e.g., TRUE, Yes, Y, Coding); FALSE inferred
        nullAsFalse: boolean // assume null === FALSE
        falseStr?: string // if missing FALSE is displayed as empty string
    }>>

export type LinkCell = Expand<Modify<AnnotatedTextCell,
    { type: "link", url: string}>>

export type PercentageBarCell = Expand<Modify<FloatCell,
    { type: "percentage_bar", colors?: [Color, Color] }>>

export type Cell =  PercentageBarCell | FloatCell | AbstractCell | AnnotatedTextCell | TextCell | BadgeCell | BooleanCell | LinkCell

// create CellType which is a list string keys corresponding to allowable "types" of cells
type CellTypeMapper = TypeMapper<Cell>
export type CellType = keyof CellTypeMapper
const CELL_TYPE_VALIDATION_REFERENCE = ["boolean", "abstract", "float", "text", "annotated_text", "badge",  "link", "percentage_bar"]


// validates cell type specified at runtime or by user is valid
// if cell type is undefined, returns "abstract"
export const validateCellType = (ctype: string | undefined): CellType => {
    if (ctype === undefined) {
        return "abstract" as CellType
    }

    if (typeof ctype === 'string' && CELL_TYPE_VALIDATION_REFERENCE.includes(ctype)) {
        return ctype as CellType // type assertion satisfies compiler
    }

    throw new Error("Invalid data type `" + ctype + "`");
}



// extract / resolve cell values for sort, filter, and download

const __isNull = (value: BasicType | null) => {
    if (value && typeof value === 'string' && NA_STRINGS.includes(value.toUpperCase())) {
        return true
    }
    return value === null || value === undefined
}

const __resolveNull = (props: Cell): BasicType => {
    return __isNull(props.value) ? !props.naString : !props.value
}

// TODO: - not sure on this one; do we want it to return a boolean or a string?
const __resolveBooleanNull = (props: BooleanCell): BasicType => {
    if (__isNull(props.value)) {
        if (props.nullAsFalse) {
            return props.falseStr !== undefined ? props.falseStr : 'FALSE'
        }
        else {
            return __resolveNull(props)
        }
    }
    return props.trueStr !== undefined ? props.trueStr : 'TRUE'
}

// cell accessor function; gets the value; resolves nulls
export const getCellValue = (cellProps: Cell | Cell[]): any => {
    if (Array.isArray(cellProps)) {
        // recursively get the values from the list items
        // and concatenate w/ '//' delimiter
        return cellProps.map((item) => getCellValue(item)).join(" // ");
    }
    else {
        const cellType: CellType = cellProps.type
        switch (cellType) {
            case "boolean":
                return __resolveBooleanNull(cellProps as BooleanCell)
            default:
                return __resolveNull(cellProps)
        }
    }
}

// TODO: do we want to review the whole column to infer data type or just assume strings if no cellType is specified?
// issue: what if first value is null?
const __resolveCell = (userCell: UserDefinedCell, cellType: string | undefined) => {
    //const cType: CellType === cellType ? "string"
    return userCell
}


// validate & transform incoming UserDefinedCells into Cells
//@ts-ignore
export const resolveCell = (userCell: UserDefinedCell | UserDefinedCell[], cellType: string | undefined) => {
    if (Array.isArray(userCell)) {
        return userCell.map((cell: UserDefinedCell) => {return resolveCell(cell, cellType)})
    }

    if (isJSON(userCell)) {
        if (cellType === undefined || cellType === "abstract") {
            throw Error("`type` must be specified in the column defintion to interpret structured values: " + JSON.stringify(userCell))
        }
    }

    return __resolveCell(userCell, cellType);
   
}


export const renderCell = (cell: Cell) => {
    return <div>JSON.stringify(cell)</div>
}

export const renderCellHeader = (label: string, helpText: string) => {
    return <div>label</div>
}

