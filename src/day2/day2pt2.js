'use strict';
const fs = require('fs');

function findRibbonAmount (tuple) {
  let
    a1 = 2 * (tuple[0] + tuple[1]),
    a2 = 2 * (tuple[0] + tuple[2]),
    a3 = 2 * (tuple[1] + tuple[2]);
  return  tuple.reduce((x, y) => x * y, 1) + Math.min(a1, a2, a3);
}

const fileName = process.argv[2];
const fileData = fs.readFileSync(fileName, 'utf8');
const lines = fileData.split(/\n/);
const areas = lines.map(line => {
  const tuple = line.split('x').map(num => parseInt(num));
  return findRibbonAmount(tuple);
});

console.log(areas.slice(0, areas.length - 1).reduce((x, y) => x + y, 0));
