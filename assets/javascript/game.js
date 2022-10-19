var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start-btn");
var questionContainerElement = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("answer-buttons");

var time = 0;
var currentQuestion;

//function to initialize the game
function startGame() {
  //Start at the first question
  currentQuestion = 0;

  startBtn.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  displayQuestion();
}

function displayQuestion() {
  var question = questions[currentQuestion];
  questionEl.textContent = question.title;

  for (var i = 0; i < question.choices.length; i++) {
    var button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = question.choices[i];
    button.onclick = questionCheck;
    choicesEl.appendChild(button);
  }
}

startBtn.addEventListener("click", startGame);
