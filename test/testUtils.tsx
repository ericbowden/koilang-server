import { render } from "@testing-library/react";
import { AppStateContext, AppStateContextType } from "../src/state";

// wraps component with the state context provider so that context hook is wired up correctly
export function renderComponent(
  component: JSX.Element,
  appState: AppStateContextType["appState"],
  setAppState: AppStateContextType["setAppState"] = () => null,
) {
  return render(
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {component}
    </AppStateContext.Provider>,
  );
}
