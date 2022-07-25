import { Alert, AlertTitle, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { snackbarState } from "../state/snackbar";
import window from "../libs/window";

export default function QueryClientProvider({ children, state, ...opts }) {
  const { t } = useTranslation();
  const [, setSnackbar] = useRecoilState(snackbarState);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {},
        mutationCache: new MutationCache({
          onError: (error) => {
            window.Rollbar?.error(error);
            setSnackbar({
              message: t("Error response", { ns: "Common" }) + " " + error,
            });
          },
        }),
        queryCache: new QueryCache({
          onError: (error) => {
            window.Rollbar?.error(error);
            setSnackbar({
              getChildren: (handleClose) => {
                return (
                  <Alert
                    action={
                      <Button
                        color="error"
                        disableElevation
                        onClick={() => {
                          handleClose();
                        }}
                        variant="contained"
                      >
                        {t("Close", { ns: "Common" })}
                      </Button>
                    }
                    severity="error"
                  >
                    <AlertTitle>{error.message}</AlertTitle>
                  </Alert>
                );
              },
            });
          },
        }),
      }),
    [setSnackbar, t]
  );

  return (
    <ReactQueryClientProvider client={queryClient} {...opts}>
      <Hydrate state={state}>{children}</Hydrate>
    </ReactQueryClientProvider>
  );
}

QueryClientProvider.propTypes = {
  children: PropTypes.node,
  state: PropTypes.object,
};
