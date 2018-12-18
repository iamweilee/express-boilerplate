'use strict';
const express = require('express');


module.exports = (action) => {
  const router = express.Router();

  router.get('/', action.listByPage);
  router.post('/', action.save);
  router.get('/:id(\\d+)', action.findById);

  return router;
};
