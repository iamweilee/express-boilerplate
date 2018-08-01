'use strict';

const express = require('express');
const router = express.Router();
const exampleController = require('./controller');

router.get('/', exampleController.list);

module.exports = router;
