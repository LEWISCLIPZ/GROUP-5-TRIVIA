const questions = [
  {
    question: "Which of the following is not a primary color?",
    answers: [
      { text: "green", correct: true },
      { text: "red", correct: false },
      { text: "blue", correct: false },
      { text: "yellow", correct: false },
    ],
  },
  {
    question: "What is the name of the style of clothing that originated in the 1950s and is characterized by its tight-fitting silhouette and emphasis on the hips?",
    answers: [
      { text: "New look", correct: true },
      { text: "Hippie", correct: false },
      { text: "Flapper", correct: false },
      { text: "Mod", correct: false },
    ],
  },
  {
    question: "Which fashion designer is known for their iconic little black dress ?",
    answers: [
      { text: "Coco chanel", correct: true },
      { text: "Yves saint laurent", correct: false },
      { text: "Gianni  Versace", correct: false },
      { text: "Karl Lagerfeld", correct: false },
    ],
  },
  {
    question: "Which fashion accessories is often used to add pop of color or personality to an outfit?",
    answers: [
      { text: "Belt", correct: false },
      { text: "Scarf", correct: true },
      { text: "shoes", correct: false },
      { text: "watch", correct: false },
    ],
  },
  {
    question: "What is the name of style of clothing that is inspired by traditional Japanese culture?",
    answers: [
      { text: "Cosplay", correct: false },
      { text: "Kawaii", correct: true },
      { text: "Goth", correct: false },
      { text: "Street wear", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
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
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct) {
      button.classList.add("correct");
    }
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();
