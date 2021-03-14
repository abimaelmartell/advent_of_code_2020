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
    let letters = 0;

    const {
        password, min, max, letter,
    } = entries[i];

    for (let j = 0; j < password.length; j++) {
        if (password[j] === letter) {
            letters++;
        }
    }

    if (letters >= min && letters <= max) {
        validPasswords++;
    }
}

console.log(validPasswords)
