var colorSet = ["red", "green", "blue", "yellow"];

var userClickedColors = [];

var colorSequence = [];

var counter = 0;

var flag = false;

$(".center-btn").click(function() {
  if (!flag) {
    $(".level-title").text("Level " + counter);
    nextSequence();
    flag = true;
  }
});


$(".box").click(function() {
  var userChosenColor = $(this).attr("class").split(" ")[0];
  userClickedColors.push(userChosenColor);
  flickerColor(userChosenColor);
  playButtonSound(userChosenColor);
  checkAnswer(userClickedColors.length-1);
});


function checkAnswer(currentLevel){
  if (colorSequence[currentLevel] === userClickedColors[currentLevel]) {
    if (colorSequence.length === userClickedColors.length){
      setTimeout(function (){
        nextSequence()
      },1000);
    }
  } else {
    (new Audio("sounds/wrong.mp3")).play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")},200);
    $(".level-title").text("Game Over, Press center button to Restart");
  }
}

function startOver(){
  counter=0;
  colorSequence = [];
  userClickedColors = [];
  flag = false;
}

function playButtonSound(button){
  (new Audio("sounds/"+button+".mp3")).play();
}

function nextSequence() {
  counter++;
  $(".level-title").text("Level " + counter);
  var randomNum = randNum = Math.floor(Math.random() * 4);
  var chosenColor = colorSet[randomNum];
  colorSequence.push(chosenColor);
  for(i in colorSequence){
    console.log("random color selected "+colorSet[i]);
  }
  flickerColor(colorSequence);
}

function flickerColor(arrayColor) {
  for (var i = 0; i < arrayColor.length; i++) {
    setTimeout(function (){
      $(".box").filter("." + arrayColor[i]).fadeOut(250).fadeIn(250);
    },1000);
  }
}
