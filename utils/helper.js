const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const shortid = require('shortid');

exports.createUUID = function() {
  return uuidv4();
};

exports.createShortID = function() {
  return shortid.generate();
};

exports.random = _.random;

exports.randomCode = function(n=6) {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += _.random(i === 0 ? 1 : 0, 9);
  }
  return s;
};

exports.getClientIp = function (req) {
  return req.headers['x-forwarded-for']
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress
      || '';
};


exports.buildDataResponse = buildDataResponse;
exports.buildErrorResponse = buildErrorResponse;
exports.buildDataRsp = buildDataResponse;
exports.buildErrorRsp = buildErrorResponse;

function buildDataResponse(data) {
  typeof data === 'string' && (data = { text: data });
  return {
    code: 1,
    data
  }
}

function buildErrorResponse(error, message) {
  typeof error === 'string' && (error = { message: error });
  return {
    code: 0,
    error,
    message
  };
}