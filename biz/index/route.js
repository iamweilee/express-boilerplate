'use strict';

const express = require('express');
const router = express.Router();
const action = require('./action');
/* GET home page. */
router.get('/', action.index);

router.post('/signup', action.signup);
router.post('/signin', action.signin);
router.get('/signout', action.signout);
router.get('/session', action.getSession);

module.exports = router;
