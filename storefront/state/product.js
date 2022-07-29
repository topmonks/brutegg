import { atom, atomFamily } from "recoil";

export const productRarityFilterState = atom({
  key: "productRarityFilterState",
  default: [],
});

export const productVariantState = atomFamily({
  key: "productVariantState",
  default: null,
});

export const productOptionsState = atomFamily({
  key: "productOptionsState",
  default: null,
});
