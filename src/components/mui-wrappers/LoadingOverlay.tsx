import * as React from 'react';

import { Backdrop, CircularProgress } from "@mui/material"

export const LoadingOverlay: React.FC<{color: "inherit" | "primary" | "secondary"}> = ({color}) => {
  return (
    <>
      <Backdrop open={true}>
        <CircularProgress color={color ? color : "inherit"} />
      </Backdrop>
    </>
  );
}