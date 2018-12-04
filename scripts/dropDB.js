'use strict';

require('babel-register');

const db = require('./tmpdb');

const { parsedWithBlank, parsedWithEqual } = require('../utils/args');

let args = parsedWithEqual();
let dbName = args.name;

if (!dbName) {
  console.error('Please input DB name with "name=db_name".');
  return;
}

(async function() {
  let result = await db.query(`drop database ${dbName};`);
  console.log(result instanceof Error ? result : `Drop DB "${dbName}" success.`);
})();