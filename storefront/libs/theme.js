import { createTheme, darkScrollbar, responsiveFontSizes } from "@mui/material";
import { RARITY } from "./constants";

// to extend from
const abstractTheme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
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

const theme = responsiveFontSizes(
  createTheme(abstractTheme, {
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
      h3Outglow: {
        ...abstractTheme.typography.h3,
        textShadow: "0px 0px 12px #EA2122",
        fontWeight: "bold",
      },
      h4Outglow: {
        ...abstractTheme.typography.h4,
        textShadow: "0px 0px 12px #EA2122",
        fontWeight: "bold",
      },
      h5Outglow: {
        ...abstractTheme.typography.h5,
        textShadow: "0px 0px 12px #EA2122",
        fontWeight: "bold",
      },
      link: {
        color: abstractTheme.palette.primary.main,
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
    confirmGreen: {
      main: "#08C375",
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
