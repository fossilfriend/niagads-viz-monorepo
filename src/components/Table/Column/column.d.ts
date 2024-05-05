import { RawValueType } from "@common/types"
import { CellTypes } from "./cell";
import { CustomSortingFunctions } from "@table/deprecated/sorting"

export interface SortConfig {
    enable: boolean // enable sorting on this columnt
    initial?: 'asc' | 'desc' | 'none' // optional: flag if table will be sorted by this column when rendered, missing = none
    //sortingFn?: CustomSortingFunctions
}

export interface FilterConfig {
    enable: boolean // enable filtering on this column
    enableGlobalFilter?: boolean // include in global text search filter
    group?: string // optional: filter group (must match a filter group specified in table properties)
    initial?: RawValueType | null // optional: table will be initially filtered by this column / value, missing or null = no initial filter
    // filterFn?: 
    // filterInterface?:
}

// allowable fields provided by users
export interface UserDefinedColumn {
    header: string
    id: string
    info?: string
    type?: CellTypes
    sort?: SortConfig
    filter?: FilterConfig 
    hide?: boolean
    required?: boolean // if required = true then hide = false 
}

const typeGuard = (userColumn: any): userColumns is UserDefinedColumn => {
    return arg && arg.prop && typeof(arg.prop) == 'number';
}

export const resolveColumnDefs = (userColumns: UserDefinedColumn[]) => {

}

