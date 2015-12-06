'use strict';
const fs = require('fs');
const fileName = process.argv[2];

let strings = fs.readFileSync(fileName, 'utf8').split('\n');
let goodCount = 0;

for (let string of strings) {
  let good = string.match(/(\w\w)\w*\1/g) !== null;
  good = good && string.match(/(\w)\w\1/g) !== null;
  goodCount += good ? 1 : 0;
}

console.log(goodCount);
