import { atom, atomFamily } from "recoil";

export const productsState = atom({
  key: "productsState",
  default: [],
});

export const productState = atomFamily({
  key: "productState",
  default: (_id) => null,
});
