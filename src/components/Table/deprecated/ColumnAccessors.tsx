import React from "react"

import { ColumnAccessor, ColumnAccessorType } from  "./deprecated/types"
import { parseFieldValue } from "./utils";
import { ColumnFormat } from "./Column/types"

import {
    BooleanCheck as BooleanCheckAccessor,
    NASpan,
    SparkPercentageBar as SparkPercentageBarAccessor,
    Link as LinkAccessor,
    LinkList as LinkListAccessor,
    FormattedJSON as JSONAccessor,
    isJSON,
    Clob,
    ColoredText as ColoredTextAccessor,
    resolveNAs
} from "../Text"


export const resolveColumnAccessor = (
    key: string,
    accessorType: ColumnAccessorType | any = "Default"
) => {

    const MemoSparkPercentageBarAccessor = React.memo(SparkPercentageBarAccessor);
    const MemoBooleanCheckAccessor = React.memo(BooleanCheckAccessor);
    const MemoColoredTextAccessor = React.memo(ColoredTextAccessor);
    const MemoDefaultTextAccessor = React.memo(DefaultTextAccessor);

    switch (accessorType) {
        case "PercentageBar":
            return (row: any) =>
                resolveNAs(
                    row[key],
                    <MemoSparkPercentageBarAccessor
                        value={{ value: row[key], percentage: row[key] * 100 }}
                    />
                );
        case "BooleanCheck":
            return (row: any) => <MemoBooleanCheckAccessor value={row[key]} />;
        case "ColoredText":
            return (row: any) =>
                resolveNAs(
                    row[key],
                    <MemoColoredTextAccessor value={row[key]} color="red" />
                );
        case "Link":
            return (row: any) =>
                resolveNAs(row[key], <MemoDefaultTextAccessor value={row[key]} />);
        case "ScientificNotation":
        case "Float":
        default:
            return (row: any) =>
                resolveNAs(row[key], <MemoDefaultTextAccessor value={row[key]} />);
    }
};



export const DefaultTextAccessor: React.FC<ColumnAccessor> = ({ value, maxLength = 100 }) => {
    if (isJSON(value)) {
        return <JSONAccessor value={value} />;
    }
    if (value.toString().length > maxLength) {
        return <Clob value={value} maxLength={maxLength} />;
    }
    // catch numerics
    return parseFieldValue(value);
};

export {
    BooleanCheckAccessor,
    NASpan, 
    SparkPercentageBarAccessor, 
    LinkAccessor, 
    LinkListAccessor, 
    JSONAccessor, 
    ColoredTextAccessor
}
