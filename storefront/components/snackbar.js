import { IconButton, Snackbar as MuiSnackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { snackbarState } from "../state/snackbar";

export default function Snackbar() {
  const snackbar = useRecoilValue(snackbarState);
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const displayedSnackbar = useRef();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!snackbar) {
      return;
    }

    if (displayedSnackbar.current) {
      setOpen(false);
      setSnackbarQueue((q) => q.concat([snackbar]));
    } else {
      displayedSnackbar.current = snackbar;
      setOpen(true);
    }
  }, [snackbar]);

  useEffect(() => {
    if (!open) {
      displayedSnackbar.current = undefined;
    }
  }, [open]);

  const onExited = useCallback(() => {
    if (snackbarQueue.length) {
      displayedSnackbar.current = snackbarQueue[0];
      setOpen(true);
      setSnackbarQueue((q) => q.slice(1));
    }
  }, [snackbarQueue]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getAction = displayedSnackbar.current?.getAction;
  const getChildren = displayedSnackbar.current?.getChildren;
  let autoHide = displayedSnackbar.current?.autoHide;

  if (autoHide === undefined) {
    autoHide = 4000;
  }

  const displayedAction = getAction && getAction(handleClose);
  const displayedChildren = getChildren && getChildren(handleClose);

  return (
    <MuiSnackbar
      TransitionProps={{ onExited: onExited }}
      action={
        displayedAction || (
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            sx={{ p: 0.5 }}
          >
            <CloseIcon />
          </IconButton>
        )
      }
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={autoHide}
      message={displayedSnackbar.current?.message}
      onClose={handleClose}
      open={open}
    >
      {displayedChildren}
    </MuiSnackbar>
  );
}
