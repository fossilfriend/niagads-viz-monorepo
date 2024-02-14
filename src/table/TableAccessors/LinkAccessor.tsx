import React from "react";
import { ColumnAccessor } from "../Common/types";

export const resolveLink = (url: string, value: string) => {
    return (
        <a key={url} href={url}>
            {value}
        </a>
    );
};

// text with tooltip value = { value: string, url: string, tooltip: string}
export const LinkAccessor: React.FC<ColumnAccessor> = ({ value }) => {
    return Array.isArray(value) ? (
        <LinkListAccessor value={value} />
    ) : "tooltip" in value && value.tooltip != "" ? (
        <div title={value.tooltip} arial-label={value.tooltip}>
            {resolveLink(value.url, value.value)}
        </div>
    ) : (
        resolveLink(value.url, value.value)
    );
};

// json array of [{url: , value: , tooltip?: }, ...]
// asString returns it as a " // " separated list
export const LinkListAccessor: React.FC<ColumnAccessor> = ({ value }) => {
    return value.map((item: any, i: number) => (
        <span key={i}>
            {i > 0 && " // "}
            <LinkAccessor value={item} />
        </span>
    ));
};
