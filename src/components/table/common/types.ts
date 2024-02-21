export type AllowableTableDataValue = string | number | boolean | { [key: string] : string };

export type Data = Record<string, AllowableTableDataValue>;

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

export type ColumnAccessorType =
    | "PercentageBar"
    | "Default"
    | "BooleanCheck"
    | "ScientificNotation"
    | "Float"
    | "ColoredText"
    | "Link";

export interface ColumnAccessor {
    value?: any;
    object?: any;
    muiColor?: any; // one of
    htmlColor?: string;
    className?: string;
    maxLength?: number;
    userProps?: any;
}
