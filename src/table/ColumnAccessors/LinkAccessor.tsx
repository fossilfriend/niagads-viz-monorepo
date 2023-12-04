import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { StyledTooltip as Tooltip, CustomLink as Link} from "@mui-wrappers/index";

import { ColumnAccessor } from "@table/ColumnAccessors";

export const resolveLink = (url: string, value: string) => {
    return <Link key={url} href={url}>
        {value}
    </Link>
};

// text with tooltip value = { value: string, url: string, tooltip: string}
export const LinkAccessor: React.FC<ColumnAccessor> = ({ value }) => {
    return Array.isArray(value) ? (
        <LinkListAccessor value={value} />
    ) : "tooltip" in value && value.tooltip != "" ? (
        <Tooltip key={Math.random().toString(36).slice(2)} title={value.tooltip} arial-label={value.tooltip} arrow>
            {resolveLink(value.url, value.value)}
        </Tooltip>
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
