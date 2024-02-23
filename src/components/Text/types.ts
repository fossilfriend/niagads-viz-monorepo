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
    htmlColor?: string;
    className?: string;
    maxLength?: number;
    userProps?: any;
}
