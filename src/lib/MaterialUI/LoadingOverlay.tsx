import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingOverlay: React.FC<{color: "inherit" | "primary" | "secondary"}> = ({color}) => {

  return (
    <>
      <Backdrop open={true}>
        <CircularProgress color={color ? color : "inherit"} />
      </Backdrop>
    </>
  );
}