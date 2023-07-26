import React from "react";
import { ListItem } from "@mui/material";
import { withStyles } from "@mui/styles"
export const UnpaddedListItem = withStyles({ root: { padding: 0 } })(ListItem) as any;
