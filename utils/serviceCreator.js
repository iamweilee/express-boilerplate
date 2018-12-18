'use strict';

const logger = require('logger').getLogger('service');

module.exports = (Model) => {
  return class Service {
    static get instance() {
      if (!this._instance) {
        this._instance = new this();
      }
      return this._instance;
    }
  
    async listByPage(options={}) {
      let offset = options.offset || 0,
        limit = options.limit || 10,
        order_by = options.orderby || 'id',
        order = options.order || 'ASC',
        where = options.where || {},
        attributes = options.attributes || {};

        where = filterWhere(where, Model);
      let condition = {
        offset,
        limit,
        order: [[ order_by, order.toUpperCase() ]],
        where,
        attributes
      };

      let result;
      try {
        result = Model.findAndCountAll(condition);
      }
      catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async findById(id, options={}) {
      let result;
      try {
        result = await Model.findByPk(id, options);
      }
      catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async findAll(options={}) {
      let result;
      try {
        result = await Model.findAll(options);
      }
      catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async findOne(options={}) {
      let result;
      try {
        result = await Model.findOne(options);
      }
      catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async create(obj) {
      let result;
      try {
        result = await Model.create(obj);
        // result = result.toJSON();
      } catch (error) {
        result = error;
        logger.error(error);
      }
  
      return result;
    }
  
    async update(updates, options={}) {
      let result;
      try {
        result = await Model.update(updates, options);
      }
      catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async upsert(updates, options={}) {
      let result;
      try {
        result = await Model.upsert(updates, options);
      }
      catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async del(options={ where: {} }) {
      let result;
      try {
        result = await Model.destroy(options);
      }
      catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async bulkCreate(list) {
      let result;
      try {
        result = await Model.bulkCreate(list);
      } catch (error) {
        result = error;
        logger.error(error);
      }

      return result;
    }
  
    async bulkUpsert(list, options={}) {
      let resultList = [], result;
      for (let i=0; i < list.length; i++) {
        result = await this.upsert(list[i], options);
        resultList.push(result);
      }

      return resultList;
    }
  };
};


function filterWhere(where, Model) {
  let attributes = Model.attributes;
  let newWhere = {};
  for (let i in where) {
    if (Reflect.has(attributes, i)) {
      newWhere[i] = where[i];
    }
  }
  return newWhere;
}