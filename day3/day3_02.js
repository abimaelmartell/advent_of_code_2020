fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const lines = content
  .split("\n")
  .filter((line) => line !== "");

const positions = [
  {
    RIGHT: 1,
    DOWN: 1,
  },
  {
    RIGHT: 3,
    DOWN: 1,
  },
  {
    RIGHT: 5,
    DOWN: 1,
  },
  {
    RIGHT: 7,
    DOWN: 1,
  },
  {
    RIGHT: 1,
    DOWN: 2,
  },
];

let results = [];

for (position in positions) {
  let numberOfThrees = 0;
  let currentPosition = positions[position].RIGHT;

  for (let i = 0; i < lines.length; i++) {
    if (i !== 0) {
      let currentRelativePosition = currentPosition;

      while ((lines[i].length - 1) < currentRelativePosition) {
        currentRelativePosition -= lines[i].length;
      }

      if (lines[i][currentRelativePosition] === '#') {
        numberOfThrees++;
      }

      currentPosition += positions[position].RIGHT;
    }

    if (positions[position].DOWN > 1) {
      i++;
    }
  }

  results.push(numberOfThrees);
}

console.log(results.reduce((prev, cur) => prev * cur));
