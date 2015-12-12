'use strict';
const fs = require('fs');
const fileName = process.argv[2];

let strings = fs.readFileSync(fileName, 'utf8').split('\n');
let goodCount = 0;

for (let string of strings) {
  let good = true;
  let firstMatch = string.match(/[aeiou]/g);
  good = firstMatch && firstMatch.length >= 3;
  good = good && string.match(/(\w)\1+/g) != null;
  good = good && string.match(/(ab)|(cd)|(pq)|(xy)/g) === null;
  goodCount += good ? 1 : 0;
}

console.log(goodCount);
