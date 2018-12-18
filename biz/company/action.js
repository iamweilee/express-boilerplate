'use strict';


const { create } = require('./service').instance;
const { toNextRouter } = require('utils/helper');
const BaseAction = require('utils/actionCreator')(require('./service').instance);

class Action extends BaseAction {
  async save(req, res, next) {
    let name = req.body.name;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    let result = await create({ name, startTime, endTime });

    toNextRouter(res, next, result);
  }
}

module.exports = Action.instance;