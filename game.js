import {questions} from "./questions.js";
export {main};

const $ = (id) => document.getElementById(id);

function getQuestions() {
    let random_questions = [];

    for (let i = 0; i < 10; i++) {
        const keys = Object.keys(questions);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const question = questions[randomKey];
        random_questions.push(question);
        delete questions[randomKey];
    }

    return random_questions;
};

let timerInterval = null;
let counter = 0;
function askQuestion() {
    counter++;
    if (parseInt(counter) > 10) {
        return;
    }
    console.log(counter)
    
    clearInterval(timerInterval);
    const displayTimer = $("timer");
    displayTimer.textContent = "Timer: 15";
    let timeCount = 15;
    timerInterval = setInterval(() => {
        timeCount--;
        displayTimer.textContent = `Timer: ${timeCount}`
        if (timeCount <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000)
};

function main() {

    const random_questions = getQuestions();
    const question_form = $("question-form");
    const answers = [];

    askQuestion();

    question_form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        askQuestion();
    })
};