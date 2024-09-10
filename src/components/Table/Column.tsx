
import { BasicType, NAString } from "@common/types"
import { CellType } from "./Cell";


export interface ColumnSortConfig {
    enable: boolean // enable sorting on this columnt
    initial?: 'asc' | 'desc' | 'none' // optional: flag if table will be sorted by this column when rendered, missing = none
    sortingFn?: string // TODO: should be keys for CustomSortingFunctions / SortingFns
}

export interface ColumnFilterConfig {
    enable: boolean // enable filtering on this column
    enableGlobalFilter?: boolean // include in global text search filter
    group?: string // optional: filter group (must match a filter group specified in table properties)
    initial?: BasicType | null // optional: table will be initially filtered by this column / value, missing or null = no initial filter
    // filterFn?: 
    // filterInterface?:
}

export interface ColumnValueFormat {
    nullValue?: BasicType | null // value to assign for nulls; e.g., for booleans, set nullValue = false to treat NULL as FALSE; if not set treats as NA
    naValue?: NAString // value to assign for NAs; default `NA`
    trueValue?: BasicType // for booleans; defaults to TRUE
    precision?: number, // for floats
}

// allowable fields provided by users
export interface GenericColumn {
    header: string
    id: string
    description?: string
    type?: CellType 
    sort?: ColumnSortConfig
    filter?: ColumnFilterConfig 
    hide?: boolean
    required?: boolean // if required = true then hide = false 
    format?: ColumnValueFormat
}

export const getColumn = (columnId:string, columns:GenericColumn[]) => {
    return columns.find(col => col.id === columnId)
}

