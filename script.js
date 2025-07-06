const questionPool = [
  // Single answer questions (15 total)
  { type: "single", question: "Capital of Germany?", options: ["Berlin", "Paris", "Madrid", "Rome"], correctAnswer: "Berlin" },
  { type: "single", question: "Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "Pacific" },
  { type: "single", question: "Chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correctAnswer: "Au" },
  { type: "single", question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
  { type: "single", question: "Largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], correctAnswer: "Jupiter" },
  { type: "single", question: "Author of 'Romeo and Juliet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], correctAnswer: "William Shakespeare" },
  { type: "single", question: "Smallest country in the world?", options: ["Monaco", "Maldives", "Vatican City", "San Marino"], correctAnswer: "Vatican City" },
  { type: "single", question: "Longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], correctAnswer: "Nile" },
  { type: "single", question: "First element in the periodic table?", options: ["Oxygen", "Hydrogen", "Helium", "Carbon"], correctAnswer: "Hydrogen" },
  { type: "single", question: "Currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], correctAnswer: "Yen" },
  { type: "single", question: "Year when World War II ended?", options: ["1943", "1945", "1947", "1950"], correctAnswer: "1945" },
  { type: "single", question: "Which language has the most native speakers?", options: ["English", "Hindi", "Spanish", "Mandarin"], correctAnswer: "Mandarin" },
  { type: "single", question: "Inventor of the light bulb?", options: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "Albert Einstein"], correctAnswer: "Thomas Edison" },
  { type: "single", question: "Largest desert in the world?", options: ["Sahara", "Arabian", "Gobi", "Antarctic"], correctAnswer: "Antarctic" },
  { type: "single", question: "Main component of the Sun?", options: ["Liquid lava", "Hydrogen gas", "Oxygen gas", "Carbon dioxide"], correctAnswer: "Hydrogen gas" },

  // Multiple answer questions (10 total)
  { type: "multiple", question: "Select even numbers", options: ["1", "2", "3", "4"], correctAnswer: ["2", "4"] },
  { type: "multiple", question: "Select prime numbers", options: ["2", "4", "5", "6"], correctAnswer: ["2", "5"] },
  { type: "multiple", question: "Which are programming languages?", options: ["HTML", "Python", "CSS", "Java"], correctAnswer: ["Python", "Java"] },
  { type: "multiple", question: "Select US states", options: ["Texas", "Toronto", "California", "Vancouver"], correctAnswer: ["Texas", "California"] },
  { type: "multiple", question: "Which are fruits?", options: ["Carrot", "Apple", "Potato", "Banana"], correctAnswer: ["Apple", "Banana"] },
  { type: "multiple", question: "Select renewable energy sources", options: ["Coal", "Solar", "Natural Gas", "Wind"], correctAnswer: ["Solar", "Wind"] },
  { type: "multiple", question: "Which are social media platforms?", options: ["Twitter", "Netflix", "Instagram", "Spotify"], correctAnswer: ["Twitter", "Instagram"] },
  { type: "multiple", question: "Select mammals", options: ["Dolphin", "Shark", "Whale", "Eagle"], correctAnswer: ["Dolphin", "Whale"] },
  { type: "multiple", question: "Which are search engines?", options: ["Google", "Facebook", "Bing", "WhatsApp"], correctAnswer: ["Google", "Bing"] },
  { type: "multiple", question: "Select primary colors", options: ["Red", "Green", "Purple", "Blue"], correctAnswer: ["Red", "Blue"] },

  // Fill in the blank questions (5 total)
  { type: "fill", question: "JS stands for ________", correctAnswer: "JavaScript" },
  { type: "fill", question: "HTML stands for ________", correctAnswer: "HyperText Markup Language" },
  { type: "fill", question: "The capital of France is ________", correctAnswer: "Paris" },
  { type: "fill", question: "The chemical formula for water is ________", correctAnswer: "H2O" },
  { type: "fill", question: "The process by which plants make food is called ________", correctAnswer: "photosynthesis" }
];
// Pick 5 random unique questions from the pool
function getRandomQuestions() {
  return [...questionPool].sort(() => Math.random() - 0.5).slice(0, 5);
}

let currentQuestions = getRandomQuestions(); 
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements (same as before)
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// Render current question
function renderQuestion() {
  const current = currentQuestions[currentQuestionIndex]; // ✅ Use currentQuestions
  questionEl.textContent = current.question;
  optionsEl.innerHTML = '';

  questionHandlers[current.type].render(current);
}

const questionHandlers = {
  single: {
    render: (question) => {
      question.options.forEach(opt => {
        const label = document.createElement('label');
        label.style.display = "block"; // ✅ Ensures each option appears on a new line
        label.innerHTML = `<input type="radio" name="option" value="${opt}" /> ${opt}`;
        optionsEl.appendChild(label);
      });
    },
    check: (question) => {
      const selected = document.querySelector('input[name="option"]:checked');
      return selected?.value === question.correctAnswer;
    },
    canProceed: () => document.querySelector('input[name="option"]:checked') !== null
  },

  multiple: {
    render: (question) => {
      question.options.forEach(opt => {
        const label = document.createElement('label');
        label.style.display = "block"; // ✅ Ensures each checkbox appears on a new line
        label.innerHTML = `<input type="checkbox" value="${opt}" /> ${opt}`;
        optionsEl.appendChild(label);
      });
    },
    check: (question) => {
      const selected = [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .map(i => i.value)
        .sort()
        .toString();
      return selected === question.correctAnswer.sort().toString();
    },
    canProceed: () => document.querySelectorAll('input[type="checkbox"]:checked').length > 0
  },

  fill: {
    render: () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'fillInput';
      input.style.width = "100%"; // Optional: make it stretch full width
      optionsEl.appendChild(input);
    },
    check: (question) => {
      const input = document.getElementById('fillInput');
      return input?.value.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    },
    canProceed: () => {
      const input = document.getElementById('fillInput');
      return input?.value.trim() !== '';
    }
  }
};


// Check answer
function checkAnswer() {
  const current = currentQuestions[currentQuestionIndex]; // ✅ Use currentQuestions
  if (questionHandlers[current.type].check(current)) {
    score++;
  }
}

// Next question
function nextQuestion() {
  checkAnswer();
  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuestions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

// Show results
function showResults() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  scoreDisplay.textContent = `${score}`; // ✅ Show correct score
}

// Restart
function restartQuiz() {
  currentQuestions = getRandomQuestions(); // ✅ Refresh random questions
  currentQuestionIndex = 0;
  score = 0;
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  renderQuestion();
}

// Event listeners (same logic)
nextBtn.addEventListener("click", () => {
  const current = currentQuestions[currentQuestionIndex];
  if (questionHandlers[current.type].canProceed()) {
    nextQuestion();
  } else {
    alert("Please select an answer before proceeding.");
  }
});

restartBtn.addEventListener("click", restartQuiz);

// Enter key handler
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const current = currentQuestions[currentQuestionIndex];
    if (questionHandlers[current.type].canProceed()) {
      nextQuestion();
    }
  }
});

// Start the quiz
restartQuiz();
