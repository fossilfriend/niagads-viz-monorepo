import React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Drawer, Divider, Button, Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DrawerProps, DrawerContentsProps, DRAWER_WIDTH, DrawerState, SHIFT_X } from "./types";



export const contentStyles = (theme: Theme) => ({
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    //paddingLeft: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: SHIFT_X,
  },
});

const useDrawerStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    marginTop: theme.spacing(1),
    justifyContent: "right",
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  children: {
    marginTop: 100,
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    marginTop: "90px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export const PersistentDrawerLeft: React.FC<
  DrawerProps & DrawerContentsProps & DrawerState
> = ({ title, children, isOpen, handleClose }) => {
  const classes = useDrawerStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(isOpen);

  const onDrawerOpen = () => {
    setOpen(true);
  };

  const onDrawerClose = () => {
    setOpen(false);
    handleClose();
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}>
      <Box className={classes.children}>{children}</Box>
      <Divider className={classes.divider} />
      <Button
        variant="text"
        color="primary"
        endIcon={<ChevronLeftIcon />}
        onClick={onDrawerClose}
        fullWidth={true}
        size="small"
        className={classes.actionButton}>
        {title ? title : "Hide"}
      </Button>
    </Drawer>
  );
};
