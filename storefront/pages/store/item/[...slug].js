import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { ProductList } from "..";
import { withLocale } from "../../../libs/router";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Item() {
  const router = useRouter();
  const { slug } = router.query;
  const [productDisplayed, setProductDisplayed] = useState(true);

  const close = useCallback(() => {
    setProductDisplayed(false);
    router.push(withLocale(router.locale, "/store"));
  }, [router]);

  return (
    <Grid container>
      <Grid
        item
        sm={productDisplayed ? 6 : 12}
        sx={[productDisplayed && { display: { xs: "none", sm: "block" } }]}
      >
        <ProductList />
      </Grid>
      <Grid item sm={6} sx={[!productDisplayed && { display: "none" }]} xs={12}>
        <Button onClick={close}>Close</Button>
        <div>Item {slug}</div>
      </Grid>
    </Grid>
  );
}
