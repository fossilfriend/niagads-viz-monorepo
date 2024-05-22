
import { BasicType } from "@common/types"
import { CellType } from "./Cell";
import { CustomSortingFunctions } from "@table/__deprecated__/sorting"

export interface SortConfig {
    enable: boolean // enable sorting on this columnt
    initial?: 'asc' | 'desc' | 'none' // optional: flag if table will be sorted by this column when rendered, missing = none
    sortingFn?: string // TODO: should be keys for CustomSortingFunctions / SortingFns
}

export interface FilterConfig {
    enable: boolean // enable filtering on this column
    enableGlobalFilter?: boolean // include in global text search filter
    group?: string // optional: filter group (must match a filter group specified in table properties)
    initial?: BasicType | null // optional: table will be initially filtered by this column / value, missing or null = no initial filter
    // filterFn?: 
    // filterInterface?:
}

// allowable fields provided by users
export interface UserDefinedColumn {
    header: string
    id: string
    info?: string
    type?: CellType 
    sort?: SortConfig
    filter?: FilterConfig 
    hide?: boolean
    required?: boolean // if required = true then hide = false 
}

export const getColumn = (columnId:string, columns:UserDefinedColumn[]) => {
    return columns.find(col => col.id === columnId)
}

