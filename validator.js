const express = require("express");

const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().alphanum().min(4),
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp("[0-9]{3} [0-9]{3} [0-9]{4}"))
    .required(),
});

module.exports = schema;
