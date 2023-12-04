import React, { useRef, useEffect, forwardRef, useState, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

//@ts-ignore
export const RowSelectButton = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
    return (
        <>
            <Button ref={resolvedRef} {...rest} endIcon={<OpenInBrowserIcon/>} />
        </>
    );
});
