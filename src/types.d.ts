interface ParsedResponse {
  parsed: unknown;
  html: string;
}

interface AppStateType {
  response: ParsedResponse | Record<string, never>;
}

interface AppStateContextType {
  appState: AppStateType;
  setAppState: (value: Partial<AppStateType>) => void;
}
