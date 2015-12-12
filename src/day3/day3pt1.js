'use strict';
const fs = require('fs');

const lookup = new Map([
  ['>', [1, 0]],
  ['^', [0, 1]],
  ['<', [-1, 0]],
  ['v', [0, -1]],
]);

const fileName = process.argv[2];
const fileData = fs.readFileSync(fileName, 'utf8');

let currPos = [0, 0];
const beenSet = new Set(['0 0']);

Array.prototype.forEach.call(fileData, (command) => {
  const move = lookup.get(command);
  if (move) {
    currPos = [currPos[0] + move[0], currPos[1] + move[1]];
    beenSet.add(currPos[0] + ' ' + currPos[1]);
  }
});
console.log(beenSet.size);
