import React from "react";
import { withStyles } from "@mui/core";
import ListItem from "@mui/core/ListItem";

export const UnpaddedListItem = withStyles({ root: { padding: 0 } })(ListItem) as any;
