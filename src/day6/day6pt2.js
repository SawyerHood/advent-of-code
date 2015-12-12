'use strict';
const
  fs = require('fs'),
  fileName = process.argv[2],
  GRID_SIZE = 1000,
  ACTION = 1,
  X1 = 2,
  Y1 = 3,
  X2 = 4,
  Y2 = 5,
  DEF_INST = {action: 'nothing', x1: 0, y1: 0, x2: 0, y2: 0};

function initGrid() {
  let grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    let row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}

function countLightsOn( grid ) {
  let count = 0;
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      count += grid[i][j];
    }
  }
  return count;
}

function runInst(grid, conf, index) {
  for (let i = conf.x1; i <= conf.x2; i++) {
    for (let j = conf.y1; j <= conf.y2; j++) {
      switch(conf.action) {
        case 'turn off':
          grid[i][j] -= 1;
          break;
        case 'turn on':
          grid[i][j] += 1;
          break;
        case 'toggle':
          grid[i][j] += 2;
          break;
      }
      grid[i][j] = grid[i][j] < 0 ? 0 : grid[i][j];
    }
  }
}

function parseInst(str) {
  let match = str.match(/(turn off|turn on|toggle) (\d*),(\d*) through (\d*),(\d*)/);
  return match ?
  {
    action: match[ACTION],
    x1: +match[X1],
    y1: +match[Y1],
    x2: +match[X2],
    y2: +match[Y2]
  }
  : DEF_INST;
}

const instructions = fs.readFileSync(fileName, 'utf8').split('\n').map(parseInst);
const grid = initGrid();
instructions.slice(0, instructions.length - 1).forEach((inst, index) => runInst(grid, inst, index));
console.log(countLightsOn(grid));
