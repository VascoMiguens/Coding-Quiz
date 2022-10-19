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

  //hide the start button after starting the quiz
  startBtn.classList.add("hide");
  //show the question
  questionContainerElement.classList.remove("hide");
  displayQuestion();
}
//Display the questions whit a loop
function displayQuestion() {
  var question = questions[currentQuestion];
  questionEl.textContent = question.title;

  //Clear the previous buttons
  choicesEl.innerHTML = "";

  //iterate every choice in the questions object
  for (var i = 0; i < question.choices.length; i++) {
    //create a button for each choice
    var button = document.createElement("button");
    //add the class btn
    button.classList.add("btn");
    //populate each button create with a choice
    button.textContent = question.choices[i];
    //when the user clicks on a choice call function questionCheck
    button.onclick = questionCheck;
    //append the button to the parent element
    choicesEl.appendChild(button);
  }
}

function questionCheck() {
  //increase the question index
  currentQuestion++;

  //Check if the index of the current question is equal to the total number of questions
  if (currentQuestion === questions.length) {
    //if it is end the game
    endGame();
  } else {
    //if not display next question
    displayQuestion();
  }
}

function endGame() {
  //hide the questions
  questionContainerElement.classList.add("hide");
  //display the start button
  startBtn.classList.remove("hide");
}

startBtn.addEventListener("click", startGame);
