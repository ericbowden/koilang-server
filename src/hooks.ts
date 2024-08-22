import { useMediaQuery, useTheme } from "@mui/material";

export function useCurrentBreakpoint() {
  const theme = useTheme();

  // Define breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLg = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("lg"));

  let currentBreakpoint: string;
  let breakpointSize: number;

  if (isXs) {
    currentBreakpoint = "xs";
    breakpointSize = theme.breakpoints.values.xs;
  } else if (isSm) {
    currentBreakpoint = "sm";
    breakpointSize = theme.breakpoints.values.sm;
  } else if (isMd) {
    currentBreakpoint = "md";
    breakpointSize = theme.breakpoints.values.md;
  } else if (isLg) {
    currentBreakpoint = "lg";
    breakpointSize = theme.breakpoints.values.lg;
  } else if (isXl) {
    currentBreakpoint = "xl";
    breakpointSize = theme.breakpoints.values.xl;
  } else {
    throw new Error("Breakpoint not found!");
  }

  return { currentBreakpoint, breakpointSize };
}
