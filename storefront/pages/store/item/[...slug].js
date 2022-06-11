import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Store from "..";
import { withLocale } from "../../../libs/router";
import { productsState } from "../../../state/products";

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Item() {
  const router = useRouter();
  const { slug } = router.query;
  const products = useRecoilValue(productsState);

  return (
    <Grid container>
      <Grid item sm={6}>
        <Store products={{ results: products }} />
      </Grid>
      <Grid item sm={6}>
        <Button
          onClick={() => router.push(withLocale(router.locale, "/store"))}
        >
          Close
        </Button>
        <div>Item {slug}</div>
      </Grid>
    </Grid>
  );
}
