import Joi from "joi";
import {
  address1Validator,
  cityValidator,
  countryValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  phoneNumberValidator,
  zipValidatior,
} from "./checkout";

export const discordValidator = Joi.string().allow("");
export const redditValidator = Joi.string().allow("");
export const instagramValidator = Joi.string().allow("");

export const profileValidator = Joi.object({
  firstName: firstNameValidator.allow(""),
  lastName: lastNameValidator.allow(""),
  email: emailValidator,
  phone: phoneNumberValidator.allow(""),
  discord: discordValidator.allow(""),
  reddit: redditValidator.allow(""),
  instagram: instagramValidator.allow(""),
  address1: address1Validator.allow(""),
  city: cityValidator.allow(""),
  zip: zipValidatior.allow(""),
  country: countryValidator.allow(""),
}).unknown(true);
