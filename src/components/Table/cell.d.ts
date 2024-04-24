import { ReactNode } from 'react'

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

export type NAString = 'n/a' | 'N/A' | 'NA' | 'na' | 'NULL' | 'null' | '.' | ''
type RawValueType = string | number | boolean

export interface DefaultCell {
    value: RawValueType
    naString?: NAString
}

export interface FloatCell extends Omit<DefaultCell, 'value'> {
    value: number
    precision?: number
}

export interface ScientificNotationCell extends FloatCell {}

export interface TextCell extends DefaultCell {
    value: RawValueType
    truncateTo?: number
}

export interface AnnotatedTextCell extends TextCell {
    color?: Color
    tooltip?: ReactNode | string
}

export interface BadgeCell extends AnnotatedTextCell {
    backgroundColor?: Color
    borderColor?: Color
    icon?: BadgeIconType
}

export interface BooleanCell extends Omit<BadgeCell, 'value'> {
    value: boolean
    trueStr: string // what value to display for TRUE (e.g., TRUE, Yes, Y, Coding); FALSE inferred
    nullAsFalse?: boolean // assume null === FALSE
    falseStr?: string // if missing FALSE is displayed as empty string
}

export interface LinkCell extends AnnotatedTextCell {
    url: string
    newTab?: boolean
}

export interface PercentageBarCell extends Omit<DefaultCell, 'value'> {
    value: number,
    colors?: [Color, Color]
}

export type NumericCellTypes = DefaultCell | PercentageBarCell | FloatCell | ScientificNotationCell | BadgeCell
export type StringCellTypes = DefaultCell | AnnotatedTextCell | TextCell | BadgeCell | BooleanCell | LinkCell
export type CellTypes = NumericCellTypes | StringCellTypes


