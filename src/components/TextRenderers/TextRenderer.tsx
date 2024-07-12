import React, { ReactNode } from "react"


import { _get, _hasOwnProperty, _isNA, _isNull } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"
import { renderTooltip } from "@components/UI/Tooltip";


import {
    CheckIcon, CheckCircleIcon,
    ExclamationCircleIcon, ExclamationTriangleIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid"

import {
    InformationCircleIcon
} from "@heroicons/react/24/outline";


export interface TextRenderer<T> {
    props: T;
}

export const ICONS = {
    check: CheckIcon,
    solidCheck: CheckCircleIcon,
    info: ExclamationCircleIcon,
    warning: ExclamationTriangleIcon,
    user: UserCircleIcon,
    infoOutline: InformationCircleIcon
}

const DEFAULT_NA_STRING = "n/a"

export const renderStyledText = (value: any, style: any, className: string) => {
    return <span className={className} style={style}>{value}</span>
}

export const renderNullValue = (value: string = DEFAULT_NA_STRING) => {
    return <span className="text-gray-200">{_isNA(value) || !value ? DEFAULT_NA_STRING : value}</span>
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
    return renderWithIcon(
        textElement,
        <InformationCircleIcon className={`${TAILWINDCSS_CLASSES.info_icon} size-3 ml-1`} title={infoMessage} />,
        false, false)
}


/**
 * maps string key to icon components
 * @param key 
 * @returns 
 */
export const getIconElement = (key: string) => {
    const icon = _get(key, ICONS)
    if (icon === null) {
        throw Error("Error rendering field: invalid icon `" + key + "`")
    }
    return icon
}


/**
 * render text element with inline icon
 * @param textElement 
 * @param icon react node or key of ICON to render
 * @param iconOnly render the icon only
 * @param prefix true if icon should be rendered to the left of the text element
 * @returns div containing (textElement) and inline icon
 */

export const renderWithIcon = (textElement: ReactNode | string, icon: ReactNode | string, iconOnly: boolean, prefix: boolean = true) => {
    const IconComponent = (typeof (icon) === 'string') ? getIconElement(icon) : undefined
    const margin = iconOnly ? "m-auto" : (prefix ? "mr-3" : "ml-3")
    return prefix
        ? <div className="flex">
            {IconComponent ? <IconComponent className={`${TAILWINDCSS_CLASSES.badge_icon} ${margin}`} /> : icon}
            {!iconOnly && textElement}
        </div>
        : <div className="flex">
            {!iconOnly && textElement}
            {IconComponent ? <IconComponent className={`${TAILWINDCSS_CLASSES.badge_icon} ${margin}`}/> : icon}
        </div>
}


/**
 * extract style properties and build object to pass to component style
 * @param props text renderer property object
 * @param property specific style property to extract; if null will look for all allowable style properties
 * @returns style object
 */
export const buildElementStyle = (props: any, property: string | null = null) => {
    const VALID_STYLES = property ? [property] : ['color', 'backgroundColor', 'borderColor']
    let style = {}
    for (const vStyle of VALID_STYLES) {
        if (_hasOwnProperty(vStyle, props)) {
            Object.assign(style, { [vStyle]: _get(vStyle, props) })
        }
    }

    return style
}