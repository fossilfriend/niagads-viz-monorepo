import { COLOR } from "../../common/palettes"

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
    muiColor?: any; // one of
    color?: COLOR;
    className?: string;
    maxLength?: number;
    userProps?: any;
}
