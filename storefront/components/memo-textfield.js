import React, { memo, useCallback } from "react";
import { TextField } from "@mui/material";

/**
 * @type {import("@mui/material").TextField}
 */
export const MemoTextField = memo((opts) => {
  const onWheel = useCallback((e) => e.target.blur(), []);

  return <TextField {...opts} onWheel={onWheel} />;
});

MemoTextField.displayName = "MemoTextField";
