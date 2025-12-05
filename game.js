import {questionsObj} from "./questions.js";
export {main};

const $ = (id) => document.getElementById(id);

function getQuestions() {
    let random_questions = [];
    let questions = JSON.parse(JSON.stringify(questionsObj));
    for (let i = 0; i < 10; i++) {
        const keys = Object.keys(questions);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const question = questions[randomKey];
        random_questions.push(question);
        delete questions[randomKey];
    }

    return random_questions;
};
let correctAnswers = 0;

let timerInterval = null;
let counter = 0;
function askQuestion(question) {
    counter++;
    if (parseInt(counter) > 10) {
        displayResults();
        return;
    }
    console.log(counter)

    const questionTitle = $("question-title");
    questionTitle.textContent = question.Question;

    let answers = question.Incorrect;
    const randomIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(randomIndex, 0, question.Correct)
    console.log(answers);

    let buttons = $("answer-buttons").children;
    for (let i = 0; i <= 3; i++) {
        buttons[i].textContent = answers[i];
    };

    clearInterval(timerInterval);
    const displayTimer = $("timer");
    displayTimer.textContent = "Timer: 15";
    let timeCount = 15;
    timerInterval = setInterval(() => {
        timeCount--;
        displayTimer.textContent = `Timer: ${timeCount}`
        if (timeCount <= 0) {
            clearInterval(timerInterval);
            let selectedButton;
            for (let i = 0; i <= 3; i++) {
                buttons[i].classList.remove("selected");
                selectedButton = buttons[i];
            };
            checkAnswer(selectedButton, question);
            askQuestion()
        }
    }, 1000)
};

const start_form = $("start-form");
const question_form = $("question-form");
const answers_form = $("answers-form");
function displayResults() {
    question_form.classList.add("hidden");
    answers_form.classList.remove("hidden");
    start_form.classList.remove("hidden");
    $("answers").textContent = "Correct Answers: " + correctAnswers + "/10";
    console.log("Display Results")
    console.log(correctAnswers + "/10");
    counter = 0;
    correctAnswers = 0;
};

function checkAnswer(selected, question) {
    if (selected.textContent == question.Correct) {
        correctAnswers++;
    };
};

let random_questions;
let question;
function main() {
    answers_form.classList.add("hidden");
    random_questions = getQuestions();
    question = random_questions.pop(0)
    console.log(question)
    askQuestion(question);
};

question_form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let buttons = $("answer-buttons").children;
    let selected = false;
    let selectedButton;
    for (let i = 0; i <= 3; i++) {
        if (buttons[i].classList.contains("selected")) {
            selected = true;
            selectedButton = buttons[i];
        };
    };
    if (selected) {
        selectedButton.classList.remove("selected");
        console.log(question)
        checkAnswer(selectedButton, question);
        question = random_questions.pop(0)
        askQuestion(question);
    };
});