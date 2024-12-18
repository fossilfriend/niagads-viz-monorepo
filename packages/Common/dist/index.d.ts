import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import exportFromJson from 'export-from-json';

declare const COLOR_BLIND_FRIENDLY_PALETTES: {
    PuBlRd: string[];
    RdBlPu: string[];
    eight_color: string[];
};
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type STANDARD_COLORS = 'red' | 'blue' | 'green' | 'gold' | 'grey' | 'black' | 'white';
type Color = RGB | RGBA | HEX | STANDARD_COLORS;

declare function errorFallback({ error, resetErrorBoundary }: FallbackProps): React.JSX.Element;

declare function safeHtml<P>(str: string, props?: P, Component?: React.ComponentClass<P>): JSX.Element;
declare function safeHtml<P>(str: string, props?: P, Component?: React.FunctionComponent<P>): JSX.Element;
declare function safeHtml<P>(str: string, props?: P, Component?: string): JSX.Element;

declare const EXPORT_FILE_FORMATS: string[];
type FileFormat = Exclude<keyof typeof exportFromJson.types, 'css' | 'html'>;
type BasicType = string | number | boolean;
type NAString = 'NA' | 'N/A' | 'NULL' | '.' | '' | 'na' | 'n/a' | 'null';
type Modify<T, R> = Omit<T, keyof R> & R;
type TypeMapper<T extends {
    type: string;
}> = {
    [t in T as t["type"]]: t;
};
type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;
type ExpandRecursively<T> = T extends object ? T extends infer O ? {
    [K in keyof O]: ExpandRecursively<O[K]>;
} : never : T;

declare const _hasOwnProperty: (key: string, object: any) => any;
declare const _get: (key: string, object: any, alt?: any) => any;
declare const _deepCopy: (obj: any) => any;
declare const _isObject: (a: any) => boolean;
declare const _isJSON: (value: any) => boolean;
declare const _isNA: (value: BasicType | null, nullsAsNA?: boolean) => boolean;
declare const _isNull: (value: BasicType | null) => boolean;
declare const toFixedWithoutZeros: (value: number, precision?: number) => string;
declare const toExponential: (value: string | number, precision?: number) => string | number;
declare const toTitleCase: (value: string) => string;
declare function jsonSyntaxHighlight(json: any): any;

export { type BasicType, COLOR_BLIND_FRIENDLY_PALETTES, type Color, EXPORT_FILE_FORMATS, type Expand, type ExpandRecursively, type FileFormat, type Modify, type NAString, type TypeMapper, _deepCopy, _get, _hasOwnProperty, _isJSON, _isNA, _isNull, _isObject, errorFallback, jsonSyntaxHighlight, safeHtml, toExponential, toFixedWithoutZeros, toTitleCase };
