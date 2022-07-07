import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

export default function PriceTag({
  children,
  amount,
  displayLogo = true,
  displayLetter = false,
  negative = false,
  ...props
}) {
  const router = useRouter();

  try {
    amount = amount ? parseFloat(amount).toLocaleString(router.locale) : null;
  } catch (e) {
    console.error(e);
  }

  return (
    <Box
      alignItems="center"
      display="inline-flex"
      gap={0.5}
      justifyContent="center"
      {...props}
    >
      {children || (
        <span>
          {negative && "- "}
          {amount}
        </span>
      )}
      {displayLogo && (
        <img
          alt="Brutecoin logo"
          height={30}
          src="/b-price-tag.svg"
          width={25}
        />
      )}
      {displayLetter && (
        <img alt="Brutecoin logo" height={20} src="/letter-b.svg" width={12} />
      )}
    </Box>
  );
}

PriceTag.propTypes = {
  amount: PropTypes.string,
  children: PropTypes.node,
  displayLogo: PropTypes.bool,
  displayLetter: PropTypes.bool,
  negative: PropTypes.bool,
};
