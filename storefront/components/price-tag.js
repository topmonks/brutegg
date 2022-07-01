import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";

export default function PriceTag({
  children,
  amount,
  displayLogo = true,
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
      {children || <span>{amount}</span>}
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
  children: PropTypes.node,
  displayLogo: PropTypes.bool,
};
