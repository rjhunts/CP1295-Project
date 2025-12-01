import {questions} from "./questions.js";
export {game};

function game() {

    let random_questions = [];

    for (let i = 0; i < 10; i++) {
        const keys = Object.keys(questions);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const question = questions[randomKey];
        random_questions.push(question);
        delete questions[randomKey];
    }

    console.log(random_questions);
};