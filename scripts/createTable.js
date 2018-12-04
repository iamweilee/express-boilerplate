// 该模块用于创建表
require('babel-register');

const { parsedWithBlank, parsedWithEqual } = require('../utils/args');

let args = parsedWithEqual();
let tableName = args.name;

if (!tableName) {
  console.error('Please input table name with "name=table_name".');
  return;
}


const Model = require(`../biz/${tableName}/model`);

if (!Model) {
  console.error(`Table "${tableName}" not found.`);
  return;
}

Model.drop().then(function() {
	Model.sync({force: true});
  console.log(`Recreate table "${tableName}" success.`);
});