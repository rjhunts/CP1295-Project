import {main} from "./game.js";
import {questionsObj} from "./questions.js";

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
    const start_form = $("start-form");
    const question_form = $("question-form");
    const create_questions = $("create-question");
    const create_questions_form = $("create-question-form");
    const container = $("answer-buttons");
    const buttons = container.querySelectorAll("button");
    const selected = $("selected-answer");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {

            // remove selected class from all buttons
            buttons.forEach(btn => btn.classList.remove("selected"));

            // add selected class to the clicked one
            button.classList.add("selected");

            // set answer value to button's data-value
            selected.value = button.textContent;
        });
    });

    start_form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        evt.target.classList.add("hidden");
        question_form.classList.remove("hidden");
        main(questionsObj);
    });

    create_questions.addEventListener("submit", (evt) => {
        evt.preventDefault();
        create_questions.classList.add("hidden");
        create_questions_form.classList.remove("hidden");
        start_form.classList.add("hidden");
        $("answers-form").classList.add("hidden");
    });

    create_questions_form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        //console.log("clicked")
        let last;
        for (let key in questionsObj) {
            last = parseInt(key);
        }
        questionsObj[last+1] = {
            "Question": $("question-input").value,
            "Correct": $("correct-answer-input").value,
            "Incorrect": [
                $("incorrect-1-input").value,
                $("incorrect-2-input").value,
                $("incorrect-3-input").value,
            ]
        }
        //console.log(questionsObj)
        create_questions_form.classList.add("hidden");
        create_questions.classList.remove("hidden");
        start_form.classList.remove("hidden");
    });

    $("cancel").addEventListener("click", () => {
        create_questions_form.classList.add("hidden");
        create_questions.classList.remove("hidden");
        start_form.classList.remove("hidden");
    })
});