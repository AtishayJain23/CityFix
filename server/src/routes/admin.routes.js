const express = require("express");

const authenticate = require("../middlewares/authenticate.middleware");
const authorize = require("../middlewares/authorize.middleware");

const { getAllComplaints } = require("../controllers/admin.controller");
const { assignComplaint } = require("../controllers/admin.controller");
const { assignComplaintSchema } = require("../validators/admin.validator");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

router.get("/complaints", authenticate, authorize("admin"), getAllComplaints);
router.patch(
  "/complaints/:id/assign",
  authenticate,
  authorize("admin"),
  validate(assignComplaintSchema),
  assignComplaint,
);

module.exports = router;
