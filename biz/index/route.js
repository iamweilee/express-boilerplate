'use strict';

const express = require('express');
const router = express.Router();
const indexAction = require('./action');
/* GET home page. */
router.get('/', indexAction.index);

module.exports = router;
