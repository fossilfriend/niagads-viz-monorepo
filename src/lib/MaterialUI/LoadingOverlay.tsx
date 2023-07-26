import * as React from 'react';
import Backdrop from '@mui/core/Backdrop';
import CircularProgress from '@mui/core/CircularProgress';

export const LoadingOverlay: React.SFC<{color: "inherit" | "primary" | "secondary"}> = ({color}) => {

  return (
    <>
      <Backdrop open={true}>
        <CircularProgress color={color ? color : "inherit"} />
      </Backdrop>
    </>
  );
}