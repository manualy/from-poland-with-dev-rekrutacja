import { useContext } from "react";
import { AlertQueueContext } from "@/context/AlertQueueContextProvider";

export const useAlertQueueContext = () => {
  const context = useContext(AlertQueueContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useAlertQueueContext must be used within a AlertQueueContextProvider."
    );
  }

  return context;
};
