/// <reference types="react" />
import React$1 from 'react';
import { Options, OptionsStackingValue } from 'highcharts';
import { Theme } from '@mui/material/styles';
import * as _mui_styles from '@mui/styles';
import * as _mui_material from '@mui/material';
import { ButtonProps, InputProps, TextFieldProps } from '@mui/material';
import * as _mui_material_OverridableComponent from '@mui/material/OverridableComponent';

declare const resolveJSONFieldValue: (value: string) => any;
declare const resolveNullFieldValue: (value: string | null, nullStr?: string) => any;
declare const parseFieldValue: (value: any, nullStr?: string) => any;

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type STANDARD_COLORS = 'red' | 'blue' | 'green' | 'gold' | 'grey' | 'black' | 'white';
type COLOR = RGB | RGBA | HEX | STANDARD_COLORS;

type TextRendererType = "PercentageBar" | "Default" | "BooleanCheck" | "ScientificNotation" | "Float" | "ColoredText" | "Link";
interface TextRenderer {
    value?: any;
    object?: any;
    muiColor?: any;
    color?: COLOR;
    className?: string;
    maxLength?: number;
    userProps?: any;
}

declare const resolveNAs: (value: string, altValue?: any) => any;
declare const isObject: (a: any) => boolean;
declare const isJSON: (value: any) => boolean;

declare const NASpan: React$1.FC<TextRenderer>;

declare const BooleanCheck: React$1.FC<TextRenderer>;

declare const Link: React$1.FC<TextRenderer>;
declare const LinkList: React$1.FC<TextRenderer>;

declare const SparkPercentageBar: React$1.FC<TextRenderer>;

declare const FormattedJSON: React$1.FC<TextRenderer>;
declare const DefaultText: React$1.FC<TextRenderer>;
declare const Clob: React$1.FC<TextRenderer>;
declare const ColoredText: React$1.FC<TextRenderer>;
declare const AnnotatedText: React$1.FC<TextRenderer>;

type ColumnAccessorType = TextRendererType;
interface ColumnAccessor extends TextRenderer {
}
type AllowableTableDataValue = string | number | boolean | {
    [key: string]: string;
} | null;
type TableData = Record<string, AllowableTableDataValue>;
interface Column<T> {
    header: string;
    canSort: boolean;
    disable: boolean;
    accessorType: ColumnAccessorType;
    id: string;
    sortType: string;
    help?: string;
    show?: boolean;
    filter?: string;
    accessorFn?: (row: T) => any;
}

declare const resolveColumnAccessor: (key: string, accessorType?: ColumnAccessorType | any) => (row: any) => any;
declare const DefaultTextAccessor: React$1.FC<ColumnAccessor>;

interface TableProps<T> {
    data: TableData[];
    columns: Column<T>[];
}
declare const Table: React$1.FC<TableProps<any>>;

interface ChartCallbackFunc {
    (chart: any): void;
}
interface HighchartsPlotProps {
    data?: any;
    properties: any;
    noDataMessage?: string;
    displayNoDataMessage?: boolean;
    plotOptions?: Options;
    containerProps?: any;
    callback?: ChartCallbackFunc;
}
declare const HighchartsPlot: React$1.FC<HighchartsPlotProps>;

declare const HighchartsColumnTrellis: React$1.FC<HighchartsPlotProps>;
declare const HighchartsTableTrellis: React$1.FC<HighchartsPlotProps>;

declare const HIGHCHARTS_DEFAULTS: Options;
declare function buildChartOptions(chartType: string): Options;
declare function buildInteractiveManhattanOptions(options?: Options): Options;
declare function buildVariantGwsSummaryOptions(options?: Options): Options;
declare function buildGeneGwsSummaryOptions(options?: Options): Options;
declare function buildPieChartOptions(options?: Options): Options;
declare function buildScatterChartOptions(options?: Options): Options;
declare function buildBubbleChartOptions(options?: Options): Options;
declare function buildColumnChartOptions(inverted?: boolean, stacking?: OptionsStackingValue, options?: Options): Options;
declare function disableExport(): Options;
declare function noDataExports(): Options;
declare function limitedExportMenu(): Options;
declare function disableChartAnimationOnUpdate(): Options;
declare function disableSeriesAnimationOnLoad(): Options;
declare function applyCustomSeriesColor(palette: string[]): Options;
declare function formatLegend(options: any): Options;
declare function disableLegendClick(): Options;
declare function disableLegendHover(): Options;
declare function addSeries(series: any): Options;
declare function backgroundTransparent(): Options;
declare function buildTooltipOptions(shared?: boolean, outside?: boolean): Options;
declare function addCategories(categories: string[], axis?: string): Options;
declare function addTitle(title: string, layout?: any, style?: any): Options;

interface LocusZoomPlotProps {
    chromosome?: string;
    end?: number;
    maxWidthAsRatioToBody?: number;
    population: string;
    variant: string;
    genomeBuild: string;
    divId?: string;
    start?: number;
    span?: string;
    flank?: number;
    track: string;
    setPlotState?: any;
    className?: string;
    serviceBaseUrl: string;
}
declare const LocusZoomPlot: React$1.FC<LocusZoomPlotProps>;
declare const MemoLocusZoomPlot: React$1.NamedExoticComponent<LocusZoomPlotProps>;

