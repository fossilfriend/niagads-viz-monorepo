import { Cell } from "./Column/cell"

export type TableRow = Record<string, Cell | Cell[]>;
export type TableData = TableRow[]


/* export interface UserTableOptions {}
export interface UserTable 
export type UserDefinedTable = 1 */


// validate & transform incoming data into Cells 
export const resolveTableData:TableData = (input: any) => {
    


}