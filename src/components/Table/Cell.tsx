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

export type UserDefinedCell = BasicType | Record<string, BasicType | BasicType[]>

export type BasicCell = {
    type: "basic"
    value: string | null
    naString?: NAString
}

export type FloatCell = Expand<Modify<BasicCell,
    { type: "float", value: number | null, precision?: number, useScientificNotation?: boolean }>>

export type TextCell = Expand<Modify<BasicCell,
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

export type NumericCell =  PercentageBarCell | FloatCell
export type StringCell = BasicCell | AnnotatedTextCell | TextCell | BadgeCell | BooleanCell | LinkCell
export type Cell = NumericCell | StringCell

// create CellTypes which is a list string keys corresponding to allowable "types" of cells
type CellTypeMapper = TypeMapper<Cell>
export type CellTypes = keyof CellTypeMapper

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
        const cellType: CellTypes = cellProps.type
        switch (cellType) {
            case "boolean":
                return __resolveBooleanNull(cellProps as BooleanCell)
            default:
                return __resolveNull(cellProps)
        }
    }
}

const __resolveBasicCell = (userCell: UserDefinedCell) => {
    
}


// validate & transform incoming UserDefinedCells into Cells
export const resolveCell = (userCell: UserDefinedCell) => {
    if (isJSON(userCell)) {

    }
    else return __resolveBasicCell(userCell);
   
}


export const renderCell = (cell: Cell) => {
    return <div>JSON.stringify(cell)</div>
}

export const renderCellHeader = (label: string, helpText: string) => {
    return <div>label</div>
}

