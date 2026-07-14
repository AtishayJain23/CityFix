const Joi = require("joi");

const createComplaintSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),

  description: Joi.string().trim().max(1000).required(),

  category: Joi.string()
    .valid(
      "Road",
      "Electricity",
      "Water",
      "Garbage",
      "Street Light",
      "Drainage",
    )
    .required(),

  latitude: Joi.number().required(),

  longitude: Joi.number().required(),
});

const updateComplaintSchema = Joi.object({
  title: Joi.string().trim().max(100),

  description: Joi.string().trim().max(1000),

  photos: Joi.array().items(
    Joi.object({
      url: Joi.string().required(),
      publicId: Joi.string().required(),
    }),
  ),
}).min(1);

module.exports = {
  createComplaintSchema,
  updateComplaintSchema,
};
