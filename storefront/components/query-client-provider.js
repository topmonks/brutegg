import { Alert, AlertTitle, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "react-query";
import { useRecoilState } from "recoil";
import { snackbarState } from "../state/snackbar";
import window from "../libs/window";

export default function QueryClientProvider({ children, ...opts }) {
  const { t } = useTranslation();
  const [, setSnackbar] = useRecoilState(snackbarState);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {},
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
      {children}
    </ReactQueryClientProvider>
  );
}

QueryClientProvider.propTypes = {
  children: PropTypes.node,
};
