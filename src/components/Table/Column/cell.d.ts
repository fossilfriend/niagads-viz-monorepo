import { ReactNode } from 'react'

import { Modify, TypeMapper, Expand } from "@utils/typeMapping"

import {
    CheckIcon, CheckCircleIcon,
    ExclamationCircleIcon, ExclamationTriangleIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";

import { Color } from "@common/palettes"
import { responseInterceptor } from 'http-proxy-middleware';
import { resolveNAs } from '@text/utils';

const NA_STRINGS = ['NA', 'N/A', 'NULL', '.', '']
const INTERNAL_NA_STR = 'NA'

const BadgeIcons = {
    check: CheckIcon,
    solidCheck: CheckCircleIcon,
    info: ExclamationCircleIcon,
    warning: ExclamationTriangleIcon,
    user: UserCircleIcon
}

export type BadgeIconType = keyof typeof BadgeIcons;

type RawValueType = string | number | boolean

export type UnformattedCell = {
    type: "unformatted"
    value: RawValueType | null
    naString: 'NA'
}


export type FloatCell = Expand<Modify<UnformattedCell,
    { type: "float", value: number | null, precision?: number }>>

export type ScientificNotationCell = Expand<Modify<FloatCell,
    { type: "scientific_notation" }>>

export type TextCell = Expand<Modify<UnformattedCell,
    { type: "text", value: RawValueType | null, truncateTo?: number }>>

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
    { type: "link", url: string, openNewTab?: boolean }>>

/* export type LinkListCell = {
    type: "link_list",
    value: LinkCell[]
} */

export type PercentageBarCell = Expand<Modify<FloatCell,
    { type: "percentage_bar", colors?: [Color, Color] }>>

export type NumericCell = UnformattedCell | PercentageBarCell | FloatCell | ScientificNotationCell | BadgeCell
export type StringCell = UnformattedCell | AnnotatedTextCell | TextCell | BadgeCell | BooleanCell | LinkCell
export type Cell = NumericCell | StringCell

// create CellTypes which is a list string keys corresponding to allowable "types" of cells
type CellTypeMapper = TypeMapper<Cell>
export type CellTypes = keyof CellTypeMapper

// extract / resolve cell values for sort, filter, and download

const isNull = (value: RawValueType | null) => {
    if (value && typeof value === 'string' && NA_STRINGS.includes(value.toUpperCase)) {
        return true
    }
    return value == null
}

const resolveNull:RawValueType = (props: CellProps) => {
    return isNull(props.value) ? props.nullStr : props.value
}

const resolveBooleanNull:RawValueType = (props: BooleanCellProps) => {
    if (isNull(props.value) && props.nullAsFalse) {
        return false
    }
    return resolveNull(props)
}

// cell accessor function; gets the value; resolves nulls
export const getCellValue: RawCellValue = (cellProps: Cell | Cell[]) => {
    if (Array.isArray(cellProps)) {
        // recursively get the values from the list items
        // and concatenate w/ '//' delimiter
        return cellProps.map((item) => getCellValue(item)).join(" // ");
    }
    else {
        const cellType: CellTypes = cellProps.type
        switch (cellType) {
            case "boolean":
                return resolveBooleanNull(cellProps as BooleanCell)
            default:
                return resolveNull(cellProps)
        }
    }
}


