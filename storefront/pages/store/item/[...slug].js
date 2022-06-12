import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import Store from "..";
import { withLocale } from "../../../libs/router";
import { productsState } from "../../../state/products";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Item() {
  const router = useRouter();
  const { slug } = router.query;
  const products = useRecoilValue(productsState);
  const [productDisplayed, setProductDisplayed] = useState(true);

  const close = useCallback(() => {
    setProductDisplayed(false);
    router.push(withLocale(router.locale, "/store"));
  }, [router]);

  return (
    <Grid container>
      <Grid item sm={productDisplayed ? 6 : 12}>
        <Store products={{ results: products }} />
      </Grid>
      <Grid item sm={6} sx={[!productDisplayed && { display: "none" }]}>
        <Button onClick={close}>Close</Button>
        <div>Item {slug}</div>
      </Grid>
    </Grid>
  );
}
