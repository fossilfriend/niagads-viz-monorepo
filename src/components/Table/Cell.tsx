import React, { ReactNode } from 'react'

import {
    CheckIcon, CheckCircleIcon,
    ExclamationCircleIcon, ExclamationTriangleIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";

import { BasicType, Modify, TypeMapper, Expand, NAString } from "@common/types"
import { _isJSON, _deepCopy, _hasOwnProperty, _get, _isNull } from '@common/utils';
import { Color } from '@common/palettes';

import { Text } from '@text/BasicText';

const DEFAULT_NA_STRING = 'NA'

const BadgeIcons = {
    check: CheckIcon,
    solidCheck: CheckCircleIcon,
    info: ExclamationCircleIcon,
    warning: ExclamationTriangleIcon,
    user: UserCircleIcon
}

export type BadgeIconType = keyof typeof BadgeIcons;

export type GenericCell = BasicType | Record<string, BasicType | BasicType[]> | null

export type AbstractCell = {
    type: "abstract"
    value: BasicType | null
    naString?: NAString,
    rowId: number,
    columnId: number
}

export type StringCell = Expand<Modify<AbstractCell, { type: "string", value: string }>>

export type FloatCell = Expand<Modify<AbstractCell,
    { type: "float", value: number | null, precision?: number, useScientificNotation?: boolean }>>

export type TextCell = Expand<Modify<AbstractCell,
    { type: "text", truncateTo?: number, color?: Color, tooltip?: string }>>

export type BadgeCell = Expand<Modify<TextCell,
    { type: "badge", backgroundColor?: Color, borderColor?: Color, icon?: BadgeIconType }>>

export type BooleanCell = Expand<Modify<BadgeCell,
    {
        type: "boolean",
        value: boolean | null
        trueStr?: string // what value to display for TRUE (e.g., TRUE, Yes, Y, Coding); FALSE inferred
        nullAsFalse: boolean // assume null === FALSE
        falseStr?: string // if missing FALSE is displayed as empty string
    }>>

export type LinkCell = Expand<Modify<AbstractCell,
    { type: "link", url: string, target: string, tooltip?: string }>>

export type PercentageBarCell = Expand<Modify<FloatCell,
    { type: "percentage_bar", colors?: [Color, Color] }>>

export type Cell = PercentageBarCell | FloatCell | AbstractCell |  TextCell | BadgeCell | BooleanCell | LinkCell

// create CellType which is a list string keys corresponding to allowable "types" of cells
type CellTypeMapper = TypeMapper<Cell>
export type CellType = keyof CellTypeMapper
const CELL_TYPE_VALIDATION_REFERENCE = ["boolean", "abstract", "float", "text", "annotated_text", "badge", "link", "percentage_bar"]


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


// catch nulls are replace with props.naString
const __resolveValue = (props: Cell): BasicType => {
    const naString = _hasOwnProperty('naString', props) ? props.naString : DEFAULT_NA_STRING
    return _isNull(props.value) ? naString : _get('value', props)
}

// TODO: - not sure on this one; do we want it to return a boolean or a string?
const __resolveBooleanValue = (props: BooleanCell): BasicType => {
    if (_isNull(props.value)) {
        if (props.nullAsFalse) {
            return props.falseStr !== undefined ? props.falseStr : 'FALSE'
        }
        else {
            return __resolveValue(props)
        }
    }

    return (props.value === true)
        ? (props.trueStr !== undefined ? props.trueStr : 'TRUE')
        : (props.falseStr !== undefined ? props.falseStr : 'FALSE')
}

// cell accessor function; gets the value; resolves nulls
// will always return a string or number, possibly boolean if we refactor `__resolveBooleanCell`
// has to return "any" to satisfy react table accessorFn
export const getCellValue = (cellProps: Cell | Cell[]): any  => {
    if (Array.isArray(cellProps)) {
        // recursively get the values from the list items
        // and concatenate w/ '//' delimiter
        return cellProps.map((item) => getCellValue(item)).join(" // ");
    }
    else {
        const cellType: CellType = cellProps.type
        switch (cellType) {
            case "boolean":
                return __resolveBooleanValue(cellProps as BooleanCell)
            default:
                return __resolveValue(cellProps)
        }
    }
}


// assigns parent column cell type to each cell (to facilitate rendering)
// sets cell type to "abstract" if undefined
// does some error checking:
// 1. makes sure user specified a cell type to the parent column if cell value is an object/JSON

export const resolveCell = (cell: GenericCell | GenericCell[], cellType: CellType | undefined): GenericCell | GenericCell[] => {
    if (Array.isArray(cell)) {
        return cell.map((c: GenericCell) => (resolveCell(c, cellType) as GenericCell))
    }

    let resolvedCellType = cellType === undefined ? "abstract" : cellType
    let resolvedCell: GenericCell = {}

    if (_isJSON(cell)) {
        if (resolvedCellType === "abstract") {
            if (_hasOwnProperty('url', cell)) {
                resolvedCellType = "link"
            }
            else {
                resolvedCellType = "text"
            }
            console.warn("`type` must be specified in the column defintion to correctly interpret structured values; assuming `" 
                + resolvedCellType + "` cell: " + JSON.stringify(cell))
        }

        resolvedCell = _deepCopy(cell)
    }
    else {
        // we have a raw value, so create the 'value' k-v pair
        resolvedCell = Object.assign({ 'value': cell }, resolvedCell)
    }

    // assign the CellType
    resolvedCell = Object.assign({ 'type': resolvedCellType }, resolvedCell)

    return resolvedCell
}


export const renderCell = (cell: Cell) => {
    switch (cell.type) {
        case "abstract":
        case "text":
            return <Text props={cell}></Text>
        case "link":
            //return <Link props={cell}></Link>
        default:
            return <div><p><em>Cell Type</em>: {cell.type}</p><p>{JSON.stringify(cell)}</p></div>
        //throw Error("Unknown cell type for rendering")
    }

}

export const renderCellHeader = (label: string, helpText: string) => {
    return <div>{label}</div>
}
