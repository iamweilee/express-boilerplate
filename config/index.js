'use strict';

const cfg = require(`./config.${process.env.NODE_ENV || 'dev'}`);
const defaultCfg = require('./config.default');
const _ = require('lodash');

const clonedCfg = _.cloneDeep(cfg);
const clonedDefaultCfg = _.cloneDeep(defaultCfg);

function deepmerge(target, src) {
  for (let i in src) {
    let value = src[i];
    
    if (_.isPlainObject(value)) {
      if (!_.isPlainObject(target[i])) {
        target[i] = {};
      }
      deepmerge(target[i], value);
    }
    else {
      target[i] = value;
    }
  }
}

deepmerge(clonedDefaultCfg, clonedCfg);

module.exports = clonedDefaultCfg;