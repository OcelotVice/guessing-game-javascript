
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let maxAttempts = 5;
let secretNumber;

function randomInRange(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let ran =  Math.floor(Math.random() * (max - min + 1) + min);
    return ran;
}

function checkguess(num) {
    if (num < secretNumber) {
        console.log("Too Low");
        return false;
    }
    if (num === secretNumber) {
        console.log("Correct");
        return true;
    }
    if (num > secretNumber) {
        console.log("Too High");
        return false;
    }
}

function askGuess() {
    rl.question("Enter a guess...",(guess) => {
         if (checkguess(Number(guess))) {
            rl.close();
            return;
         }
         if (maxReached()) {
            console.log("Max attempts reached");
            rl.close();
            return;
         }
         askGuess();
    })
}

function maxReached() {
    if (maxAttempts === 0) return true;
    maxAttempts--;
    return false;
}

function askRange() {
    let min;
    let max;
    rl.question("Enter a min number...", (answerMin) => {
        min = Number(answerMin);
        rl.question("Enter a max number...", (answerMax) => {
            max = Number(answerMax);
            console.log(`I'm thinking of a number between ${min} and ${max}`);
            secretNumber = randomInRange(min,max);
            console.log(secretNumber);
            askGuess();
        })
    })
}

askRange();
