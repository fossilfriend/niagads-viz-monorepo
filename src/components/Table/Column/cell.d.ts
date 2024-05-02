import { ReactNode } from 'react'

import { Modify, TypeMapper } from "@utils/typeMapping"

import {
    CheckIcon, CheckCircleIcon,
    ExclamationCircleIcon, ExclamationTriangleIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";

import { Color } from "@common/palettes"

const BadgeIcons = {
    check: CheckIcon,
    solidCheck: CheckCircleIcon,
    info: ExclamationCircleIcon,
    warning: ExclamationTriangleIcon,
    user: UserCircleIcon
}

export type BadgeIconType = keyof typeof BadgeIcons;

export type NAString = 'n/a' | 'N/A' | 'NA' | 'na' | 'NULL' | 'null' | '.' | '' | undefined
type RawValueType = string | number | boolean


export interface DefaultCell {
    type: "default"
    value: RawValueType
    naString?: NAString
}

export type FloatCell = Modify<DefaultCell, 
    {type:"float", value: number, precision?: number}> 

export type ScientificNotationCell = Modify<FloatCell, 
    {type: "scientific_notation"}>

export type TextCell = Modify<DefaultCell, 
    {type: "text", truncateTo?: number}>

export type AnnotatedTextCell = Modify<TextCell, 
    { type: "annotated_text", color?: Color, tooltip?: ReactNode | string}>

export type BadgeCell = Modify<AnnotatedTextCell, 
    {type: "badge", backgroundColor?: Color, borderColor?: Color, icon?: BadgeIconType}>

export type BooleanCell = Modify<BadgeCell, 
    {
        type:"boolean",
        value: boolean
        trueStr: string // what value to display for TRUE (e.g., TRUE, Yes, Y, Coding); FALSE inferred
        nullAsFalse?: boolean // assume null === FALSE
        falseStr?: string // if missing FALSE is displayed as empty string
    }>

export type LinkCell = Modify<AnnotatedTextCell, 
    { type: "link", url: string, openNewTab?: boolean }>

export type PercentageBarCell = Modify<FloatCell, 
    { type: "percentage_bar", colors?: [Color, Color]}>

export type NumericCell = DefaultCell | PercentageBarCell | FloatCell | ScientificNotationCell | BadgeCell
export type StringCell = DefaultCell | AnnotatedTextCell | TextCell | BadgeCell | BooleanCell | LinkCell
export type Cell = NumericCell | StringCell

type CellTypeMapper = TypeMapper<Cell>;

export type CellTypes = keyof CellTypeMapper



