fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const lines = content
  .split("\n")
  .filter((line) => line !== "");

let numberOfThrees = 0;

let currentPosition = 3;

for (let i = 1; i < lines.length; i++) {
  let currentRelativePosition = currentPosition;

  while ((lines[i].length - 1) < currentRelativePosition) {
    currentRelativePosition -= lines[i].length;
  }

  if (lines[i][currentRelativePosition] === '#') {
    numberOfThrees++;
  }

  currentPosition += 3;
}

console.log(numberOfThrees);
