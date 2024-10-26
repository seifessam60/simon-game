const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern=[];
let userClickedPattern=[];
let started = false;
let level = 0;
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
$('.btn').on('click',function(){
    const userChosenColour =this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if (userClickedPattern.length===gamePattern.length) {         
            setTimeout(()=>{
                nextSequence();
                userClickedPattern=[];
            },1000)
        }
    }else{
        
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)
        $('#level-title').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    const randomNumber=Math.floor(Math.random()*4);
    const randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(()=>{
        $(`#${currentColour}`).removeClass("pressed");
    },100)
}




