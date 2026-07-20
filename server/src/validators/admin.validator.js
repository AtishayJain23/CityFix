const Joi = require("joi");

const assignComplaintSchema = Joi.object({
  employeeId: Joi.string().required(),
});

module.exports = {
  assignComplaintSchema,
};