declare const theme: Theme;
declare const muiTheme: Theme;

declare const useTypographyStyles: (props?: any) => _mui_styles.ClassNameMap<"small" | "pass" | "fail" | "withTooltip">;
declare const useLayoutStyles: (props?: any) => _mui_styles.ClassNameMap<"noPadding">;

declare const StyledTooltip: React$1.JSXElementConstructor<Omit<_mui_material.TooltipProps, "classes"> & _mui_styles.StyledComponentProps<"tooltip"> & object>;
declare const WhiteTooltip: React$1.JSXElementConstructor<Omit<Omit<_mui_material.TooltipProps, "classes"> & _mui_styles.StyledComponentProps<"tooltip"> & object, "classes"> & _mui_styles.StyledComponentProps<"tooltip"> & object>;
declare const KeyedTooltip: (target: React$1.ReactElement, tooltip: string) => React$1.JSX.Element | {
    target: React$1.ReactElement<any, string | React$1.JSXElementConstructor<any>>;
};
declare const HelpIcon: React$1.FC<{
    tooltip: string;
}>;

interface ElevationScrollProps {
    children: React$1.ReactElement;
}
declare function ElevationScroll(props: ElevationScrollProps): React$1.ReactElement<any, string | React$1.JSXElementConstructor<any>>;

interface DownArrowRowProps {
    paddingTop?: number;
    color?: string;
}
declare const DownArrowRow: React$1.FC<DownArrowRowProps>;

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface DrawerProps {
    navigation?: React.ReactNode;
    drawerContents?: React.ReactNode;
    drawerSections?: React.ReactNode[];
    drawerProps?: any;
    navigationProps?: any;
    toggleAnchor?: Anchor;
    toggleIcon?: React.ReactNode;
    toggleHelp?: string;
    toggleText?: string;
    drawerCloseLabel?: string;
    drawerHeaderContents?: React.ReactNode;
    handleClose?: any;
    handleOpen?: any;
    title?: string;
    className?: string;
    width?: any;
    encapsulated?: boolean;
}
interface DrawerContentsProps {
    children?: React.ReactNode;
}
declare const DRAWER_WIDTH = 300;
declare const SHIFT_X = 250;
interface DrawerState {
    isOpen: boolean;
    handleClose?: any;
    handleOpen?: any;
}

declare const NavigationDrawer: React$1.FC<DrawerProps & DrawerContentsProps>;

declare const contentStyles: (theme: Theme) => {
    content: {
        flexGrow: number;
        paddingTop: string;
        transition: string;
        marginLeft: number;
    };
    contentShift: {
        transition: string;
        marginLeft: number;
    };
};
declare const PersistentDrawerLeft: React$1.FC<DrawerProps & DrawerContentsProps & DrawerState>;

declare const EncapsulatedDrawer: React$1.FC<DrawerProps & DrawerContentsProps>;

declare const UnpaddedListItem: any;

interface PanelProps {
    webAppUrl?: string;
    children?: React$1.ReactNode;
    hasBaseArrow?: boolean;
    background?: string;
    classes?: any;
    options?: any;
    projectId?: string;
}
interface CollapsablePanelProps {
    className?: string;
    title?: string;
    defaultOpen?: boolean;
    headerContents?: React$1.ReactNode;
    borderedHeader?: boolean;
    dark?: boolean;
}
interface Custom {
    className?: string;
    alignItems?: string;
    justifyContent?: string;
}
declare const CustomPanel: React$1.FC<PanelProps & Custom>;
declare const DefaultBackgroundPanel: React$1.FC<PanelProps>;
declare const LightBackgroundPanel: React$1.FC<PanelProps>;
declare const PrimaryBackgroundPanel: React$1.FC<PanelProps>;
declare const CollapsableCardPanel: React$1.FC<PanelProps & CollapsablePanelProps>;
declare const MemoCollapsableCardPanel: React$1.NamedExoticComponent<PanelProps & CollapsablePanelProps>;

declare const InfoAlert: React$1.FC<{
    title: string;
    message: string;
    className?: string;
}>;
declare const ErrorAlert: React$1.FC<{
    title: string;
    message: string;
    className?: string;
}>;
declare const WarningAlert: React$1.FC<{
    title: string;
    message: string;
    className?: string;
}>;
declare const ComingSoonAlert: React$1.FC<{
    message: string;
}>;

