const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { validateRegister, validateLogin } = require('../validations/auth.validation');

const router = express.Router();

// Public routes
router.post('/register', validate(validateRegister), authController.register);
router.post('/login', validate(validateLogin), authController.login);
router.post('/logout', authController.logout);

// Protected routes
router.get('/me', authenticate, authController.getProfile);

module.exports = router;
