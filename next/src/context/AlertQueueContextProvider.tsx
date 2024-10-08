"use client";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { createContext, Fragment, useCallback, useMemo } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

export const AlertQueueContext = createContext<
  | {
      addAlert: (alert: IAlert) => void;
    }
  | undefined
>(undefined);

interface IAlert {
  message: string;
  type: "success" | "error";
}

export function AlertQueueContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addAlert = useCallback(({ message, type }: IAlert) => {
    enqueueSnackbar(message, {
      variant: type,
      autoHideDuration: 6000,
      action: (key) => (
        <Fragment>
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CancelIcon color="action" />
          </IconButton>
        </Fragment>
      ),
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      addAlert: addAlert,
    }),
    [addAlert]
  );

  return (
    <AlertQueueContext.Provider value={contextValue}>
      {children}
    </AlertQueueContext.Provider>
  );
}
