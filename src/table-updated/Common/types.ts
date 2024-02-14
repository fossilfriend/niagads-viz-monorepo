export interface Dataset {
    dataset_accession: string;
    consortium: string | null,
    description: string;
    biomarker: string | null,
    population: string;
    genotype: string | null,
    dataset_record_link: Record<string, string>;
    covariates: string | null;
    attribution: string;
    name: string;
    publication_date: string | null;
    track: string;
    neuropathology: string;
}

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
