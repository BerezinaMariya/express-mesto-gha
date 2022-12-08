const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('../../config/config');
const { isIdValid } = require('../../helpers/isIdValid');

const nameValidationRequirements = Joi.string().required().min(2).max(30);
const linkValidationRequirements = Joi.string().required().regex(URL_REGEX);

module.exports.validateCardData = celebrate({
  body: Joi.object().keys({
    name: nameValidationRequirements,
    about: linkValidationRequirements,
  }).unknown(true),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    userId: isIdValid,
  }).unknown(true),
});
