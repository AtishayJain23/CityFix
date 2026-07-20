const Joi = require("joi");

const updateComplaintStatusSchema = Joi.object({
  status: Joi.string().valid("In Progress", "Resolved").required(),
});

module.exports = {
  updateComplaintStatusSchema,
};
