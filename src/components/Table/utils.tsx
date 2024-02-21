import React from "react";

import {
    BooleanCheckAccessor,
    ColoredTextAccessor,
    ColumnAccessorType,
    DefaultTextAccessor,
    SparkPercentageBarAccessor,
} from "@table/index";

import { resolveNAs } from "@renderers/utils";

export const resolveJSONFieldValue = (value: string) => {
    try {
        const jsonValue = JSON.parse(value);
        if (Array.isArray(jsonValue)) {
            return jsonValue.map((item) => item.value).join(" // ");
        }
        // JSON parse yields scientific notation parsed correctly, so this will return
        // correctly formatted numbers
        return jsonValue.hasOwnProperty("value") ? jsonValue.value : jsonValue;
    } catch (e) {
        // regular string
        return value;
    }
};

export const resolveNullFieldValue = (
    value: string | null,
    nullStr: string = ""
) => {
    return value === null || value === "N/A"
        ? nullStr
        : resolveJSONFieldValue(value);
};

const getAccessorType = (value: any) => {
    const accessorType = value.type
        ? value.type.hasOwnProperty("type") // when memoized, get type is react.memo, and nested type is the accessor type
            ? value.type.type.name
            : value.type.name
        : "String";
    return accessorType.includes("Boolean")
        ? "BooleanCheckAccessor"
        : accessorType;
};

export const parseFieldValue = (value: any, nullStr: string = ""): any => {
    if (!value) {
        return resolveNullFieldValue(null, nullStr);
    }

    const accessorType = getAccessorType(value);

    switch (accessorType) {
        case "String":
            return resolveNullFieldValue(value, nullStr);
        case "NASpan":
            return resolveNullFieldValue("N/A", nullStr);
        case "BooleanCheckAccessor":
            return value.props.value === "true" ? "Yes" : "No";
        default:
            if (value.props && value.props.value) {
                return resolveNullFieldValue(value.props.value, nullStr);
            }
            throw new Error(
                `ERROR: Unable to parse field value - unhandled ColumnAccessor type: ${value.type.name}`
            );
    }
};

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
                    <MemoColoredTextAccessor value={row[key]} htmlColor="red" />
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
