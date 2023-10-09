const express = require("express");
const router = express.Router();

const authController = require("../controllers/Api/V1/AuthController");

const {
  userRegisterValidationRules,
  userLoginValidationRules,
} = require("../validations/Api/V1/UserValidation");


router.post(
  "/register",
  userRegisterValidationRules(),
  authController.register
);
router.post("/login", userLoginValidationRules(), authController.login);

module.exports = router;
