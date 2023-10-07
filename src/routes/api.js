const express = require('express');

const authController = require('../controllers/authController');

const { userRegisterValidationRules, userLoginValidationRules } = require('../validations/userValidation');

const router = express.Router();

router.post('/register', userRegisterValidationRules(), authController.register);
router.post('/login', userLoginValidationRules(), authController.login);

module.exports = router;
