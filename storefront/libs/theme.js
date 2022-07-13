import {
  alpha,
  createTheme,
  darkScrollbar,
  experimental_sx,
  responsiveFontSizes,
} from "@mui/material";
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

const createColor = (mainColor) =>
  abstractTheme.palette.augmentColor({ color: { main: mainColor } });

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
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: experimental_sx(
            (() => {
              const sharedButtonAttrs = {
                borderRadius: 0,
                border: (theme) => `2px solid ${theme.palette.primary.main}`,
                boxShadow: (theme) =>
                  `0 0 10px ${alpha(theme.palette.primary.main, 1)}`,
                background: (theme) =>
                  `linear-gradient(0deg, ${alpha(
                    theme.palette.primary.main,
                    1
                  )} 0%, ${alpha(theme.palette.primary.main, 0.7)} 50%, ${alpha(
                    theme.palette.primary.main,
                    1
                  )} 100%) no-repeat, ${alpha("#000", 1)}`,
                backgroundPosition: "center bottom",
                backgroundSize: "auto 200%",
                transition: "background-position 0.3s ease",
                fontWeight: "bold",
                textTransform: "none",
              };

              return {
                ...sharedButtonAttrs,
                "&:hover": {
                  ...sharedButtonAttrs,
                  backgroundPosition: "center 50%",
                  boxShadow: (theme) =>
                    `0 0 20px ${alpha(theme.palette.primary.main, 1)}`,
                },
                "&.Mui-disabled": {
                  background: (theme) =>
                    theme.palette.action.disabledBackground,
                  border: (theme) =>
                    `2px solid ${theme.palette.action.disabled}`,
                },
              };
            })()
          ),
        },
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
    [RARITY.COMMON]: createColor("#E5E5E5"),
    [RARITY.UNCOMMON]: createColor("#57D22C"),
    [RARITY.RARE]: createColor("#0D7BE1"),
    [RARITY.EPIC]: createColor("#B70DE1"),
    [RARITY.LEGENDARY]: createColor("#F6851B"),
    confirmGreen: createColor("#08C375"),
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
