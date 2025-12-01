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
}

function game(question) {
    const answers = question.Incorrect;
    const randomIndex = Math.floor(Math.random() * 4);
    console.log(randomIndex);

    answers.splice(randomIndex, 0, question.Correct);
    console.log(answers)
    
    const question_title = $("question-title");
    question_title.textContent = question.Question;

    const buttons = $("answer-buttons");

    let i = 0;
    for (let button of buttons.children) {
        button.classList.remove("selected")
        button.textContent = answers[i];
        i++;
    }

    let timer = 15
    $("timer").textContent = `Timer: ${timer}`;

    const intervalId = setInterval(() => {
        timer--
        console.log(timer);
        $("timer").textContent = `Timer: ${timer}`;
        if (timer <= 0) {
            clearInterval(intervalId);
        }
    }, 1000);
} 

function main() {

    let questions = getQuestions();
    let count = 1
    console.log(count)
    
    let question = questions.pop(0);
    game(question);

    const intervalId = setInterval(() => {
        count++
        console.log(count)
        question = questions.pop(0);
        game(question);
        if (count >= 15) {
            clearInterval(intervalId);
        }
    }, 16000);
};