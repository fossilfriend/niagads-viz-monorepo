import { BasicType, FileFormat } from "@common/types"
import { GenericCell } from "@table/Cell"

export interface RowSelectOptions {
    onSelectFn: any // behavior on select
    selectType: 'highlight' | 'checkbox' // how row selection is indicated
    multiSelect?: boolean // optional: allow selection of multiple rows, false if missing
}

interface SortConfig {[column: string]: 'asc' | 'desc'}
interface FilterConfig {[column: string]: BasicType}

interface InitialTableState {
    sort?: SortConfig
    filter?: FilterConfig
}
export interface TableConfig {
    title?: string
    id?:string // optional: internal id for the table
    initialize?: InitialTableState // optional: set initial sort and/or filter state for the table
    description?: string // optional: descriptive text describing the table for info popup
    canFilter?: boolean // optional: disables all filtering on the table when false; default TRUE
    export?: FileFormat[] // optional: enable exports in the listed file formats; exports disabled if missing
    rowSelect?: RowSelectOptions // optional: enables row selection and related state change options
    defaultColumns?: string[] // optional: any column ids not listed will be hidden by default
}

export type TableRow = Record<string, GenericCell | GenericCell[]>
export type TableData = TableRow[]




