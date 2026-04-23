const questions = [
    {
        question: "Which one is vowel?",
        answers: [
            { "text": "a", "correct": true },
            { "text": "h", "correct": false },
            { "text": "j", "correct": false },
            { "text": "z", "correct": false }
        ]
    },
    {
        question: "How many vowels are there in alphabate?",
        answers: [
            { "text": "21", "correct": false },
            { "text": "29", "correct": false },
            { "text": "26", "correct": false },
            { "text": "5", "correct": true }
        ]
    },
    {
        question: "Which one is consonent?",
        answers: [
            { "text": "a", "correct": false },
            { "text": "o", "correct": false },
            { "text": "e", "correct": false },
            { "text": "z", "correct": true }
        ]
    }
];

const questionContent = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn")
let questionCurrentIndex = 0;
let score = 0;

function startQuiz() {
    questionCurrentIndex = 0;
    score = 0;
    // nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[questionCurrentIndex];
    let questionNo = questionCurrentIndex + 1;
    questionContent.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
         button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState() {
    // nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionContent.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    questionCurrentIndex++;
    if(questionCurrentIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(questionCurrentIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();