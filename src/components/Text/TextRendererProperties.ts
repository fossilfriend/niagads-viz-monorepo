import { BasicType } from "@common/types";

/* export type TextRendererType =
    | "PercentageBar"
    | "Default"
    | "BooleanCheck"
    | "ScientificNotation"
    | "Float"
    | "ColoredText"
    | "Link";   
*/


export interface TextRenderer<T> {
    props: T;
}
