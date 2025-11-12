var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

// Food
var FoodPX;
var FoodPY;

// Score
var Score = 0;

// Contrôle du jeu
var gameInterval; // pour setInterval
var gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // Le jeu ne démarre que quand on clique sur Start
    document.getElementById("Start_button").addEventListener("click", startGame);

}

function startGame() {
    // Réinitialise tout au cas où on relance une partie
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 1; // Le serpent part directement à droite
    velocityY = 0;
    snakeBody = [];
    Score = 0;
    document.getElementById("score-zone").innerText = "Score : " + Score;
    gameOver = false;

    // Empêche plusieurs intervalles en même temps
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Dessine la nourriture
    context.fillStyle = "red";
    context.fillRect(FoodPX, FoodPY, blockSize, blockSize);

    // Si le serpent mange la nourriture
    if (snakeX == FoodPX && snakeY == FoodPY) {
        Score += 10;
        document.getElementById("score-zone").innerText = "Score : " + Score;
        snakeBody.push([FoodPX, FoodPY]);
        placeFood();
    }

    // Déplace le corps du serpent
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Déplace la tête
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Vérifie les collisions (bords)
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        endGame();
        return;
    }

    // Vérifie les collisions avec le corps
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            endGame();
            return;
        }
    }

    // Dessine le serpent
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    alert("Game Over! Score final : " + Score);
}

function placeFood() {
    do {
        FoodPX = Math.floor(Math.random() * cols) * blockSize;
        FoodPY = Math.floor(Math.random() * rows) * blockSize;
    } while (snakeBody.some(segment => segment[0] == FoodPX && segment[1] == FoodPY));
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
