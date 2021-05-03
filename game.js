const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function wait(i) {
    return new Promise(resolve =>
        setTimeout(() => {
            i++;
            resolve(i)
        }, 500));
}


// generate random number 
async function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    let i = 0;
    while (i < gamePattern.length) {
        $(`#${gamePattern[i]}`).fadeIn(100).fadeOut(100).fadeIn(100);
        playAudio(gamePattern[i])
        i = await wait(i);
    }
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success')
        if (userClickedPattern.length === gamePattern.length) {
            console.log('finished')
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        playAudio('wrong');
        $('body').addClass('game-over');
        setTimeout(() => $('body').removeClass("game-over"), 200);
        $("h1").text("Game Over, Press Enter to Restart");
        startOver();
    }
}

function playAudio(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(color) {
    $(`.btn[id = ${color}]`).addClass("pressed");
    setTimeout(() => $(`.btn[id = ${color}]`).removeClass("pressed"), 100);
}

$(document).on("keydown", (e) => {
    if (e.key === "Enter") {
        if (!started) {
            started = true;
            nextSequence();
            $("h1").text(`Level ${level}`);
        }
    }
})

function startOver() {
    gamePattern = gamePattern.filter(cell => cell.length === 0);
    level = 0;
    started = false;
}

$(".btn").click((e) => {
    let userChosenColour = e.target.id
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})