
var questions = [
  "What was Lenny's first single?",
  "Who did Lenny go to high-school with?",
  "What was Lenny's first movie appearance?",
  "What is Lenny's highest-charting single to date?",
  "How many Grammy awards has Lenny won in a row?",
  "Lenny started his own company. What does it do?",
  "What famous jazzman sung happy birthday to Lenny?",
  "What diet did Lenny adopt recently?",
  "Which city is Lenny's favorite?",
  "What does Lenny enjoy doing casually?"
]

var answers = [
  "Let Love Rule",
  "Nicolas Cage",
  "Hunger Games",
  "It Ain't Over 'Til It's Over",
  "Four",
  "Interior design",
  "Duke Ellington",
  "Raw veggies",
  "Paris",
  "Photography"
]

var questionOptions = {
  "one": ["Let Love Rule", "Mo Bamba", "Billie Jean", "Macarena"],
  "two": ["Donald Trump", "Nicolas Cage", "Pope Francis", "Samuel L. Jackson"],
  "three": ["Star Wars", "The Avengers", "Hunger Games", "Toy Story"],
  "four": ["American Woman", "Again", "Fly Away", "It Ain't Over 'Til It's Over"],
  "five": ["Two", "Five", "Four", "Seven"],
  "six": ["Dating apps", "Organic juices", "Interior design", "Computer chips"],
  "seven": ["Miles Davis", "Chet Baker", "Thelonious Monk", "Duke Ellington"],
  "eight": ["Paleo", "Steak-all-day", "Raw veggies", "Gluten-free"],
  "nine": ["New York", "Buenos Aires", "Amsterdam", "Paris"],
  "ten": ["Photography", "Skateboarding", "Cooking", "Swimming"]
}

var finalPhrases = ["You are a Lenny-sseur", "You need more Kravitz in your life", "Lenny would be dissapointed"]

var keys = Object.keys(questionOptions);
var currentQuestion = 0;
var currentOptions;
var userAnswer;
var correctAnswers = 0;
var wrongAnswers = 0;
var timeRunning = false;
var gameStarted = false;
var timeLeft = 10;
var myTime;

$(".results").hide();
$(".time-left").html(timeLeft);

function countDown() {
  timeLeft--;
  $(".time-left").html(timeLeft);
  if (timeLeft === 0) {
    stop();
    alert("Time's Up!");
    $(".answer").off("click");
  }
}

function stop() {
  clearInterval(myTime);
  timeRunning = false;
}

$(".answer").on("click", function () {
  stop();
  userAnswer = $(this).attr("value");
  if (userAnswer === answers[currentQuestion - 1]) {
    correctAnswers++
    $(".right-wrong").html("<h3> Correct! </h3>");
  }

  else {
    wrongAnswers++
    $(".right-wrong").html("<h4> Wrong! Correct answer: " + answers[currentQuestion - 1] + "</h4>");
  }
  console.log(correctAnswers + "-" + wrongAnswers);
});

$(".next").on("click", function () {
  stop();
  $(".next").text("Next question");

  if (gameStarted = false){
    myTime = setInterval(countDown, 1000);
    timeRunning = true;
    gameStarted = true;
  }

  if (gameStarted = true && currentQuestion < 11) {
    currentQuestion++;
    timeLeft = 10;
    $(".time-left").html(timeLeft);
    myTime = setInterval(countDown, 1000);
    timeRunning = true;

    $(".current-question").html("<h4>" + questions[currentQuestion - 1] + "</h4>");
    currentOptions = questionOptions[keys[currentQuestion - 1]];
    $(".a1").html("<h3>a) " + currentOptions[0] + "</h3>");
    $(".a2").html("<h3>b) " + currentOptions[1] + "</h3>");
    $(".a3").html("<h3>c) " + currentOptions[2] + "</h3>");
    $(".a4").html("<h3>d) " + currentOptions[3] + "</h3>");
    $(".a1").attr("value", currentOptions[0]);
    $(".a2").attr("value", currentOptions[1]);
    $(".a3").attr("value", currentOptions[2]);
    $(".a4").attr("value", currentOptions[3]);
    $(".right-wrong").empty();
    console.log(currentQuestion);
  }
  else {
    if (correctAnswers <= 4){
      userPhrase = finalPhrases[2];
    }
    if (correctAnswers >4 && correctAnswers <=8) {
      userPhrase = finalPhrases[1];
    }

    if (correctAnswers >8) {
      userPhrase = finalPhrases[0];
    }
    $(".right-wrong").empty();
    $(".current-question").html("<h3> You finished the quiz! </h3>");
    $(".final").html("<h3> You got " + correctAnswers + "/10 questions right.</h3> <h3>" + userPhrase + ".</h3>")
    $(".current-options").replaceWith($(".results").html());
    $(".crdstyle").addClass("final");
  }
});


