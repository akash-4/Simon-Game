
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern = [];
var started = false;
var level = 0;
$(document).keypress(function() {
  if (!started) {
  $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
playSound(randomChosenColour);
}
// nextSequence();
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart")
     startOver();


      console.log("wrong");

    }

}
function playSound(key) {


  $("#" + key).fadeIn(100).fadeOut(100).fadeIn(100);
 var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}
function animatePress(key) {
$("#"+key).addClass("pressed");
            setTimeout(function(){$("#"+key).removeClass("pressed"); }, 100);
        }
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
