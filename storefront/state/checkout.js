import { atom } from "recoil";

export const defaultFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  zip: "",
  country: "CZ",
};

export const checkoutFormState = atom({
  key: "checkoutFormState",
  default: defaultFormState,
});
