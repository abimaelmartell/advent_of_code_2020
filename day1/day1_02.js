fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const numbers = content
    .split("\n")
    .map((line) => parseInt(line))
    .filter((el) => !isNaN(el));

const SUM = 2020;

numbers.sort((a, b) => a - b);

for (let i = 0; i < numbers.length - 2; i++) {
    let leftPointer = i + 1;
    let rightPointer = numbers.length - 1;

    while (leftPointer < rightPointer) {
        const currentSum = numbers[i] + numbers[leftPointer] + numbers[rightPointer];

        if (currentSum > SUM) {
            rightPointer--;
        } else  if (currentSum < SUM) {
            leftPointer++;
        } else {
            console.log(numbers[i] * numbers[leftPointer] * numbers[rightPointer])
            return;
        }
    }
}
