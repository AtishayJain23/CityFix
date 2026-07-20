const express = require("express");

const authenticate = require("../middlewares/authenticate.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  updateComplaintStatus,
  getAssignedComplaints,
} = require("../controllers/employee.controller");

const {
  updateComplaintStatusSchema,
} = require("../validators/employee.validator");

const router = express.Router();

router.get(
  "/complaints",
  authenticate,
  authorize("employee"),
  getAssignedComplaints,
);

router.patch(
  "/complaints/:id/status",
  authenticate,
  authorize("employee"),
  validate(updateComplaintStatusSchema),
  updateComplaintStatus,
);

module.exports = router;
