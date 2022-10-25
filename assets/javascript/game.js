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

var timerCont = document.getElementById("timer-container");
var timerEl = document.getElementById("timer");

//buttons
var startBtn = document.getElementById("start-btn");
var sumbitBtn = document.getElementById("submit");
var scoreBtn = document.getElementById("score-btn");
var rulesBtn = document.getElementById("rules-btn");
var backBtn = document.getElementById("back-btn");

var questionContainerElement = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("answer-buttons");
var result = document.getElementById("result");
var finalScore = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var scoreEL = document.getElementById("scoreboard-container");
var scoreboard = document.getElementById("scoreboard");
var rules = document.getElementById("rules");

var controls = document.getElementById("controls");
var correct = new Audio("assets/sounds/correct.wav");
var incorrect = new Audio("assets/sounds/incorrect.wav");
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var questionTime;
var score = 0;
var currentQuestion;
var time;

//function to initialize the game
function startGame() {
  //Start at the first question
  currentQuestion = 0;
  //hide the start button after starting the quiz
  startBtn.style.display = "none";
  //show the timer when the quiz starts
  timerCont.style.display = "block";
  //hide the results
  result.style.display = "none";
  //hide the scoreboard
  scoreEL.style.display = "none";
  //hide the start button
  startBtn.style.display = "none";
  //hide the timer
  questionContainerElement.style.display = "flex";
  //flex the controls buttons in a row
  controls.style.cssText = "display: flex; flex-direction:row";
  //set the score to 0
  score = 0;
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
    //flex buttons in a column according to screen size
    realWidth = window.screen.width * window.devicePixelRatio;
    if (realWidth <= 992) {
      controls.style.cssText = "flex-direction: column";
    }
  }
}
//check user answer and if its the last question
function questionCheck(e) {
  //if clicked button equals to the current question correct answer
  if (e.currentTarget.textContent === questions[currentQuestion].answer) {
    //increase the score by 10
    score += 10;
    //play correct sound
    correct.play();
  } else {
    //if not decrease the timer by 10 seconds
    questionTime -= 10;
    //play incorrect sound
    incorrect.play();
  }
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
//End the game and display final score
function endGame() {
  //clear the timer
  clearInterval(time);
  //hide the timer after quiz ends
  timerCont.style.display = "none";
  //hide the questions
  questionContainerElement.style.display = "none";
  //show the result container
  result.style.display = "flex";
  //add time remaining to the correct questions
  score = score + questionTime;
  //display the final score, add the correct answers to the remaining time*/
  finalScore.textContent = score;
  //use csssText to flex the controls element making it apper on the UI in a row
  controls.style.cssText = "display: flex; flex-direction:row";
  //display the start button
  startBtn.style.display = "block";
  //display scoreboard button
  scoreBtn.style.display = "none";
  //flex buttons in a column according to screen size
  realWidth = window.screen.width * window.devicePixelRatio;
  if (realWidth <= 992) {
    controls.style.cssText = "flex-direction: column";
  }
}
//Start timer when quiz starts
function startTimer() {
  //Time available to play the game
  questionTime = questions.length * 15;
  //start tiemr
  time = setInterval(function () {
    //displayed timer equals to questionTime
    timerEl.textContent = questionTime;
    //decrease time by 1 second
    questionTime--;
    //if the time is less or equal to 0
    if (questionTime <= 0) {
      //clear the time
      clearInterval(time);
      //set the displayed time to 0
      timerEl.textContent = "0";
      //end the game
      endGame();
    }
  }, 1000);
}
//save results to the local storage
function saveResults(e) {
  //prevent default action
  e.preventDefault();

  //save the initials in a variable
  var initials = initialsEl.value;
  //if the initials variable is not empty save the score to the local storage
  if (initials !== "") {
    //Create object white username initials and final score
    var newScore = {
      score: score,
      initials: initials,
    };
    //Push new user score to the highscores array
    highscores.push(newScore);

    //sort the scores higher to lower
    highscores.sort((a, b) => b.score - a.score);

    //allow only the top 5 scores with splice
    highscores.splice(5);

    //store the highscores array into the local storage as a string
    localStorage.setItem("highscores", JSON.stringify(highscores));
    //erase input field after submission
    initialsEl.value = "";
    displayScoreBoard();
  }
}

function displayScoreBoard() {
  //hide the final score display
  result.style.display = "none";
  //hide the questions
  questionContainerElement.style.display = "none";
  //Display the start button
  startBtn.style.display = "block";
  //iterate each item saved in local storage and display it
  scoreboard.innerHTML = highscores
    .map((score) => {
      return `<span>${score.initials} - ${score.score}</span>`;
    })
    //remove comma from object
    .join("");

  //hide scoreboard button
  scoreBtn.style.display = "none";
  //display the scoreboard
  scoreEL.style.display = "flex";
  //hide timer container
  timerCont.style.display = "none";
  //clear interval
  clearInterval(time);

  //flex the controls in a row
  controls.style.cssText = "display: flex; flex-direction:row";
  //flex buttons in a column according to screen size
  realWidth = window.screen.width * window.devicePixelRatio;
  if (realWidth <= 700) {
    controls.style.cssText = "flex-direction: column";
  }
}

function displayRules() {
  //hide the scoreboard if accessed throught the scoreboard page
  scoreEL.style.display = "none";
  //hide controls element
  controls.style.display = "none";
  //display the rules element
  rules.style.display = "flex";
  //hide final reult element
  result.style.display = "none";
  //hide questions element if users accesses it while playing
  questionContainerElement.style.display = "none";
  //hide timer container
  timerCont.style.display = "none";
}

startBtn.addEventListener("click", startGame);
sumbitBtn.addEventListener("click", saveResults);
scoreBtn.addEventListener("click", displayScoreBoard);
rulesBtn.addEventListener("click", displayRules);
backBtn.addEventListener("click", function () {
  //refresh page and display initial page
  window.location.reload();
});
