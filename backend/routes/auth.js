const express = require('express');
const { register, login, verifyOTP, forgotPassword, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);           // User registration
router.post('/login', login);                 // User login
router.get('/verify-otp', verifyOTP);        // Email verification
router.post('/forgot-password', forgotPassword);  // Request password reset
router.post('/reset-password/:token', resetPassword); // Reset password

module.exports = router;
