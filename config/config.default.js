exports.app = {
	port: 8000,
	siteName: '期乎',
	env: process.env.NODE_ENV || 'dev',
	description: 'express 样板项目',
  keywords: 'express express-boilerplate express样板'
};

exports.logger = {
	defaultLevel: 'ERROR',
};

exports.db = {
  database: 'db_test',
  username: 'root',
  password: 'testpwd',
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
  // password: 'Weiwei-1202',
  db: 1
};
