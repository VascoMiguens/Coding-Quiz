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
var sumbitBtn = document.getElementById("submit");
var questionContainerElement = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("answer-buttons");
var currentScore = document.getElementById("currentScore");
var result = document.getElementById("result");
var finalScore = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var MAX_HIGH_SCORES = 5;

var questionTime;
var score = 0;
var currentQuestion;
var time;

//function to initialize the game
function startGame() {
  //Start at the first question
  currentQuestion = 0;
  //hide the start button after starting the quiz
  startBtn.classList.add("hide");
  //hide the results container
  result.classList.add("hide");
  //show the timer when the quiz starts
  timerEl.classList.remove("hide");
  //show the question
  questionContainerElement.classList.remove("hide");
  //set the score to 0
  score = 0;
  //show the core
  currentScore.textContent = score;
  //call the function to display the question
  displayQuestion();
  //call the timer function
  startTimer(questionTime);
}
//Display the questions whit a loop
function displayQuestion() {
  //get the current question
  var question = questions[currentQuestion];
  //set the question
  questionEl.textContent = question.title;

  //Clear the previous buttons
  choicesEl.textContent = "";

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

function questionCheck(e) {
  //if clicked button equals to the current question correct answer
  if (e.currentTarget.textContent === questions[currentQuestion].answer) {
    //increase the score by 10
    score += 10;
  } else {
    //if not decrease the timeer by 10 seconds
    questionTime -= 10;
  }
  //set the text content with the current score
  currentScore.textContent = score;
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
  //clear the timer
  clearInterval(time);
  //Erase time displayed after the game is over
  timerEl.textContent = "";
  //hide the questions
  questionContainerElement.classList.add("hide");
  //hide the result container
  result.classList.remove("hide");
  //display the final score
  finalScore.textContent = score;
  //display the start button
  startBtn.classList.remove("hide");
}

function startTimer() {
  //Time available to play the game
  questionTime = questions.length * 15;
  //start tiemr
  time = setInterval(function () {
    //displayed timer equals to questionTime
    timerEl.textContent = questionTime;
    //decrease time by 1 second
    questionTime--;
    //if the time is less than 0
    if (questionTime < 0) {
      //clear the time
      clearInterval(time);
      //set the displayed time to 0
      timerEl.textContent = "0";
      //end the game
      endGame();
    }
  }, 1000);
}

function saveResults(e) {
  //prevent default
  e.preventDefault();
  //save the initials in a variable
  var initials = initialsEl.value;
  //if the initials variable is not empty save the score to the local storage
  if (initials !== "") {
    //Create object white username initials and final score
    var newScore = {
      score: score + questionTime,
      initials: initials,
    };
    //Push new user score to the highscores array
    highscores.push(newScore);

    //sort the scores higher to lower
    highscores.sort((a, b) => b.score - a.score);
    //allow only the top 5 scores with splice
    highscores.splice(5);

    //pass the highscores array into the local storage as a stringD
    localStorage.setItem("highScores", JSON.stringify(highscores));
  }
}

startBtn.addEventListener("click", startGame);
sumbitBtn.addEventListener("click", saveResults);
