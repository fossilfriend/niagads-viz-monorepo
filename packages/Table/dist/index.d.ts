import React from 'react';
import { BasicType, NAString, TypeMapper, Expand, Modify, Color } from '@niagads/common';
import { RowSelectionState } from '@tanstack/react-table';

interface ColumnValueFormat {
    nullValue?: BasicType | null;
    naValue?: NAString;
    trueValue?: BasicType;
    precision?: number;
}
interface GenericColumn {
    header?: string;
    id: string;
    description?: string;
    type?: CellType;
    canFilter?: boolean;
    disableGlobalFilter?: boolean;
    disableSorting?: boolean;
    required?: boolean;
    format?: ColumnValueFormat;
}

declare const ICONS: {
    check: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>;
    solidCheck: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>;
    info: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>;
    warning: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>;
    user: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>;
    infoOutline: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>;
    xMark: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>;
};

type BadgeIconType = keyof typeof ICONS;

type GenericCell = BasicType | Record<string, any> | null;
type AbstractCell = {
    type: "abstract";
    value: BasicType | null;
    rowId: number;
    columnId: number;
    nullValue?: BasicType | null;
    naValue?: NAString;
};
type FloatCell = Expand<Modify<AbstractCell, {
    type: "float";
    value: number | null;
    precision?: number;
}>>;
type TextCell = Expand<Modify<AbstractCell, {
    type: "text";
    truncateTo?: number;
    color?: Color;
    tooltip?: string;
}>>;
type TextListCell = Expand<Modify<AbstractCell, {
    type: "text_list";
    value: string;
    items: TextCell[];
}>>;
type BadgeCell = Expand<Modify<TextCell, {
    type: "badge";
    backgroundColor?: Color;
    borderColor?: Color;
    icon?: BadgeIconType;
}>>;
type BooleanCell = Expand<Modify<BadgeCell, {
    type: "boolean";
    value: boolean | null;
    displayText?: BasicType;
}>>;
type LinkCell = Expand<Modify<AbstractCell, {
    type: "link";
    url: string;
    tooltip?: string;
}>>;
type LinkListCell = Expand<Modify<AbstractCell, {
    type: "link_list";
    value: string;
    items: LinkCell[];
}>>;
type PercentageBarCell = Expand<Modify<FloatCell, {
    type: "percentage_bar";
    colors?: [Color, Color];
}>>;
type Cell = PercentageBarCell | FloatCell | AbstractCell | TextCell | TextListCell | BadgeCell | BooleanCell | LinkCell | LinkListCell;
type CellTypeMapper = TypeMapper<Cell>;
type CellType = keyof CellTypeMapper;

type RowSelectAction = 'ACCESS_ROW_DATA' | 'UPDATE_GENOME_BROWSER' | 'UPDATE_LOCUS_ZOOM';
interface RowSelectOptions {
    onRowSelect: (rowSelection: RowSelectionState) => void;
    onRowSelectAction?: RowSelectAction;
    header: string;
    description?: string;
    enableMultiRowSelect?: boolean;
    selectedValues?: string[];
    rowId?: string;
}
interface SortConfig {
    [column: string]: 'asc' | 'desc';
}
interface FilterConfig {
    [column: string]: BasicType;
}
interface InitialTableState {
    sort?: SortConfig;
    filter?: FilterConfig;
}
interface TableConfig {
    title?: string;
    initialize?: InitialTableState;
    description?: string;
    disableColumnFilters?: boolean;
    disableExport?: boolean;
    rowSelect?: RowSelectOptions;
    defaultColumns?: string[];
    onTableLoad?: any;
    disableMultiSelect?: boolean;
}
type TableRow = Record<string, GenericCell | GenericCell[]>;
type TableData = TableRow[];

interface TableProps {
    id: string;
    options?: TableConfig;
    columns: GenericColumn[];
    data: TableData;
}
declare const Table: React.FC<TableProps>;
declare const TableWithErrorBoundary: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<any>>;

export { Table, type TableProps, TableWithErrorBoundary as default };
