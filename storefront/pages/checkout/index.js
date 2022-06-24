import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import swell from "swell-js";
import Form from "../../components/checkout/form";
import window from "../../libs/window";
import { snackbarState } from "../../state/snackbar";

export default function Checkout() {
  const { t } = useTranslation("Checkout");
  const [, setSnackbar] = useRecoilState(snackbarState);

  useEffect(() => {
    swell.cart.get().then((c) => console.log(c));
  }, []);

  const upsertCustomer = useCallback(
    (body = {}) => {
      window
        ?.fetch("/api/swell/upsert-customer", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(body),
        })
        .then(async (res) => {
          if (res.status === 200) {
            setSnackbar({
              message: t("Account successfully updated"),
            });
          } else {
            setSnackbar({
              message:
                t("Error response", { ns: "Common" }) +
                " " +
                (await res.text()),
            });
          }
        });
    },
    [t, setSnackbar]
  );

  return (
    <Grid container direction="row-reverse">
      <Grid item md={3} sm={5} xs={12}>
        items
      </Grid>
      <Grid item md={9} sm={7} xs={12}>
        <Box
          sx={{
            pl: {
              md: 5,
            },
          }}
        >
          <Typography component="h3" variant="h6">
            {t("Checkout")}
          </Typography>

          <Form onSubmit={upsertCustomer} />
        </Box>
      </Grid>
    </Grid>
  );
}
