import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import ProfileLayout from "../../components/profile/profile-layout";
import UnlockMetamaskLayout from "../../components/unlock-metamask-layout";
import { swellNodeClient } from "../../libs/swell-node";
import { withSessionSsr } from "../../libs/with-session";
import Head from "next/head";
import { OrderPropTypes } from "../../types/swell";
import useUpdateSession from "../../hooks/use-update-session";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DoubleBorderBox from "../../components/double-border-box";
import { POLYGON_EXPLORER } from "../../libs/constants";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box } from "@mui/system";
import { withLocale } from "../../libs/router";

export const getServerSideProps = withSessionSsr(async (context) => {
  const publicAddress = context.req.session.user?.address;
  const resultProps = {};

  if (!publicAddress) {
    return { props: resultProps };
  }

  resultProps.address = publicAddress;

  let {
    results: [user],
  } = await swellNodeClient.get("/accounts", {
    where: {
      public_address: {
        $eq: publicAddress,
      },
    },
    limit: 1,
  });

  if (!user) {
    resultProps.orders = [];
    return { props: resultProps };
  }

  let { results: orders } = await swellNodeClient.get("/orders", {
    where: {
      account_id: user.id,
    },
    expand: ["items.product", "items.variant"],
  });

  resultProps.orders = orders;

  return {
    props: resultProps,
  };
});

/**
 *
 * @param {{orders: import("../../types/swell").Order[]}} param
 * @returns
 */
export default function ListOrders({ address, orders = [] }) {
  const { t } = useTranslation("Profile.Orders");
  useUpdateSession(address, "address");

  const router = useRouter();

  return (
    <ProfileLayout>
      <Head>
        <title>{t("List Orders", { ns: "Titles" })} | Brute</title>
      </Head>
      <UnlockMetamaskLayout
        AlignProps={{
          sx: {
            justifyContent: "flex-start !important",
            alignItems: "flex-start !important",
            "& .inner": {
              width: {
                md: "60%",
              },
            },
          },
        }}
      >
        <TableContainer component={DoubleBorderBox}>
          <Table aria-label={t("List Orders", { ns: "Titles" })}>
            <TableHead>
              <TableRow>
                <TableCell>{t("Created at")}</TableCell>
                <TableCell>{t("Items")}</TableCell>
                <TableCell>{t("Transaction")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => {
                return (
                  <TableRow
                    key={o.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(o.date_created).toLocaleDateString(
                        router.locale
                      )}
                      ,{" "}
                      {new Date(o.date_created).toLocaleTimeString(
                        router.locale
                      )}
                    </TableCell>
                    <TableCell>
                      {o.items.map((i, ix) => {
                        const thumbnail =
                          i.product?.attributes.brute_thumbnail?.file ||
                          i.product.images?.[0]?.file;

                        return (
                          <Box
                            key={ix}
                            onClick={() => {
                              router.push(
                                withLocale(
                                  router.locale,
                                  "/store/item/" +
                                    i.product.id +
                                    "/" +
                                    i.product.slug
                                )
                              );
                            }}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            {thumbnail && (
                              <Box
                                sx={{
                                  position: "relative",
                                  width: "40px",
                                  height: "40px",
                                  mr: 1,
                                }}
                              >
                                <Image
                                  height={thumbnail.height}
                                  layout="fill"
                                  objectFit="contain"
                                  src={thumbnail.url}
                                  width={thumbnail.width}
                                />
                              </Box>
                            )}
                            {i.product.name}
                          </Box>
                        );
                      })}
                    </TableCell>
                    <TableCell>
                      <Typography variant="link">
                        <a
                          href={
                            (POLYGON_EXPLORER[o.metadata?.chainId] ||
                              "https://polygonscan.com/tx/") +
                            o.metadata?.transactionHash
                          }
                          rel="noreferrer"
                          target="_blank"
                        >
                          {o.metadata?.transactionHash}
                        </a>
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </UnlockMetamaskLayout>
    </ProfileLayout>
  );
}

ListOrders.propTypes = {
  orders: PropTypes.arrayOf(OrderPropTypes),
  address: PropTypes.string,
};
