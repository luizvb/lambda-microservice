const Joi = require('joi')

module.exports = Joi.object().keys({
  cnpj: Joi.string().min(1).required().trim(),
  companyName: Joi.string().min(1).required().trim(),
  email: Joi.string().email().required().trim(),

  stateRegistration: Joi.string().min(1).required().trim(),
  tradingName: Joi.string().min(1).required().trim(),
  imageUrl: Joi.string().optional().trim(),
  mobile: Joi.string().optional().trim(),
  address: Joi.string().min(1).required().trim(),
  state: Joi.string().min(1).required().trim(),
  addressDetail: Joi.string().optional().trim(),
  district: Joi.string().min(1).required().trim(),
  city: Joi.string().min(1).required().trim(),
  country: Joi.string().min(1).required().trim(),
  zipCode: Joi.string().min(1).required().trim(),
  contactName: Joi.string().min(1).required().trim(),
  phone: Joi.array().items(Joi.string()),
  cnpjWs: Joi.object().required(),
  paymentData: Joi.object().required()

  })
