import { createTheme, darkScrollbar, responsiveFontSizes } from "@mui/material";
import { RARITY } from "./constants";

const theme = responsiveFontSizes(
  createTheme({
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
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      h3: {
        textShadow: "0px 0px 12px #EA2122",
        fontWeight: "bold",
      },
    },
  }),
  {
    factor: 10,
  }
);

export const darkTheme = createTheme(theme, {
  palette: {
    mode: "dark",
    [RARITY.COMMON]: {
      main: "#E5E5E5",
    },
    [RARITY.UNCOMMON]: {
      main: "#57D22C",
    },
    [RARITY.RARE]: {
      main: "#0D7BE1",
    },
    [RARITY.EPIC]: {
      main: "#B70DE1",
    },
    [RARITY.LEGENDARY]: {
      main: "#F6851B",
    },
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
