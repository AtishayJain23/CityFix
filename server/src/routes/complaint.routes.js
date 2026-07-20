const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const validate = require("../middlewares/validate.middleware");
const authorize = require("../middlewares/authorize.middleware");
const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaint.controller");
const {
  createComplaintSchema,
  updateComplaintSchema,
} = require("../validators/complaint.validator");
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

router.delete("/:id", authenticate, deleteComplaint);
router.get("/test-admin", authenticate, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});
module.exports = router;
