import { createTheme, darkScrollbar } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#EA2122",
    },
    secondary: {
      main: "#EA2122",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2000,
    },
  },
});

export const darkTheme = createTheme(theme, {
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },
  },
});
export const lightTheme = createTheme(theme, { palette: { mode: "light" } });

export default darkTheme;
