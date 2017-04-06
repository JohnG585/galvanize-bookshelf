'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().max(5000),
    cover_url: Joi.string()
  }
};
