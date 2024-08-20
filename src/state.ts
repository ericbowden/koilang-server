import { createContext, useContext } from "react";
import { AppStateContextType } from "./types";

// create app context
export const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType,
);

// helper method to use app context in a hook
export const useAppStateContext = () => {
  return useContext(AppStateContext);
};
