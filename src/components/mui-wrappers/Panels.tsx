import React, { useState } from "react";
import clsx from "clsx";

import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
    Grid,
    Card,
    CardActions,
    Typography,
    IconButton,
    Collapse,
    CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { lighten } from "@mui/material/styles";
import { DownArrowRow } from "@mui-wrappers/index";

export interface PanelProps {
    webAppUrl?: string;
    children?: React.ReactNode;
    hasBaseArrow?: boolean;
    background?: string;
    classes?: any;
    options?: any;
    projectId?: string;
}

export interface CollapsablePanelProps {
    className?: string;
    title?: string;
    defaultOpen?: boolean;
    headerContents?: React.ReactNode;
    borderedHeader?: boolean;
    dark?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    primaryBackground: {
        background: theme.palette.primary.main,
    },
    whiteText: {
        color: "white",
    },
    lightBackground: {
        background: lighten(theme.palette.primary.main, 0.95),
    },
    defaultBackgroundPanel: {
        background: "white",
        //paddingTop: theme.spacing(6),
    },
    limitedWith: {
        maxWidth: 300,
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    borderBottom: {
        borderBottom: "1px solid " + theme.palette.secondary.main,
    },
}));

interface Custom {
    className?: string;
    alignItems?: string;
    justifyContent?: string;
}

export const CustomPanel: React.FC<PanelProps & Custom> = ({
    className,
    children,
    alignItems = "center",
    justifyContent = "center",
    hasBaseArrow = false,
}) => {
    return (
        <Grid
            item
            container
            justifyContent={justifyContent}
            alignItems={alignItems}
            className={className ? className : ""}
            xs={12}>
            {children}
            {hasBaseArrow && <DownArrowRow color="primary" />}
        </Grid>
    );
};

export const DefaultBackgroundPanel: React.FC<PanelProps> = ({
    classes,
    children,
    hasBaseArrow = false,
}) => {
    let clx = classes ? classes : useStyles();
    return (
        <Grid
            item
            container
            justifyContent="center"
            className={clx.defaultBackgroundPanel}
            xs={12}>
            {children}
            {hasBaseArrow && <DownArrowRow color="primary" />}
        </Grid>
    );
};

export const LightBackgroundPanel: React.FC<PanelProps> = ({
    classes,
    children,
    hasBaseArrow = false,
}) => {
    let clx = classes ? classes : useStyles();
    return (
        <Grid
            item
            container
            justifyContent="center"
            className={`${clx.lightBackground} ${clx.defaultBackgroundPanel}`}
            xs={12}>
            {children}
            {hasBaseArrow && <DownArrowRow color="primary" />}
        </Grid>
    );
};

export const PrimaryBackgroundPanel: React.FC<PanelProps> = ({
    classes,
    children,
    hasBaseArrow = true,
}) => {
    let clx = classes ? classes : useStyles();
    return (
        <Grid
            item
            container
            justifyContent="center"
            xs={12}
            className={`${clx.primaryBackground} ${clx.defaultBackgroundPanel}`}>
            {children}
            {hasBaseArrow && <DownArrowRow />}
        </Grid>
    );
};

export const CollapsableCardPanel: React.FC<
    PanelProps & CollapsablePanelProps
> = ({
    className,
    title,
    headerContents,
    children,
    hasBaseArrow = false,
    defaultOpen = false,
    borderedHeader = false,
    dark = false,
}) => {
        const [expanded, setExpanded] = useState(defaultOpen);
        const classes = useStyles();

        const collapseHeaderClass = borderedHeader
            ? classes.borderBottom
            : dark
                ? classes.primaryBackground
                : undefined;

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };
        return children ? (
            <Card elevation={0} className={className}>
                <CardActions
                    disableSpacing
                    className={collapseHeaderClass}
                    style={dark ? { marginTop: "16px" } : undefined}>
                    {title && (
                        <Typography className={dark ? classes.whiteText : undefined}>
                            {title}
                        </Typography>
                    )}
                    {headerContents && headerContents}
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        size="small"
                        aria-label="show more"
                        color={dark ? "secondary" : "default"}>
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>{children}</CardContent>
                </Collapse>
            </Card>
        ) : null;
    };

export const MemoCollapsableCardPanel = React.memo(CollapsableCardPanel);
