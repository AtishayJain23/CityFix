const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
} = require("../controllers/complaint.controller");
const {createComplaintSchema,updateComplaintSchema} = require("../validators/complaint.validator");
const router = express.Router();
//console.log(createComplaintSchema);
const upload = require("../middlewares/upload.middleware");

router.post(
  "/",
  authenticate,
  upload.array("photos", 5),
  validate(createComplaintSchema),
  createComplaint,
);

router.get("/", authenticate, getMyComplaints);

router.get("/:id", authenticate, getComplaintById);
router.patch(
  "/:id",
  authenticate,
  validate(updateComplaintSchema),
  updateComplaint,
);

module.exports = router;
