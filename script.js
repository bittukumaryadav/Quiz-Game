const questions = [
    { question: "What is the capital of France?", answers: [{ text: "Berlin", correct: false }, { text: "Madrid", correct: false }, { text: "Paris", correct: true }, { text: "Lisbon", correct: false }] },
    { question: "Which language is used for web development?", answers: [{ text: "Python", correct: false }, { text: "JavaScript", correct: true }, { text: "C++", correct: false }, { text: "Java", correct: false }] },
    { question: "Who developed the theory of relativity?", answers: [{ text: "Isaac Newton", correct: false }, { text: "Albert Einstein", correct: true }, { text: "Galileo Galilei", correct: false }, { text: "Nikola Tesla", correct: false }] },
    { question: "What is the largest planet in our solar system?", answers: [{ text: "Earth", correct: false }, { text: "Mars", correct: false }, { text: "Jupiter", correct: true }, { text: "Venus", correct: false }] },
    { question: "Which element has the chemical symbol 'O'?", answers: [{ text: "Oxygen", correct: true }, { text: "Gold", correct: false }, { text: "Osmium", correct: false }, { text: "Hydrogen", correct: false }] },
    { question: "Which country is famous for sushi?", answers: [{ text: "China", correct: false }, { text: "Korea", correct: false }, { text: "Japan", correct: true }, { text: "Thailand", correct: false }] },
    { question: "What is the speed of light?", answers: [{ text: "300,000 km/s", correct: true }, { text: "150,000 km/s", correct: false }, { text: "500,000 km/s", correct: false }, { text: "100,000 km/s", correct: false }] },
    { question: "Who painted the Mona Lisa?", answers: [{ text: "Vincent van Gogh", correct: false }, { text: "Pablo Picasso", correct: false }, { text: "Leonardo da Vinci", correct: true }, { text: "Michelangelo", correct: false }] },
    { question: "What is the hardest natural substance on Earth?", answers: [{ text: "Gold", correct: false }, { text: "Diamond", correct: true }, { text: "Iron", correct: false }, { text: "Platinum", correct: false }] },
    { question: "Which gas do plants absorb from the atmosphere?", answers: [{ text: "Oxygen", correct: false }, { text: "Carbon Dioxide", correct: true }, { text: "Nitrogen", correct: false }, { text: "Hydrogen", correct: false }] }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    nextButton.innerText = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
    clearInterval(timer);
    timeLeft = 10;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextButton.style.display = "block";
        }
    }, 1000);
}

function selectAnswer(answer, button) {
    clearInterval(timer);
    if (answer.correct) {
        button.classList.add("correct");
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
    } else {
        button.classList.add("wrong");
    }
    
    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerText = `Final Score: ${score} / ${questions.length}`;
        nextButton.innerText = "Play Again";
        nextButton.addEventListener("click", startQuiz);
    }
});

startQuiz();
