import React, { ReactNode } from "react"

import {
    InformationCircleIcon
} from "@heroicons/react/24/outline";

import { _get, _hasOwnProperty } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"
import { renderTooltip } from "@components/UI/Tooltip";

export interface TextRenderer<T> {
    props: T;
}

export const renderStyledText = (value: any, style: any, className: string) => {
    return <span className={className} style={style}>{value}</span>
}

const DEFAULT_NA_STRING = "n/a"
export const renderNullValue = (value: string = DEFAULT_NA_STRING) => {
    return <span className="text-gray-200">{value ? value : DEFAULT_NA_STRING}</span>
}


/**
 * Add tooltip to textElement
 * @param textElement element to be wrapped
 * @param infoMessage tooltip message
 * @param useInfoLink flag indicating whether to create info link; if false returns tooltip wrapped info icon
 * @returns textElement with tooltip either as info icon or info link
 */
export const renderWithInfo = (textElement: ReactNode | string, infoMessage: string, useInfoLink: boolean) => {
    if (useInfoLink) {
        return renderTooltip(textElement, infoMessage)
    }
    // otherwise draw info icon and attach the tooltip to the icon
    return (
        <div className="flex" >
            {textElement}
            <InformationCircleIcon className={`${TAILWINDCSS_CLASSES.info_icon} size-3`} title={infoMessage} />
        </div>
    )
}