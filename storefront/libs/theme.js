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
