'use strict';

import Sequelize from 'sequelize';
import db from 'db';

const { STRING, BIGINT } = Sequelize;

module.exports = db.define(
  'loginhistory',
  {
    id: {
      type: BIGINT(20), // 字段类型
      allowNull: false, // 是否允许为NULL
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    loginName: { // 登录名
      type: STRING(20), // 字段类型
      allowNull: false
    },
    password: { // 登录密码
      type: STRING(100), // 字段类型
      allowNull: false, // 是否允许为NULL
    },
    ip: { // 登录的ip
      type: STRING(20),
      allowNull: true
    },
    userId: { // 用户id
      type: BIGINT(20),
      allowNull: false
    },
  },
  {
    // 自定义表名
    freezeTableName: true,
    tableName: 'loginhistory',
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    timestamps: false,
  }
);