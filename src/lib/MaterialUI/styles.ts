import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles"

export const useTypographyStyles = makeStyles((theme: Theme) =>
    ({
        pass: {
            color: "red",
        },
        fail: {
            color: theme.palette.primary.main,
        },
        small: {
            fontSize: "14px",
        },
        withTooltip: {
            borderBottom: "1px dashed",
            borderBottomColor: theme.palette.secondary.dark,
        },
    })
);

export const useLayoutStyles = makeStyles((theme: Theme) =>
    ({
        noPadding: { padding: 0 },
    })
);
