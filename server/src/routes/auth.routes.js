const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const authenticate = require("../middlewares/authenticate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const {
  register,
  login,
  logout,
  me,
} = require("../controllers/auth.controller");
const authorize = require("../middlewares/authorize.middleware");

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/logout", logout);

router.get("/me", authenticate, me);
router.get("/test-admin", authenticate, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});
module.exports = router;
