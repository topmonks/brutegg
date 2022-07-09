import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getProduct } from "../../libs/swell";
import { ProductPropTypes } from "../../types/swell";
import { Box } from "@mui/system";
import { productState } from "../../state/products";
import { useTranslation } from "react-i18next";
import StyledDescription from "../styled-description";

/**
 *
 * @param {Object} props
 * @param {import("../../types/swell").Product} props.product
 */
export function QuestDetail({ product: _product }) {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    slug: [id],
  } = router.query;

  const [refreshedProduct, setProduct] = useRecoilState(
    productState(_product.id)
  );

  const product = refreshedProduct ?? _product;

  // refresh product in browsers DOM
  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [setProduct, id]);

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        <Box sx={{ flexGrow: 1, pb: 2 }}>
          <Typography component="h1" variant="h3Outglow">
            {product.name}
          </Typography>
          <Typography sx={{ mt: 2 }} variant="subtitle1">
            {product.attributes.brute_quest_perex?.value}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 2, overflowY: "auto" }}>
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></StyledDescription>
        </Box>
        <Box sx={{ flexGrow: 1, mt: 3 }}></Box>
      </Box>
    </Fragment>
  );
}

QuestDetail.propTypes = {
  product: ProductPropTypes,
};
