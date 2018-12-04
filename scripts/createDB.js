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
  let result = await db.query(`create database ${dbName} default character set utf8mb4 collate utf8mb4_unicode_ci;`);
  console.log(result instanceof Error ? result : `Create DB "${dbName}" success.`);
})();