const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let playerScore = 0;
let computerScore = 0;
let ballSpeedX = 5;
let ballSpeedY = 3;
let computerSpeed = 4;
let isGameRunning = false;

// Configuración inicial
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let computerY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;

// Variables para controlar el movimiento del jugador
let upPressed = false;
let downPressed = false;

// Actualizar marcador
function updateScore() {
    document.getElementById('scoreBoard').innerText = `Player: ${playerScore} | Computer: ${computerScore}`;
}

// Dibujar elementos
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo
    const selectedBackground = document.getElementById('backgroundSelect').value;
    context.fillStyle = selectedBackground;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Paleta del jugador
    context.fillStyle = 'white';
    context.fillRect(20, playerY, paddleWidth, paddleHeight);

    // Paleta del oponente
    context.fillRect(canvas.width - 30, computerY, paddleWidth, paddleHeight);

    // Pelota
    context.fillRect(ballX, ballY, ballSize, ballSize);
}

// Actualizar la lógica del juego
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Movimiento de la paleta del jugador
    if (upPressed && playerY > 0) {
        playerY -= 5; // Mover hacia arriba
    }
    if (downPressed && playerY < canvas.height - paddleHeight) {
        playerY += 5; // Mover hacia abajo
    }

    // Rebote de la pelota en la parte superior e inferior
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Rebote en la paleta del jugador
    if (ballX <= 30 && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Rebote en la paleta de la computadora
    if (ballX + ballSize >= canvas.width - 30 && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Movimiento automático de la paleta de la computadora
    if (computerY + paddleHeight / 2 < ballY) {
        computerY += computerSpeed;
    } else if (computerY + paddleHeight / 2 > ballY) {
        computerY -= computerSpeed;
    }

    // Cuando la pelota salga de los límites
    if (ballX < 0) {
        computerScore++;
        updateScore();
        resetBall();
    } else if (ballX > canvas.width) {
        playerScore++;
        updateScore();
        resetBall();
    }
}

// Reiniciar la posición de la pelota
function resetBall() {
    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;
    ballSpeedX = -ballSpeedX;  // Cambiar la dirección de la pelota
}

// Controlar el nivel de dificultad
function setDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
    if (difficulty === 'easy') {
        ballSpeedX = 4;
        ballSpeedY = 2;
        computerSpeed = 3;
    } else if (difficulty === 'medium') {
        ballSpeedX = 6;
        ballSpeedY = 4;
        computerSpeed = 5;
    } else if (difficulty === 'hard') {
        ballSpeedX = 8;
        ballSpeedY = 6;
        computerSpeed = 7;
    }
}

// Bucle del juego
function gameLoop() {
    if (isGameRunning) {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar el juego
function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        setDifficulty();  // Ajustar dificultad al comenzar
        gameLoop();  // Iniciar el bucle del juego
    }
}

// Detener el juego
function stopGame() {
    isGameRunning = false;
}

// Capturar eventos de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    }
});

// Eventos de los botones
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('stopButton').addEventListener('click', stopGame);
