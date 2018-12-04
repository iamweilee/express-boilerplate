// 临时数据库
'use strict';

const Sequelize = require('sequelize');
const cfg = require('config').db;
const logger = require('logger').getLogger('db');

const sequelize = new Sequelize(
    'mysql',   // 数据库名, 这里固定为mysql是因为项目相关的数据库尚未创建, 数据库通常默认有名为mysql的数据库
    cfg.username,   // 用户名
    cfg.password,   // 用户密码
    {
      dialect: cfg.dialect,   // 数据库使用mysql
      host: cfg.host,         // 数据库服务器ip
      port: cfg.port,         // 数据库服务器端口
      pool: cfg.pool,
      logging: cfg.logging && function(sql) {
        logger.info(sql);
      },
      benchmark: cfg.benchmark, // 是否打印sql执行时间
      // 'define': {
      //   字段以下划线（_）来分割（默认是驼峰命名风格）
      //   underscored: true,
      //   engine: 'INNO_DB' // 设置mysql数据库引擎, INNO_DB or MYISAM
      // }
    }
);

sequelize.sync({ force: false });
// SET AUTOCOMMIT = 0 执行这条sql可能会提高InnoDB类型数据库的性能
module.exports = sequelize;