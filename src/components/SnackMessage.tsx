"use client";

import { Snackbar } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";

const CloseSnackBarContext = createContext<() => void>(() => {});
const SnackBarStateContext = createContext<{
  open: boolean;
  message: string;
  delay: number;
}>({
  open: false,
  message: "",
  delay: 1300,
});
const OpenSnackBarContext = createContext<
  (message: string, delay?: number) => void
>((message, delay) => {});

export function SnackContext({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    open: boolean;
    message: string;
    delay: number;
  }>({
    open: false,
    message: "",
    delay: 1300,
  });

  const handleClose = useCallback(() => {
    setState((c) => ({ ...c, open: false }));
  }, []);

  const open = useCallback((message: string, delay: number = 1300) => {
    setState((c) => ({ ...c, open: true, message, delay }));
  }, []);

  return (
    <SnackBarStateContext.Provider value={state}>
      <CloseSnackBarContext.Provider value={() => handleClose()}>
        <OpenSnackBarContext.Provider value={open}>
          {children}
        </OpenSnackBarContext.Provider>
      </CloseSnackBarContext.Provider>
    </SnackBarStateContext.Provider>
  );
}

export function useShowSnackbar() {
  const open = useContext(OpenSnackBarContext);

  const openSnackbar = (message: string, delay?: number) => {
    open(message, delay);
  };

  return openSnackbar;
}

export default function SnackMessage() {
  const { open, message, delay } = useContext(SnackBarStateContext);
  const handleClose = useContext(CloseSnackBarContext);

  return (
    <Snackbar
      open={open}
      message={message}
      onClose={handleClose}
      autoHideDuration={delay}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    />
  );
}
