import { atomFamily } from "recoil";

export const productVariantState = atomFamily({
  key: "productVariantState",
  default: null,
});

export const productOptionsState = atomFamily({
  key: "productOptionsState",
  default: null,
});
