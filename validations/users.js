'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    first_name: Joi.string().label('First Name').trim().min(2).required(),
    last_name: Joi.string().label('Last Name').trim().min(2).required(),
    email: Joi.string().label('Email').email().required().trim(),
    password: Joi.string().label('Password').min(7).strip().required()
  }
};
