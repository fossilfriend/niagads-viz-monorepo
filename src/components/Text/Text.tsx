import React from "react"
import { TextRenderer } from "./TextRendererProperties";
import { _get, _hasOwnProperty } from "@common/utils";

const TAILWIND_CLASSES = {

}
//const MyComponent = <T,>({ data }: MyComponentProps<T>) => {

export const Text = <T,>({props}: TextRenderer<T>) => {
    let style = ""
    if (_hasOwnProperty('color', props)) {
        style = `text-${_get('color', props)}`
    }
    return <span className={style}>{_get('value', props)}</span> 
};