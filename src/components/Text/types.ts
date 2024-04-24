import { Color } from "../../common/palettes"

export type TextRendererType =
    | "PercentageBar"
    | "Default"
    | "BooleanCheck"
    | "ScientificNotation"
    | "Float"
    | "ColoredText"
    | "Link";

export interface TextRenderer {
    value?: any;
    object?: any;
    color?: Color;
    className?: string;
    maxLength?: number;
    userProps?: any;
}
