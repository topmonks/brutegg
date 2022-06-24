import swell from "swell-node";

export const swellNodeClient = swell.createClient(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);
