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
          height={21}
          src="https://res.cloudinary.com/brutegg/image/upload/v1658926193/brutegg-swell/helmet-price-tag_uqgpy3.svg"
          width={21}
        />
      )}
      {displayLetter && (
        <img
          alt="Brutecoin logo"
          height={15}
          src="https://res.cloudinary.com/brutegg/image/upload/v1657558525/brutegg-swell/helmet_pldqf4.svg"
          width={15}
        />
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
