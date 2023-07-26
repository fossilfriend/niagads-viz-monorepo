import React, { useState, useCallback, useEffect } from "react";

import { MemoLocusZoomPlot as LocusZoomPlot, DEFAULT_FLANK as LZ_DEFAULT_FLANK } from "@viz/LocusZoom";

import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Collapse, Grid, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";

export const useStyles = makeStyles((theme: Theme) =>
    ({
        bordered: {
            border: "2px solid #1f1f1f",
            padding: "20px",
            marginBottom: "10px",
        },
    })
);

interface LinkedPanelSection {
    isOpen: boolean;
    type: "LocusZoom";
    initialState: { [key: string]: any };
    className?: string;
    handleClose?: any;
    setActionTarget: any;
}

export const LinkedPanel: React.FC<LinkedPanelSection> = ({ isOpen, type, initialState, className, handleClose, setActionTarget }) => {
    // const [actionTarget, setActionTarget] = useState<any>(null);
    const classes = useStyles();

    const updateActionTarget = useCallback(
        (target: any) => {
            if (target) {
                setActionTarget(target);
            }
        },
        []
    );

    // const classes = useStyles();
    return (
        <>
            <Collapse in={isOpen} style={{ marginTop: "20px" }} className={className ? className : null}>
                {type === "LocusZoom" && (
                    <LocusZoomPlot
                        genomeBuild={initialState.genomeBuild}
                        variant={initialState.variant}
                        track={initialState.track}
                        divId="record-table-locus-zoom"
                        population="ADSP"
                        setPlotState={updateActionTarget}
                        className={classes.bordered}
                    />
                )}
            </Collapse>
            {handleClose && (
                <Grid container alignContent="flex-end">
                    <Button
                        variant="contained"
                        endIcon={<CloseIcon />}
                        onClick={handleClose}
                    >{`Hide ${type} view`}</Button>
                </Grid>
            )}
        </>
    );
};

export const MemoLinkedPanel = React.memo(LinkedPanel);