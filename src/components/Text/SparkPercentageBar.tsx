import React from "react";

import { Theme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";

import Box, { BoxProps } from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { TextRenderer } from "@text/types";

/* note: this may not render correctly; in mui 4.x, the Box element had the `clone` prop; not sure why, but
deprecated in 5 (see https://mui.com/material-ui/migration/v5-component-changes/#remove-clone-prop) so just removed it
as I was unsure of the original purpose - EGA
*/
export const SparkPercentageBar: React.FC<TextRenderer> = ({
    value,
  }) => {
    return value ? (
      <Grid container wrap="nowrap">
        <Grid item>{value.value}&nbsp;</Grid>
        <Box maxWidth="100px" maxHeight="1.4em">
          <Grid item container wrap="nowrap">
            <SparkBar type="filled" width={value.percentage} />
            <SparkBar type="remaining" width={100 - value.percentage} />
          </Grid>
        </Box>
      </Grid>
    ) : null;
  };
  
  interface SparkBarProps extends BoxProps {
    type: "filled" | "remaining";
    width: number;
  }
  
  const SparkBar = withStyles((theme: Theme) => ({
    root: {
      height: "100%",
      backgroundColor: (props: SparkBarProps) =>
        props.type === "filled"
          ? theme.palette.secondary.main
          : theme.palette.primary.light,
    },
  }))(({ width, type, ...rest }: SparkBarProps) => (
    <Box {...rest} flexBasis={`${width}%`} />
  ));