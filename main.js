import {main} from "./game.js";

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
    const start_form = $("start-form");
    const question_form = $("question-form");
    const container = $("answer-buttons");
    const buttons = container.querySelectorAll("button");
    const answer = $("selected-answer");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {

            // remove selected class from all buttons
            buttons.forEach(btn => btn.classList.remove("selected"));

            // add selected class to the clicked one
            button.classList.add("selected");

            // set answer value to button's data-value
            answer.value = button.dataset.value;
        });
    });

    start_form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        evt.target.classList.add("hidden");
        question_form.classList.remove("hidden");
        main();
    });

    question_form.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
});