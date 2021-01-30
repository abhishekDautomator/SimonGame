/*jshint esversion: 6 */

var colorSet = ["red", "green", "blue", "yellow"];
var userClickedColors = [];
var colorSequence = [];
var counter = 0;
var flag = false;
var player=prompt("Please enter your name");
var name=(player==="" || player===null)?"Player":player;
$('h1').children('span').text(name);
$(".center-btn").click(function() {
  if (!flag) {
    $(".level-title").text("Level " + counter);
    $(".level-title").css({ fontSize: 24});
    nextSequence();
    flag = true;
  }
});
$(".box").click(function() {
  var userChosenColor = $(this).attr("class").split(" ")[0];
  userClickedColors.push(userChosenColor);
  playButtonSound(userChosenColor);
  checkAnswer(userClickedColors.length-1);
});
function checkAnswer(currentLevel){
  if (colorSequence[currentLevel] === userClickedColors[currentLevel]) {
    if (colorSequence.length === userClickedColors.length){
        nextSequence();
      userClickedColors=[];
    }
  } else {
    (new Audio("sounds/wrong.mp3")).play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");},200);
    $(".level-title").css({ fontSize: 16});
    $(".level-title").text(name+" you have conquered "+((counter===0)?counter:(counter-1))+" levels, press center button to restart");
    $(".score").css("visibility","visible");
    $(".score").text("Game over, your score: "+((counter===0)?counter:(counter-1)));
    $(".center-btn").click(function() {
      location.reload();
    });
  }
}
function startOver(){
  counter=0;
  colorSequence = [];
  userClickedColors = [];
  $(".level-title").text("Level " + counter);
  nextSequence();
  flag = true;
}
function playButtonSound(button){
  (new Audio("sounds/"+button+".mp3")).play();
}
function nextSequence() {
  counter++;
  $(".level-title").text("Level " + counter);
  var randomNum = Math.floor(Math.random() * 4);
  var chosenColor = colorSet[randomNum];
  colorSequence.push(chosenColor);
  flickerColor(colorSequence);
}
function flickerColor(arrayColor) {
  arrayColor.forEach((color,index)=>{
    setTimeout(()=>{
      flicker(color);
    },(index+1)*600);
  });
  // $(".box").filter("." + arrayColor[i]).fadeOut(500).fadeIn(500);
}
function flicker(item){
  $(".box").filter("." + item).addClass("hidden");
  setTimeout(function(){
      $(".box").filter("." +item).removeClass("hidden");
  },500);
}
