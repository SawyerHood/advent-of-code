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

const moveTuple = Array.prototype.reduce.call(fileData, (res, val, index) => {
  res[index % 2].push(val);
  return res;
}, [[],[]]);

function addMovesToSet(beenSet, moves) {
  let currPos = [0, 0];
  moves.forEach(command => {
    const move = lookup.get(command);
    if (move) {
      currPos = [currPos[0] + move[0], currPos[1] + move[1]];
      beenSet.add(currPos[0] + ' ' + currPos[1]);
    }
  });
}

const moveSet = new Set(['0 0']);
addMovesToSet(moveSet, moveTuple[0]);
addMovesToSet(moveSet, moveTuple[1]);

console.log(moveSet.size);
