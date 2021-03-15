fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const passports = content
  .split("\n\n")
  .filter((line) => line !== "");

const REQUIRED_KEYS = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
  'hgt', // (Height)
  'hcl', // (Hair Color)
  'ecl', // (Eye Color)
  'pid', // (Passport ID)
  // 'cid', // (Country ID)
];

let validPassports = 0;

for (passport in passports) {
  const iterator = passports[passport].matchAll(/(\w+)\:((#)?\w+)/g);
  const data = [ ...iterator ];

  const keys = data.map((k) => k?.[1]);

  if (
    (keys.length >= REQUIRED_KEYS.length) &&
    (REQUIRED_KEYS.every((k) => keys.includes(k)))
  ) {
    validPassports++;
  }
}

console.log(validPassports);
