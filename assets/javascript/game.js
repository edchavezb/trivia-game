
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
  "Precious",
  "It Ain't Over 'Til It's Over",
  "Four",
  "Interior design",
  "Duke Ellington",
  "Raw veggies",
  "Paris",
  "Photography"
]

var questionOptions = {
  "one": ["Let Love Rule", "Mo Bamba", "Macarena", "Mr. Cab Driver"],
  "two": ["Donald Trump", "Nicolas Cage", "Pope Francis", "Samuel L. Jackson"],
  "three": ["The Avengers", "Precious", "Hunger Games", "Toy Story"],
  "four": ["American Woman", "Again", "Fly Away", "It Ain't Over 'Til It's Over"],
  "five": ["Two", "Five", "Four", "Seven"],
  "six": ["Dating apps", "Organic juices", "Interior design", "Computer chips"],
  "seven": ["Miles Davis", "Chet Baker", "Thelonious Monk", "Duke Ellington"],
  "eight": ["Paleo", "Steak-all-day", "Raw veggies", "Gluten-free"],
  "nine": ["New York", "Buenos Aires", "Amsterdam", "Paris"],
  "ten": ["Photography", "Skateboarding", "Cooking", "Swimming"]
}

var finalPhrases = ["Lenny would be dissapointed", "You need more Kravitz in your life", "You make Lenny smile", "Congratulations! You are a Lenny-sseur"]

var keys = Object.keys(questionOptions);
var currentQuestion = 0;
var currentOptions;
var userAnswer;
var correctAnswers = 0;
var timeRunning = false;
var gameStarted = false;
var timeLeft = 10;
var myTime;
var lennyGif = $("<img>");

$(".questions-display").hide();
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

function answerChoice(){
  stop();
  userAnswer = $(this).attr("value");
  $(".answer").off("click");
  if (userAnswer === answers[currentQuestion - 1]) {
    correctAnswers++
    $(".right-wrong").html("<h3> Correct! </h3>");
  }
  else {
    $(".right-wrong").html("<h4> Wrong! Correct answer: " + answers[currentQuestion - 1] + "</h4>");
  }
  console.log(correctAnswers + " correct answers");
}

$(".next").on("click", function () {
  stop();
  $(".answer").off("click");
  $(".answer").on("click", answerChoice);

  if (currentQuestion === 0){
    $(".next").text("Next question");
    $(".game-intro").hide();
    $(".questions-display").show();
  }

  if (currentQuestion < 10) {
    currentQuestion++;
    timeLeft = 10;
    $(".time-left").html(timeLeft);
    myTime = setInterval(countDown, 1000);
    timeRunning = true;

    $(".current-question").html("<h4>" + questions[currentQuestion - 1] + "</h4>");
    currentOptions = questionOptions[keys[currentQuestion - 1]];
    $(".a1").html("<h3>a) " + currentOptions[0] + "</h3>").attr("value", currentOptions[0]);
    $(".a2").html("<h3>b) " + currentOptions[1] + "</h3>").attr("value", currentOptions[1]);
    $(".a3").html("<h3>c) " + currentOptions[2] + "</h3>").attr("value", currentOptions[2]);
    $(".a4").html("<h3>d) " + currentOptions[3] + "</h3>").attr("value", currentOptions[3]);
    $(".right-wrong").empty();
    console.log(currentQuestion);
  }

  else {
    if (correctAnswers <= 3){
      userPhrase = finalPhrases[0];
      lennyGif.attr("src", "assets/images/1.gif").addClass("gif-size");
    }
    if (correctAnswers >3 && correctAnswers <=6) {
      userPhrase = finalPhrases[1];
      lennyGif.attr("src", "assets/images/2.gif").addClass("gif-size");
    }
    if (correctAnswers >6 && correctAnswers <=8) {
      userPhrase = finalPhrases[2];
      lennyGif.attr("src", "assets/images/3.gif").addClass("gif-size");
    }
    if (correctAnswers >8) {
      userPhrase = finalPhrases[3];
      lennyGif.attr("src", "assets/images/4.gif").addClass("gif-size");
    }
    $(".right-wrong").empty();
    $(".current-question").html("<h3> You finished the quiz! </h3>");
    $(".final").html("<h4> You got " + correctAnswers + "/10 questions right.</h4> <h4>" + userPhrase + ".</h4>")
    $(".final").append(lennyGif)
    $(".questions-display").replaceWith($(".results").html());
    $(".crdstyle").addClass("final");
    $(".next").off("click")
  }
});




