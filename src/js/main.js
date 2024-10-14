"use strict";
let topicQuiz = document.getElementById('topic-question');
let currentQuestion = document.getElementById('current-question');
let wholeQuestion = document.getElementById('whole-question');
let question1Inp = document.getElementById('question1');
let question2Inp = document.getElementById('question2');
let question3Inp = document.getElementById('question3');
let question4Inp = document.getElementById('question4');
let radios = document.getElementsByName('question');
let question1Caption = document.getElementById('question1-caption');
let question2Caption = document.getElementById('question2-caption');
let question3Caption = document.getElementById('question3-caption');
let question4Caption = document.getElementById('question4-caption');
let quizBtn = document.getElementsByTagName('button')[0];
let liList = document.getElementsByTagName('li');
let questionSec = document.getElementById('questionSec');
let statusSec = document.getElementById('statusSec');
let correctAnswerDiv = document.getElementById('correctAnswerDiv');
let endMessage = document.getElementById('endMessage');
let current = 0;
let correctAnswer = 0;
for (const li in Array.from(liList)) {
    liList[li].onclick = function () {
        quizBtn.disabled = false;
        let foo = document.getElementById(`question${Number(li) + 1}`);
        foo.checked = true;
        quizBtn.disabled = false;
    };
}
const questions = [
    { topic: 'What is the fucking capital of France?', choices: ['Berlin', 'Madrid', 'Paris', 'Rome', 3] },
    { topic: 'Which fucking planet is known as the Red Planet?', choices: ['Earth', 'Mars', 'Jupiter', 'Venus', 2] },
    { topic: 'Who wrote the play "Romeo and Juliet"?', choices: ['Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Jane Austen', 3] },
    { topic: "What is the largest mammal in the fucking world?", choices: ['African Elephant', 'Blue Whale', 'Giraffe', 'Great White Shark', 2] },
    { topic: "Which element has the fucking chemical symbol 'O'?", choices: ['Gold', 'Oxygen', 'Silver', 'Hydrogen', 2] },
];
const levels = ['fucking stupid', 'ignorant', 'foolish', 'average', 'smart', 'genius'];
wholeQuestion.innerHTML = "/" + questions.length.toString();
function loadQuiz() {
    topicQuiz.innerHTML = questions[current].topic;
    question1Caption.innerHTML = questions[current].choices[0];
    question2Caption.innerHTML = questions[current].choices[1];
    question3Caption.innerHTML = questions[current].choices[2];
    question4Caption.innerHTML = questions[current].choices[3];
    question1Inp.checked = false;
    question2Inp.checked = false;
    question3Inp.checked = false;
    question4Inp.checked = false;
    currentQuestion.innerHTML = String(current + 1);
}
function checkAnswer() {
    let alternativeChecking = 1;
    let userAnswer;
    radios.forEach(radio => {
        // console.log((radio as HTMLInputElement).checked);
        if (radio.checked) {
            userAnswer = alternativeChecking;
        }
        alternativeChecking++;
        // (radio as HTMLInputElement).checked ? userAnswer=alternativeChecking : null
    });
    userAnswer === questions[current].choices[4] ? correctAnswer++ : null;
}
function next() {
    // console.log(current);
    checkAnswer();
    if (++current < questions.length) {
        loadQuiz();
        if (current + 1 === questions.length) {
            quizBtn.innerHTML = 'Done';
        }
        quizBtn.disabled = true;
    }
    else {
        correctAnswerDiv.innerHTML = `${correctAnswer}/5`;
        Boolean(correctAnswer) ? null : correctAnswerDiv.style.background = 'transparent';
        correctAnswerDiv.style.width = `${Boolean(correctAnswer * 20) ? correctAnswer * 20 : 100}%`;
        endMessage.innerHTML = `You are ${levels[correctAnswer]}`;
        questionSec.style.transform = 'scale(0)';
        setTimeout(() => {
            questionSec.style.display = 'none';
            statusSec.style.display = 'flex';
            statusSec.style.opacity = '100%';
        }, 215);
    }
}
quizBtn.addEventListener('click', next);
loadQuiz();
