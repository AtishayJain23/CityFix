const Joi = require("joi");

const updateComplaintStatusSchema = Joi.object({
  status: Joi.string().valid("In Progress", "Resolved","Rejected").required(),
});

module.exports = {
  updateComplaintStatusSchema,
};
