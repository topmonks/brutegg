import Joi from "joi";

export const firstNameValidator = Joi.string();
export const lastNameValidator = Joi.string();
export const emailValidator = Joi.string().email({ tlds: { allow: false } });
export const phoneNumberValidator = Joi.string()
  .pattern(/^(\+420) ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/)
  .allow("");

export const countryValidation = Joi.string();

export const checkoutValidator = (value) => Joi.object({});
