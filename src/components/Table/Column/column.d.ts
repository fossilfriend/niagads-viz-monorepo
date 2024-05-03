import { CellTypes } from "./cell";
import { CustomSortingFunctions } from "@table/deprecated/sorting";

export interface SortConfig {
    enable: boolean
    asc?: boolean
    //sortingFn?: CustomSortingFunctions
}

export interface FilterConfig {
    enable: boolean
    enableGlobalFilter?: boolean
    // filterFn?: 
    // filterInterface?:
}

// allowable fields provided by users
export interface UserDefinedColumn {
    header: string
    id: string
    dataType?: CellTypes
    sort?: SortConfig
    filter?: FilterConfig 
    show?: boolean
    info?: string
}

const typeGuard = (userColumn: any): userColumns is UserDefinedColumn {
    return arg && arg.prop && typeof(arg.prop) == 'number';
}

export const resolveColumnDefs = (userColumns: UserDefinedColumn[]) => {

}

