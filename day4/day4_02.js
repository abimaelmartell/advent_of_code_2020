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

const validatePassportKey = (key, value) => {
  const year = parseInt(value);

  switch (key) {  
    case 'byr': // (Birth Year) - four digits; at least 1920 and at most 2002.
      return year >= 1920 && year <= 2002;
    case 'iyr': // (Issue Year) - four digits; at least 2010 and at most 2020.
      return year >= 2010 && year <= 2020;
    case 'eyr': // (Expiration Year) - four digits; at least 2020 and at most 2030.
      return year >= 2020 && year <= 2030;
    case 'hgt': // (Height) - a number followed by either cm or in:
      // If cm, the number must be at least 150 and at most 193.
      // If in, the number must be at least 59 and at most 76.
      const match = value.match(/(\d+)(cm|in)/);
      const num = parseInt(match?.[1]);
      const unit = match?.[2];

      if (unit === 'cm') return num >= 150 && num <= 192;
      if (unit === 'in') return num >= 59 && num <= 76;

      break;
    case 'hcl': // (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      return /^#[0-9a-f]{6}$/.test(value);
    case 'ecl': // (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    case 'pid': // (Passport ID) - a nine-digit number, including leading zeroes.
      return /(\d){6}/.test(value);
    case 'cid': // (Country ID) - ignored, missing or not.  
      break;
    default:
      break;
  }

  return true;
}

for (passport in passports) {
  const iterator = passports[passport].matchAll(/(\w+)\:((#)?\w+)/g);
  const matches = [ ...iterator ];

  const data = matches.reduce(
    (prev, cur) => ({
      ...prev,
      [cur?.[1]]: cur?.[2]
    }),
    {}
  );

  const keys = Object.keys(data);

  if (
    (keys.length >= REQUIRED_KEYS.length) &&
    (REQUIRED_KEYS.every((k) => keys.includes(k) && validatePassportKey(k, data[k])))
  ) {
    validPassports++;
  }
}

console.log(validPassports);