interface CustomLinkProps {
    style?: "secondary" | "default";
}
declare const CustomLink: React$1.ForwardRefExoticComponent<Omit<_mui_material.LinkOwnProps & _mui_material_OverridableComponent.CommonProps & Omit<Omit<React$1.DetailedHTMLProps<React$1.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
    ref?: ((instance: HTMLAnchorElement | null) => void) | React$1.RefObject<HTMLAnchorElement> | null | undefined;
}, "className" | "children" | "p" | "style" | "color" | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft" | "borderColor" | "borderRadius" | "display" | "displayPrint" | "overflow" | "textOverflow" | "visibility" | "whiteSpace" | "flexBasis" | "flexDirection" | "flexWrap" | "justifyContent" | "alignItems" | "alignContent" | "order" | "flex" | "flexGrow" | "flexShrink" | "alignSelf" | "justifyItems" | "justifySelf" | "gap" | "columnGap" | "rowGap" | "gridColumn" | "gridRow" | "gridAutoFlow" | "gridAutoColumns" | "gridAutoRows" | "gridTemplateColumns" | "gridTemplateRows" | "gridTemplateAreas" | "gridArea" | "bgcolor" | "zIndex" | "position" | "top" | "right" | "bottom" | "left" | "boxShadow" | "width" | "maxWidth" | "minWidth" | "height" | "maxHeight" | "minHeight" | "boxSizing" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "marginX" | "marginY" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "paddingX" | "paddingY" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "typography" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textTransform" | "sx" | "align" | "classes" | "underline" | "paragraph" | "variant" | "gutterBottom" | "noWrap" | "variantMapping" | "TypographyClasses"> & {
    component?: React$1.ElementType<any, keyof React$1.JSX.IntrinsicElements> | undefined;
} & CustomLinkProps, "ref"> & React$1.RefAttributes<unknown>>;

interface CollapseWithClose {
    isOpen: boolean;
    handleClose: any;
    children: React$1.ReactElement;
}
declare const CollapseWithClose: React$1.FC<CollapseWithClose>;

declare const LabelButton: React$1.JSXElementConstructor<Omit<_mui_material.ButtonOwnProps & Omit<_mui_material.ButtonBaseOwnProps, "classes"> & _mui_material_OverridableComponent.CommonProps & Omit<Omit<React$1.DetailedHTMLProps<React$1.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    ref?: ((instance: HTMLButtonElement | null) => void) | React$1.RefObject<HTMLButtonElement> | null | undefined;
}, "className" | "children" | "style" | "color" | "sx" | "tabIndex" | "href" | "disabled" | "size" | "action" | "classes" | "variant" | "centerRipple" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "TouchRippleProps" | "touchRippleRef" | "disableFocusRipple" | "fullWidth" | "disableElevation" | "endIcon" | "startIcon">, "classes"> & _mui_styles.StyledComponentProps<"root"> & object>;
declare const MaterialUIThemedButton: React$1.FC<ButtonProps>;

declare const UnlabeledTextField: React$1.FC<InputProps & {
    fullWidth?: boolean;
}>;
declare const UnlabeledTextFieldOutlined: React$1.FC<InputProps & {
    fullWidth?: boolean;
}>;
declare const LabeledTextField: (props: TextFieldProps) => React$1.JSX.Element;

export { type Anchor, AnnotatedText, BooleanCheck, BooleanCheck as BooleanCheckAccessor, Clob, CollapsableCardPanel, type CollapsablePanelProps, CollapseWithClose, ColoredText, ColoredText as ColoredTextAccessor, type Column, ComingSoonAlert, CustomLink, CustomPanel, DRAWER_WIDTH, DefaultBackgroundPanel, DefaultText, DefaultTextAccessor, DownArrowRow, type DrawerContentsProps, type DrawerProps, type DrawerState, ElevationScroll, EncapsulatedDrawer, ErrorAlert, FormattedJSON, HIGHCHARTS_DEFAULTS, HelpIcon, HighchartsColumnTrellis, HighchartsPlot, HighchartsTableTrellis, InfoAlert, FormattedJSON as JSONAccessor, KeyedTooltip, LabelButton, LabeledTextField, LightBackgroundPanel, Link, Link as LinkAccessor, LinkList, LinkList as LinkListAccessor, LocusZoomPlot, MaterialUIThemedButton, MemoCollapsableCardPanel, MemoLocusZoomPlot, NASpan, NavigationDrawer, type PanelProps, PersistentDrawerLeft, PrimaryBackgroundPanel, SHIFT_X, SparkPercentageBar, SparkPercentageBar as SparkPercentageBarAccessor, StyledTooltip, Table, type TableData, type TextRenderer, type TextRendererType, UnlabeledTextField, UnlabeledTextFieldOutlined, UnpaddedListItem, WarningAlert, WhiteTooltip, addCategories, addSeries, addTitle, applyCustomSeriesColor, backgroundTransparent, buildBubbleChartOptions, buildChartOptions, buildColumnChartOptions, buildGeneGwsSummaryOptions, buildInteractiveManhattanOptions, buildPieChartOptions, buildScatterChartOptions, buildTooltipOptions, buildVariantGwsSummaryOptions, contentStyles, disableChartAnimationOnUpdate, disableExport, disableLegendClick, disableLegendHover, disableSeriesAnimationOnLoad, formatLegend, isJSON, isObject, limitedExportMenu, muiTheme, noDataExports, parseFieldValue, resolveColumnAccessor, resolveJSONFieldValue, resolveNAs, resolveNullFieldValue, theme, useLayoutStyles, useTypographyStyles };
