'use strict';

const exampleService = require('./service');

exports.list = async (req, res, next) => {
  let list = await exampleService.instance.findAll();
  res.json(list);
};
