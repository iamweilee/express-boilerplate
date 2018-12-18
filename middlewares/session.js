const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { secret, cookieOptions, name } = require('config').session;

module.exports = session({
  store: new RedisStore(require('config').redis),
  secret,
  resave: true, // 强制保存session即使它没有变化
  // proxy: true,
  saveUninitialized: false, // don't create session until something stored
  cookie: cookieOptions,
  name
  // unset: 'destroy' // | 'keep'
});
