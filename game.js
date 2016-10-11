var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var score;

var ballRadius;
var ballX;
var ballY;
var ballSpeedX;
var ballSpeedY;

var platformWidth;
var platformHeight;
var platformX;
var platformY;
var platformSpeedX;

var readyToBounce;
var reset;
var rightIsPressed;
var leftIsPressed;

var multiplierX;
var multiplierY;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatform();
    drawBall();
}

function drawPlatform() {
    context.beginPath();
    context.rect(platformX, platformY, platformWidth, platformHeight);
    context.fillStyle = "#5f8dcd";
    context.fill();
    context.closePath();
}

function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
    context.fillStyle = "#5f8dcd";
    context.fill();
    context.closePath();
}

function updatePlatform() {
    if (rightIsPressed && platformX + platformWidth < canvas.width) {
        platformX += platformSpeedX;
    }
    if (leftIsPressed && platformX > 0) {
        platformX -= platformSpeedX;
    }
}

function updateBall() {
    if (ballY > canvas.height) {
        gameOver();
    } else {
        if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
            multiplierX = -multiplierX;
        }
        if (ballY + ballRadius > canvas.height - platformHeight && ballX + ballRadius > platformX && ballX - ballRadius < platformX + platformWidth && readyToBounce) {
            if (reset) {
                if (ballX == platformX + platformWidth / 2) {
                    if (!Math.random() > 0.5) {
                        multiplierX = -multiplierX;
                    }
                } else if (ballX < platformX + platformWidth / 2) {
                    multiplierX = -multiplierX;
                }
                ballSpeedX = 2;
                reset = false;
            } else {
                if ((ballX < platformX + platformWidth / 2 && multiplierX > 0) || (ballX > platformX + platformWidth / 2 && multiplierX < 0)) {
                    multiplierX = -multiplierX;
                }
                //if (ballX < platformX + platformWidth / 2) {
                //    var offset = (platformX + platformWidth / 2 - ballX);
                //} else if (ballx > platformX + platformWidth / 2) {
                //    var offset = (platformX + platformWidth - ballX);
                //}
                //ballSpeedX += offset;
            }
            if (score % 5 == 0) {
                ballSpeedY++;
            }
            readyToBounce = false;
            score++;
            multiplierY = -multiplierY;
        } else if (ballY - ballRadius < 0) {
            multiplierY = -multiplierY;
            readyToBounce = true;
        }

        ballX += ballSpeedX * multiplierX;
        ballY += ballSpeedY * multiplierY;
    }
}

function gameOver() {
    alert("GAME OVER\nYour Score : " + score);
    newGame();
}

function newGame() {
    score = 0;
    ballRadius = 20;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 0;
    ballSpeedY = 2;
    platformWidth = 150;
    platformHeight = 20;
    platformX = canvas.width / 2 - platformWidth / 2;
    platformY = canvas.height - platformHeight;
    platformSpeedX = 5;
    reset = true;
    readyToBounce = true;
    rightIsPressed = false;
    leftIsPressed = false;
    multiplierX = 1;
    multiplierY = 1;
}

function updateScore() {
    document.getElementById("score").innerHTML = score;
}

function update() {
    draw();

    updateBall();
    updatePlatform();
    updateScore();
}

function keyPressedEvent(e) {
    if (e.keyCode == 37) {
        leftIsPressed = true;
    } else if (e.keyCode == 39) {
        rightIsPressed = true;
    }
}

function keyReleasedEvent(e) {
    if (e.keyCode == 37) {
        leftIsPressed = false;
    } else if (e.keyCode == 39) {
        rightIsPressed = false;
    }
}

document.addEventListener("keydown", keyPressedEvent, false);
document.addEventListener("keyup", keyReleasedEvent, false);

newGame();
setInterval(update, 10);
