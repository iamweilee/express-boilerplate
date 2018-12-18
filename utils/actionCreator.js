'use strict';

const logger = require('logger').getLogger('action');
import _ from 'lodash';

module.exports = (service) => {
  const { findAll, findById, create, listByPage } = service;
  const { toNextRouter, createError } = require('utils/helper');

  return class Action {
    static get instance() {
      if (!this._instance) {
        this._instance = new this();
      }
      return this._instance;
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
      
      let result = await listByPage({ where: query, limit, offset, order, orderby });
      toNextRouter(res, next, result);
    }

    async listAll(req, res, next) {
      let result = await findAll({ where: req.query });
      toNextRouter(res, next, result);
    }
    
    async save(req, res, next) {
      let result = await create(req.body);
      toNextRouter(res, next, result);
    }
    
    async findById(req, res, next) {
      let id = req.params.id;
      let result = await findById(id);
      toNextRouter(res, next, result);
    }

  };
};
