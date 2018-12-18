const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const shortid = require('shortid');
const crypto = require('crypto');
const createError = require('http-errors');

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

exports.encodePassword = function(password, algorithm='sha1') {
  return crypto.createHash(algorithm).update(password).digest('hex');
};

exports.createError = createError;

exports.toNextRouter = function(res, next, result) {
  res.locals.uriMatched = true;
  res.locals.result = result;
  next();
};

exports.buildDataResponse = buildDataResponse;
exports.buildErrorResponse = buildErrorResponse;
// exports.buildFieldsErrorResponse = buildFieldsErrorResponse;
exports.buildDataRsp = buildDataResponse;
exports.buildErrorRsp = buildErrorResponse;
// exports.buildFieldsErrorRsp = buildFieldsErrorResponse;

function buildDataResponse(data) {
  typeof data === 'string' && (data = { text: data });
  if (_.isUndefined(data)) {
    data = null;
  }
  return {
    success: true,
    data
  }
}

function buildErrorResponse(error) {
  typeof error === 'string' && (error = { message: error });

  if (error.errors) {
    error = {
      fieldErrors: error.errors && error.errors.map(item => {
        return {
          fieldName: item.path,
          value: item.value,
          message: item.message,
          validatorKey: item.validatorKey,
          type: item.type
        }; 
      }),
      // errors: error.errors && error.errors.map(item => {
      //   return {
      //     message: item.message,
      //     type: item.type,
      //     path: item.path,
      //     value: item.value,
      //     validatorKey: item.validatorKey,
      //     validatorName: item.validatorName,
      //     validatorArgs: item.validatorArgs
      //   };
      // }) || [],
    };
  }
  else if (error.fields) {
    error = {
      fieldErrors: error.fields && error.fields.map(field => {
        return {
          fieldName: field,
          value: error.value,
          name: error.name
        };
      })
    }
  }
  return {
    success: false,
    error
  };
}

// function buildFieldsErrorResponse(fieldsError) {
//   return {
//     success: false,
//     fieldsError
//   };
// }