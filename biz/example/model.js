'use strict';

const Sequelize = require('sequelize');
const db = require('db');

const { STRING, BIGINT } = Sequelize;

module.exports = db.define(
  'example',
  {
    id: {
      type: BIGINT(20), // 字段类型
      allowNull: false, // 是否允许为NULL
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    mobile: {
      type: STRING(11), // 字段类型
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING, // 字段类型
      allowNull: false, // 是否允许为NULL
    }
  },
  {
    // 自定义表名
    freezeTableName: true,
    tableName: 'example',
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    timestamps: false,
  }
);