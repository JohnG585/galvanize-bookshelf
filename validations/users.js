'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required().trim(),
    hashed_password: Joi.string().label('Password').required().min(7)
  }
};
