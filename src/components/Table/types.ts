import { TextRendererType , TextRenderer } from "../Text";

export type AllowableTableDataValue = string | number | boolean | { [key: string] : string };

export type Data = Record<string, AllowableTableDataValue>;

export type ColumnAccessorType = TextRendererType;
export interface ColumnAccessor extends TextRenderer {};

export interface Column<T> {
    header: string;
    canSort: boolean;
    disable: boolean;
    accessorType: ColumnAccessorType
    id: string;
    sortType: string;
    help?: string;
    show?: boolean;
    filter?: string;
    accessorFn?: (row: T) => any;
}

