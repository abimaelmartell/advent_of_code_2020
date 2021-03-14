fs = require('fs');

const content = fs.readFileSync('./input.txt', 'utf8');
const numbers = content
    .split("\n")
    .map((line) => parseInt(line))
    .filter((el) => !isNaN(el));

const mem = {};

const SUM = 2020;

for (let i = 0; i < numbers.length; i++) {
    const missing = SUM - numbers[i];

    if (mem[missing]) {
        console.log(missing * numbers[i]);
    } else {
        mem[numbers[i]] = i;
    }
}

