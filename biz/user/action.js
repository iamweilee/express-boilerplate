'use strict';

const { findAll, findById, listByPage } = require('./service').instance;
const { toNextRouter, createError } = require('utils/helper');
const _ = require('lodash');
const BaseAction = require('utils/actionCreator')(require('./service').instance);

class Action extends BaseAction {
  async listAll(req, res, next) {
    let result = await findAll({ attributes: { exclude: ['password'] }, where: req.query });
    toNextRouter(res, next, result);
  }
  
  async findById(req, res, next) {
    let id = req.params.id;
    let result = await findById(id, { attributes: { exclude: ['password'] } });
    toNextRouter(res, next, result);
  }
  
  async listByPage(req, res, next) {
    let query = req.query;
    if (_.isUndefined(query.pageNum)) {
      return toNextRouter(res, next, createError('pageNum必填'));
    }
    if (!/^\d+$/.test(query.pageNum)) {
      return toNextRouter(res, next, createError('pageNum必须为数字'));
    }
  
    let pageSize = Number(query.pageSize) || 10,
      pageNum = Number(query.pageNum),
      limit = pageSize,
      offset = (pageNum - 1) * pageSize,
      order = query.order,
      orderby = query.orderby;
    
    let result = await listByPage({ attributes: { exclude: ['password'] }, where: query, limit, offset, order, orderby });
    toNextRouter(res, next, result);
  }
}

module.exports = Action.instance;