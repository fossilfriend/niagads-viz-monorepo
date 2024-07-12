import React, { ReactNode } from 'react'


import { BasicType, Modify, TypeMapper, Expand, NAString } from "@common/types"
import { _isJSON, _deepCopy, _hasOwnProperty, _get, _isNull, _isNA } from '@common/utils'
import { Color } from '@common/palettes'

import { Text } from '@text/BasicText'
import { Link } from '@text/Link'
import { GenericColumn } from './Column'
import { Badge, BooleanBadge } from '@text/Badge'
import { ICONS } from "@text/TextRenderer"

export const DEFAULT_NA_VALUE = 'NA'

export type BadgeIconType = keyof typeof ICONS;

export type GenericCell = BasicType | Record<string, BasicType | BasicType[]> | null

export type AbstractCell = {
    type: "abstract"
    value: BasicType | null
    rowId: number,
    columnId: number
    nullValue?: BasicType | null // if not set, treats null as NA
    naValue?: NAString  // (internal) value to assign to NAs for consistency, defaults to `NA`
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
        displayText?: string // what value to display (e.g., TRUE, Yes, Y, Coding, FALSE, N, No, etc)
    }>>

export type LinkCell = Expand<Modify<AbstractCell,
    { type: "link", url: string, displayText: string, tooltip?: string }>>

export type PercentageBarCell = Expand<Modify<FloatCell,
    { type: "percentage_bar", colors?: [Color, Color] }>>

export type Cell = PercentageBarCell | FloatCell | AbstractCell | TextCell | BadgeCell | BooleanCell | LinkCell

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


// catch NULLs and NAs
const __resolveValue = (props: Cell): BasicType => {
    const naValue = _get('naValue', props, DEFAULT_NA_VALUE)
    const nullValue = _get('nullValue', props, naValue)
    return _isNull(props.value) ? nullValue 
        : (_isNA(props.value) ? naValue : _get('value', props))
}

const __resolveBooleanValue = (props: BooleanCell): BasicType => {
    const displayText = _get('displayText', props)
    return (displayText) ? displayText : __resolveValue(props)
}

// cell accessor function; gets the value; resolves nulls
// will always return a string or number, possibly boolean if we refactor `__resolveBooleanCell`
// has to return "any" to satisfy react table accessorFn
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
                return __resolveBooleanValue(cellProps as BooleanCell)
            default:
                return __resolveValue(cellProps)
        }
    }
}


const __resolveLinkCell = (cell: GenericCell): GenericCell => {
    const displayText = _get('displayText', cell)
    const url = _get('url', cell)
    Object.assign(cell as any, { 'value': displayText ? displayText : url, 'type': 'link' })
    return cell
}

// assigns parent column cell type to each cell (to facilitate rendering)
// sets cell type to "abstract" if undefined
// does some error checking:
// 1. makes sure user specified a cell type to the parent column if cell value is an object/JSON

export const resolveCell = (cell: GenericCell | GenericCell[], column: GenericColumn): GenericCell | GenericCell[] => {
    if (Array.isArray(cell)) {
        return cell.map((c: GenericCell) => (resolveCell(c, column) as GenericCell))
    }

    let resolvedCellType = _get('type', column, "abstract")
    let resolvedCell: GenericCell = {}

    if (_isJSON(cell)) {
        resolvedCell = _deepCopy(cell)

        if (resolvedCellType == "link") {
            resolvedCell = __resolveLinkCell(resolvedCell)
        }

        if (resolvedCellType === "abstract") {
            if (_hasOwnProperty('url', cell)) {
                resolvedCellType = "link"
                resolvedCell = __resolveLinkCell(resolvedCell)
            }
            else {
                resolvedCellType = "text"
            }
            console.warn("`type` must be specified in the column defintion to correctly interpret structured values; assuming `"
                + resolvedCellType + "` cell: " + JSON.stringify(cell))
        }

        // already caught this if a link
        const RESOLVED_DISPLAYS = ["link", "boolean"]
        if (!RESOLVED_DISPLAYS.includes(resolvedCellType) && _get('value', cell) == null) {
            if (_get('displayText', cell) != null) {
                Object.assign(resolvedCell as any, { 'value': _get('displayText', cell) })
                console.warn("Missing `value` field.  Setting `displayText` to value for cell: " + JSON.stringify(cell))
            }
            else {
                throw Error("unable to infer `value` for cell: " + JSON.stringify(cell))
            }
        }

    }
    else {
        // we have a raw value, so create the 'value' k-v pair
        Object.assign(resolvedCell as any, { 'value': cell })
    }

    // assign relevant column properties & cell type
    Object.assign(resolvedCell as any, {
        'type': resolvedCellType,
        'nullValue': _get('nullValue', column),
        'naValue': _get('naValue', column, DEFAULT_NA_VALUE)
    })

    return resolvedCell
}


export const renderCell = (cell: Cell) => {
    switch (cell.type) {
        case "abstract":
        case "text":
            return <Text props={cell}></Text>
        case "link":
            return <Link props={cell}></Link>
        case "boolean":
            return <BooleanBadge props={cell}></BooleanBadge>
        case "badge":
            return <Badge props={cell}></Badge>
        default:
            return <div><p><em>Cell Type</em>: {cell.type}</p><p>{JSON.stringify(cell)}</p></div>
        //throw Error("Unknown cell type for rendering")
    }

}

export const renderCellHeader = (label: string, helpText: string) => {
    return <div>{label}</div>
}
