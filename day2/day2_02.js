fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const entries = content
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => ({
        min: parseInt(line.match(/(\d+)\-/)?.[1]),
        max: parseInt(line.match(/\-(\d+)/)?.[1]),
        letter: line.match(/([a-z])\:/)?.[1],
        password: line.match(/\: (\w+)/)?.[1],
    }))

let validPasswords = 0;

for (let i = 0; i < entries.length; i++) {
    const {
        password, min, max, letter,
    } = entries[i];

    const firstIndexMatches = password[min - 1] === letter;
    const secondIndexMatches = password[max - 1] === letter;

    if (
        (firstIndexMatches && !secondIndexMatches) ||
        (!firstIndexMatches && secondIndexMatches))
    {
        validPasswords++;
    }
}

console.log(validPasswords)
