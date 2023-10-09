const express = require('express');

const authController = require('../controllers/Api/V1/AuthController');

const { userRegisterValidationRules, userLoginValidationRules } = require('../validations/Api/V1/UserValidation');

const router = express.Router();

router.post('/register', userRegisterValidationRules(), authController.register);
router.post('/login', userLoginValidationRules(), authController.login);

module.exports = router;
