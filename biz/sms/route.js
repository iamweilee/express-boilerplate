const express = require('express');
const router = express.Router();
const { sendSignupCode, sendResetPasswordCode, sendNewPassword } = require('./action');

router.post('/signup', sendSignupCode);
router.post('/resetpassword', sendResetPasswordCode);
router.post('/newpassword', sendNewPassword);

module.exports = router;