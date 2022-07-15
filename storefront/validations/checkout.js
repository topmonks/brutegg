import Joi from "joi";

export const firstNameValidator = Joi.string();
export const lastNameValidator = Joi.string();
export const nickNameValidator = Joi.string().allow("");
export const emailValidator = Joi.string().email({ tlds: { allow: false } });
export const phoneNumberValidator = Joi.string()
  .pattern(/^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/)
  .allow("");

export const address1Validator = Joi.string();
export const address2Validator = Joi.string().allow("");
export const cityValidator = Joi.string();
export const zipValidatior = Joi.string();
export const countryValidator = Joi.string();

export const checkoutValidator = Joi.object({
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  email: emailValidator,
  phone: phoneNumberValidator,
  address1: address1Validator,
  address2: address2Validator,
  city: cityValidator,
  zip: zipValidatior,
  country: countryValidator,
}).unknown(true);
