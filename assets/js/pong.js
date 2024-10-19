const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Configuración inicial
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
const paddleSpeed = 8; // Velocidad de la paleta del jugador

// Movimiento del jugador
let upPressed = false;
let downPressed = false;

// Dibujar elementos
function draw() {
    // Fondo
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Paleta del jugador
    context.fillStyle = 'white';
    context.fillRect(20, playerY, paddleWidth, paddleHeight);

    // Paleta del oponente (Comp)
    context.fillRect(canvas.width - 30, computerY, paddleWidth, paddleHeight);

    // Pelota
    context.fillRect(ballX, ballY, ballSize, ballSize);
}

// Controlar el movimiento del jugador
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    }
});

// Actualizar la lógica del juego
function update() {
    // Movimiento del jugador
    if (upPressed && playerY > 0) {
        playerY -= paddleSpeed;
    } else if (downPressed && playerY < canvas.height - paddleHeight) {
        playerY += paddleSpeed;
    }

    // Movimiento automático de la computadora
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += paddleSpeed / 1.5; // La computadora sigue la pelota
    } else if (computerY + paddleHeight / 2 > ballY) {
        computerY -= paddleSpeed / 1.5; // La computadora sigue la pelota
    }

    // Movimiento de la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote de la pelota en la parte superior e inferior
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Rebote en las paletas
    if (ballX <= 30 && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballSize >= canvas.width - 30 && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Reiniciar la pelota si sale de los límites
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2 - ballSize / 2;
        ballY = canvas.height / 2 - ballSize / 2;
    }
}

let isGameRunning = true;

function gameLoop() {
    if (!isGameRunning) {
        return;  // Detener el bucle si la condición es falsa
    }

    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Llamada para detener el juego cuando se desee
function stopGame() {
    isGameRunning = false;
}

