import { BasicType, NAString } from "@common/types"
import { CellType } from "./Cell";
import { TableSortingFunctions } from "./TableSortingFunctions";

export interface SortConfig {
    enable: boolean // enable sorting on this column
    initial?: 'asc' | 'desc' | 'none' // optional: flag if table will be sorted by this column when rendered, missing = none
    sortingFn?: TableSortingFunctions // TODO: do we need to import TableRow?
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
export interface GenericColumn {
    header: string
    id: string
    description?: string
    type?: CellType 
    sort?: SortConfig
    filter?: FilterConfig 
    hide?: boolean
    required?: boolean // if required = true then hide = false 
    nullValue?: BasicType | null // value to assign for nulls; e.g., for booleans, set nullValue = false to treat NULL as FALSE; if not set treats as NA
    naValue?: NAString // value to assign for NAs; default `NA`
}

export const getColumn = (columnId:string, columns:GenericColumn[]) => {
    return columns.find(col => col.id === columnId)
}
