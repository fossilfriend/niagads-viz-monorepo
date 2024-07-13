import React from "react"

import { _deepCopy, _get, _hasOwnProperty, _isJSON, _isNA, _isNull, toExponential, toFixedWithoutZeros } from "@common/utils";
import { TAILWINDCSS_CLASSES } from "@common/tailwind"

import {
    TextRenderer,
    renderWithInfo,
    renderStyledText,
    renderNullValue,
    buildElementStyle
} from "./TextRenderer";
import { formatFloat } from "./Number";

const __TAILWIND_INLINE_CHART = {
    spark: {
        observed: "red",
        remainder: "black",
        bar: "h-full"
    }

}

export const PercentageBar = <T,>({ props }: TextRenderer<T>) => {
    const value = _get('value', props)

    if (_isNull(value)) {
        return renderNullValue(_get('nullValue', props))
    }

    if (_isNA(value)) {
        return renderNullValue()
    }

    const formattedValue = formatFloat(value, _get('precision', props, null))
    /*
<Grid container wrap="nowrap">
        <Grid item>{value.value}&nbsp;</Grid>
        <Box maxWidth="100px" maxHeight="1.4em">
          <Grid item container wrap="nowrap">
            <SparkBar type="filled" width={value.percentage} />
            <SparkBar type="remaining" width={100 - value.percentage} />
          </Grid>
        </Box>
      </Grid> */

    return <>{"Percentage Bar: " + JSON.stringify(Object.assign(props as any, { formattedValue: formattedValue }))}</>
}