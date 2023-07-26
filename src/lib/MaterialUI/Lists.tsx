import React from "react";
import { withStyles } from "@mui/material";
import ListItem from "@mui/material/ListItem";

export const UnpaddedListItem = withStyles({ root: { padding: 0 } })(ListItem) as any;
