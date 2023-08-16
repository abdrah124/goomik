import { useShowSnackbar } from "@/components/SnackMessage";
import { useEffect } from "react";

export const useEffectSnackbar = (
  condition: boolean,
  message: string,
  delay: number = 3000
) => {
  const snackBar = useShowSnackbar();
  useEffect(() => {
    if (condition) snackBar(message as string, delay);
  }, [message, snackBar, delay, condition]);
};
