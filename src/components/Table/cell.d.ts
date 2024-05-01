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

// from https://stackoverflow.com/a/55032655 -- if this works, pull out to reference
type Modify<T, R> = Omit<T, keyof R> & R;

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

export type NumericCells = DefaultCell | PercentageBarCell | FloatCell | ScientificNotationCell | BadgeCell
export type StringCells = DefaultCell | AnnotatedTextCell | TextCell | BadgeCell | BooleanCell | LinkCell

// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
// https://www.typescriptlang.org/play/#code/C4TwDgpgBAogbhAdsAwge0QMwJYHMA88SwAzlBAB7BIAmZA3lANbaI0BcUJwATq7lAC+APigBeKPQBQUWVADaMKK1gJkZAIZkY8gEQs2ugLpHOACghrgnGAEpxouGmw0A3FMFSpoSFADKAI4Arho8EETI4pLMrBxQuiTBoRC6ADRQFJyIQQC2AEYQPOkgWbkFPELuPtAo2DwAxgA24VZRjAZxuvV1TSnpPBo02EEkpfmFlV7VUOhYeFERqBg4BIEhYYtQAD4zPc2LwlIA9EdyAHoA-EA
type CellTypeMapper<CT extends { type: string }> = {
    [ct in CT as ct["type"]]: typeof ct
}

export const CellType:CellTypeMapper = CellTypeMapper<NumericCells | StringCells>;

