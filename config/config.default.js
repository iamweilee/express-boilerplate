'use strict';

exports.app = {
	port: 8000,
	siteName: '自定义网站名',
	env: process.env.NODE_ENV || 'dev',
	description: 'express 样板项目',
  keywords: 'express express-boilerplate express样板'
};

exports.logger = {
	defaultLevel: 'ERROR',
};

exports.db = {
  database: 'express_boilerplate',
  username: 'root',
  password: 'your-dbpassword',
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  logging: true,
  benchmark: false,
  // set: {
  //   autocommit: true
  // },
  pool: {
    max: 10,
    min: 0,
    // idle: 10000,
    // acquire: 20000,
    // evict: 20000,
    // autostart: true
  }
};

exports.redis = {
  host: '127.0.0.1',
  port: 6379,
  password: 'your-redispassword',
  db: 1
};

exports.session = {
  secret: 'session:express-boilerplate.com',
  name: 'express-boilerplate.sid',
  cookieOptions: {
    path: '/',
    // domain: 'express-boilerplate.com', // 若未正确设置此项可导致每次请求都重新创建新的session
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 * 1000 //ms 一个月
  }
};

// 阿里短信服务
exports.sms = {
  accessKeyId: 'your-accessKeyId',
  secretAccessKey: 'your-secretAccessKey',
  signName: 'your-SmsSignName',
  templateCode: {
    signUp: 'SMS_000000001',
    resetPassword: 'SMS_000000002',
    newPassword: 'SMS_000000003'
  },
  param: {
    signUp: 'number',
    resetPassword: 'number',
    newPassword: 'password'
  },
  maxInterval: 15 * 60 * 1000 //ms 15分钟
  // frequencyControl: { // 一天最多发送 10 次
  //   interval: 24 * 60 * 60 * 1000,
  //   times: 10
  // }
};
