import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Image from "next/image";

export default function PriceTag({ amount, displayLogo = true }) {
  return (
    <Box alignItems="center" display="flex" justifyContent="center">
      <span>{amount}</span>
      {displayLogo && (
        <Image
          alt="Brutecoin logo"
          height={16}
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
