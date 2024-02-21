import React from "react";

import { isObject, TextRenderer, DefaultText, AnnotatedText, Link, LinkList } from "@renderers/index";

const resolveJSONRenderer = (obj: any) => {
    if (Array.isArray(obj)) {
        if ("url" in obj[0]) {
            return "link_list";
        } else {
            throw new Error(
                `ERROR: Invalid JSON passed to JSONRenderer (a TextRenderer) - unknown array type: ${JSON.stringify(obj)}`
            );
        }
    }

    if (!("value" in obj)) {
        throw new Error(
            `ERROR: Invalid JSON passed to JSONRenderer (a TextRenderer) - missing 'value': ${JSON.stringify(obj)}`
        );
    }

    // check url first b/c links can have tooltips
    if ("url" in obj) {
        return "link";
    }

    if ("tooltip" in obj) {
        return "tooltip";
    }
    // legacy (type == text)
    else if ("text" in obj) {
        return "legacy_plain_text";
    }

    throw new Error(
        `ERROR: Invalid JSON passed to JSONRenderer (a TextRenderer) - unknown JSON Renderer type: ${JSON.stringify(obj)}`
    );
};

// expect 2 types 1: text w/tooltip, 2) link
// assumes "tooltip" = { value: str; tooltip: str}
export const JSONRenderer: React.FC<TextRenderer> = ({ value }) => {
    const obj = isObject(value) ? value : JSON.parse(value);
    const objType = resolveJSONRenderer(obj);
    switch (objType) {
        case "tooltip":
            return <AnnotatedText value={obj} />;
        case "link":
            return <Link value={obj} />;
        case "link_list":
            return <LinkList value={obj} />;
        default: // not handled, so just display value // probably just a legacy text
            return <DefaultText value={value.value} />;
    }
};
