'use strict';

const BaseAction = require('utils/actionCreator')(require('./service').instance);

class Action extends BaseAction {

}

module.exports = Action.instance;