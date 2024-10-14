let topicQuiz = document.getElementById('topic-question') as HTMLHeadElement
let currentQuestion = document.getElementById('current-question') as HTMLSpanElement
let wholeQuestion = document.getElementById('whole-question') as HTMLParagraphElement

let question1Inp = document.getElementById('question1') as HTMLInputElement
let question2Inp = document.getElementById('question2') as HTMLInputElement
let question3Inp = document.getElementById('question3') as HTMLInputElement
let question4Inp = document.getElementById('question4') as HTMLInputElement
let radios = document.getElementsByName('question') 

let question1Caption = document.getElementById('question1-caption') as HTMLLabelElement
let question2Caption = document.getElementById('question2-caption') as HTMLLabelElement
let question3Caption = document.getElementById('question3-caption') as HTMLLabelElement
let question4Caption = document.getElementById('question4-caption') as HTMLLabelElement

let quizBtn = document.getElementsByTagName('button')[0]
let liList = document.getElementsByTagName('li')

let questionSec = document.getElementById('questionSec') as HTMLTableSectionElement
let statusSec = document.getElementById('statusSec') as HTMLTableSectionElement
let correctAnswerDiv = document.getElementById('correctAnswerDiv') as HTMLDivElement
let endMessage= document.getElementById('endMessage') as HTMLParagraphElement

let current:number = 0;
let correctAnswer:number = 0;

for (const li in Array.from(liList)) {
    liList[li].onclick = function() {
        quizBtn.disabled = false
        let foo =  document.getElementById(`question${Number(li) +1}`) as HTMLInputElement;
        foo.checked = true
        quizBtn.disabled= false
    }
}
// ------------------------------------------------------------------------

interface Questions{
    topic : string,
    choices : [string ,string , string , string ,answerIndex:number]
} 

type IQLeveling=  string[]

const questions : Questions[] = [
    {topic : 'What is the fucking capital of France?',choices : ['Berlin','Madrid','Paris','Rome',3]},
    {topic : 'Which fucking planet is known as the Red Planet?',choices : ['Earth','Mars','Jupiter','Venus',2]},
    {topic : 'Who wrote the play "Romeo and Juliet"?',choices : ['Charles Dickens','Mark Twain','William Shakespeare','Jane Austen',3]},
    {topic : "What is the largest mammal in the fucking world?",choices : ['African Elephant','Blue Whale','Giraffe','Great White Shark',2]},
    {topic : "Which element has the fucking chemical symbol 'O'?",choices : ['Gold','Oxygen','Silver','Hydrogen',2]},
]

const levels:IQLeveling = ['fucking stupid','ignorant','foolish','average','smart','genius']
wholeQuestion.innerHTML  ="/"+ questions.length.toString()



function loadQuiz() {
    topicQuiz.innerHTML = questions[current].topic
    question1Caption.innerHTML = questions[current].choices[0]
    question2Caption.innerHTML = questions[current].choices[1]
    question3Caption.innerHTML = questions[current].choices[2]
    question4Caption.innerHTML = questions[current].choices[3]

    question1Inp.checked = false
    question2Inp.checked = false
    question3Inp.checked = false
    question4Inp.checked = false

    currentQuestion.innerHTML = String(current+1) 
    
}

function checkAnswer() {
    let alternativeChecking:number =1;
    let userAnswer:unknown;
    radios.forEach(radio=>{
        // console.log((radio as HTMLInputElement).checked);
        if ((radio as HTMLInputElement).checked) {
            userAnswer=alternativeChecking
        }
        alternativeChecking++
        // (radio as HTMLInputElement).checked ? userAnswer=alternativeChecking : null
    })
    userAnswer === questions[current].choices[4] ? correctAnswer++ : null;
}

function next() :void{
    // console.log(current);
    checkAnswer()
    if (++current < questions.length ) {
        loadQuiz() 
        if (current+1 === questions.length  ) {
            quizBtn.innerHTML = 'Done'
        }
        quizBtn.disabled = true
    }else{
        correctAnswerDiv.innerHTML = `${correctAnswer}/5`
        Boolean(correctAnswer)? null : correctAnswerDiv.style.background = 'transparent';
        correctAnswerDiv.style.width = `${Boolean(correctAnswer*20) ?correctAnswer*20: 100 }%`;
        endMessage.innerHTML = `You are ${levels[correctAnswer]}`
        questionSec.style.transform = 'scale(0)';
        setTimeout(() => {
            questionSec.style.display = 'none';
            statusSec.style.display = 'flex';
            statusSec.style.opacity = '100%'
        }, 215);

        
    }
    
}

quizBtn.addEventListener('click'  ,next)

loadQuiz()  