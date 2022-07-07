import PropTypes from "prop-types";
import { Fragment, useMemo } from "react";
import { Box } from "@mui/system";
import Image from "next/image";

import useGetCart from "../../hooks/use-get-cart";
import { Typography } from "@mui/material";
import PriceTag from "../price-tag";
import { calculateCartPrice } from "../../libs/swell";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { bruteState } from "../../state/brute-token";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { ethereumState } from "../../state/ethereum";
import getWeb3 from "../../libs/web3";

const BalanceItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

function Balances({ cartPrice }) {
  const { t } = useTranslation("Checkout");
  const brute = useRecoilValueLoadable(bruteState);
  const ethereum = useRecoilValue(ethereumState);

  const balanceAfterPurchase = useMemo(() => {
    if (!ethereum.web3Loaded) {
      return null;
    }

    if (brute.contents?.account?.balance == null) {
      return null;
    }

    if (!cartPrice) {
      return null;
    }

    const web3 = getWeb3();

    return web3.utils.toBN(brute.contents?.account?.balance).sub(cartPrice);
  }, [ethereum, brute, cartPrice]);

  return (
    <Fragment>
      <BalanceItem sx={{ mb: { sx: 0.5, sm: 2 } }}>
        <Typography>{t("Wallet balance")}</Typography>
        <PriceTag
          amount={brute.contents?.account?.balance || ""}
          displayLetter
          displayLogo={false}
          sx={{ fontWeight: "bold" }}
        />
      </BalanceItem>
      <BalanceItem sx={{ mb: { sx: 0.5, sm: 2 } }}>
        <Typography>{t("Purchase price")}</Typography>
        <PriceTag
          amount={cartPrice?.toString()}
          displayLetter
          displayLogo={false}
          negative
          sx={{ fontWeight: "bold" }}
        />
      </BalanceItem>
      <BalanceItem sx={{ mb: { sx: 0.5, sm: 10 } }}>
        <Typography>{t("Balance after purchase")}</Typography>
        <PriceTag
          amount={balanceAfterPurchase?.toString()}
          displayLetter
          displayLogo={false}
          sx={{ fontWeight: "bold" }}
        />
      </BalanceItem>
      <BalanceItem>
        <Typography sx={{ fontWeight: "bold" }}>{t("Total price")}</Typography>
        <Typography component="span" variant="h5">
          <PriceTag
            amount={cartPrice?.toString()}
            sx={{ fontWeight: "bold" }}
          />
        </Typography>
      </BalanceItem>
    </Fragment>
  );
}

Balances.propTypes = {
  cartPrice: PropTypes.object,
};

function CartItem({ item }) {
  const thumbnail =
    item.product?.attributes.brute_thumbnail?.file ||
    item.product.images?.[0]?.file;

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ position: "relative", height: "70px", width: "70px" }}>
          {thumbnail && (
            <Image
              height={thumbnail.height}
              layout="fill"
              objectFit="cover"
              src={thumbnail.url}
              width={thumbnail.width}
            />
          )}
        </Box>
        <Box>
          <Typography variant="subtitle1">{item.product.name}</Typography>
          <Typography variant="caption">
            <PriceTag
              amount={item.product.attributes.brute_price}
              displayLetter
              displayLogo={false}
            />
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
};

export default function CartSummary({ displayBalances = true }) {
  const { data: cart } = useGetCart();
  const ethereum = useRecoilValue(ethereumState);

  const items = cart?.items || [];

  const cartPrice = useMemo(() => {
    if (!cart) {
      return null;
    }
    if (!ethereum.web3Loaded) {
      return null;
    }

    return calculateCartPrice(cart);
  }, [cart, ethereum]);

  return (
    <Fragment>
      {items.map((i) => (
        <CartItem item={i} key={i.id} />
      ))}
      {displayBalances && (
        <Box sx={{ mt: { xs: 1, sm: 10 } }}>
          <Balances cartPrice={cartPrice} />
        </Box>
      )}
    </Fragment>
  );
}

CartSummary.propTypes = {
  displayBalances: PropTypes.bool,
};
