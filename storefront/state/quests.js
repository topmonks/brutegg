import { atom, atomFamily } from "recoil";

export const questsState = atom({
  key: "questsState",
  default: [],
});

export const questState = atomFamily({
  key: "questState",
  default: (_id) => null,
});
