questions = [
    {
        question: "Which of these products will help even out your skin texture?",
        answers: [
            { text: "Bronzer", correct: false },
            { text: "Primer", correct: true },
            { text: "Illuminating face powder", correct: false },
            { text: "Concealer", correct: false },
        ]
    },
    {
        question: "How often should you replace your mascara?",
        answers: [
            { text: "Every 3 months", correct: true },
            { text: "Every month", correct: false },
            { text: "Every 6 months", correct: false },
            { text: "Every 12 months", correct: false },
        ]
    },
    {
        question: "What is banana powder used for?",
        answers: [
            { text: "Concealing flaws", correct: false },
            { text: "Creating shadows", correct: false },
            { text: "Setting makeup/concealer", correct: true },
            { text: "Adding Shimmer", correct: false },
        ]
    },
    {
        question: "What is the best way to deal with clumpy eyelashes?",
        answers: [
            { text: "Use a tissue to remove the excess", correct: false },
            { text: "Use a brow comb to remove excess mascara", correct: true },
            { text: "Remove all eye makeup and start over", correct: false },
            { text: "Use cotton wool to gently swab the excess", correct: false },
        ]
    },
    {
        question: "How often should you replace foam blending sponges?",
        answers: [
            { text: "Once a year", correct: false },
            { text: "Once every 6 months", correct: false },
            { text: "Every 4 - 6 weeks", correct: false },
            { text: "Every 2 - 3 months", correct: true },
        ]
    },
    {
        question: "What lipstick shades work best for discolored teeth?",
        answers: [
            { text: "Blue-based reds/hot pinks", correct: true },
            { text: "Neutral shades", correct: false },
            { text: "Coral reds and oranges", correct: false },
            { text: "Deep burgundy and wine shades", correct: false },
        ]
    },
    {
        question: "How often should you be washing your makeup brushes?",
        answers: [
            { text: "Every month", correct: false },
            { text: "Every week", correct: true },
            { text: "Every 6 weeks", correct: false },
            { text: "Every 3 months", correct: false },
        ]
    },
    {
        question: "What does bronzer do?",
        answers: [
            { text: "Makes you look tanned", correct: false },
            { text: "Creates shadows", correct: false },
            { text: "Gives you a healthy glow", correct: true },
            { text: "Conceals imperfections", correct: false },
        ]
    },
    {
        question: "What should you use to remove colorstay lipstick?",
        answers: [
            { text: "Plain soap", correct: false },
            { text: "Makeup remover or coconut oil", correct: true },
            { text: "Vinegar", correct: false },
            { text: "Rub with cotton wool and water", correct: false },
        ]
    },
    {
        question: "How often should you replace lipstick?",
        answers: [
            { text: "Every 2 months", correct: false },
            { text: "Every 6 months", correct: false },
            { text: "Every year", correct: false },
            { text: "Every 2 years", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-button")
const nextButton = document.getElementById("next-button")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} correct !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();