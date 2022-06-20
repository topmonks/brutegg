import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Image from "next/image";

export default function PriceTag({ amount, displayLogo = true, ...props }) {
  return (
    <Box
      alignItems="center"
      display="inline-flex"
      gap={0.5}
      justifyContent="center"
      {...props}
    >
      <span>{amount}</span>
      {displayLogo && (
        <Image
          alt="Brutecoin logo"
          height={16}
          layout="fixed"
          src="/letter-b.svg"
          width={13}
        />
      )}
    </Box>
  );
}

PriceTag.propTypes = {
  amount: PropTypes.string,
  displayLogo: PropTypes.bool,
};
