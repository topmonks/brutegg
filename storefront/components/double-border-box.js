import styled from "@emotion/styled";
import { alpha, Box } from "@mui/system";

export const style = {
  borderRadius: 0,
  border: `3px solid ${alpha("#314057", 0.3)}`,
  padding: "1px",
  boxShadow: `inset 0 0 20px 0 ${alpha("#000", 0.8)}, inset 0 0 0 1px ${alpha(
    "#fff",
    0.3
  )}, 0 0 0 1px ${alpha("#fff", 0.3)}`,
  background: `linear-gradient(0deg, ${alpha("#101112", 1)} 0%, ${alpha(
    "#111214",
    1
  )} 100%)`,
};

export default styled(Box)(() => style);
