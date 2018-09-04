'use strict';

const express = require('express');
const router = express.Router();
const exampleAction = require('./action');

router.get('/', exampleAction.list);

module.exports = router;
