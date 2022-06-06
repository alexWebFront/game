let canvas = document.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");
// document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// координаты мяча
let x = canvas.width / 2;
let y = canvas.height / 2;

//скорость мяча
let dx = 5;
let dy = -5;

// радиус мяча
let ballRadius = 50;

// ракетка
let paddleHeight = 60;
let paddleWidth = 200;
let paddleX = (canvas.width - paddleWidth) / 2;

//управление
let rightPressed = false;
let leftPressed = false;

// счёт
let score = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dx += 1;
            dy += 1;
            dy = -dy;
            score += 1;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function scoreFunc() {
    ctx.fillStyle = "#00F";
    ctx.strokeStyle = "#F00";
    ctx.font = "italic 30pt Arial";
    ctx.fillText("Ваш рекорд: " + score, 20, 50);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    scoreFunc();
    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 10;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 10;
    }
}

let interval = setInterval(draw, 10);