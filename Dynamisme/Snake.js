//block
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head | start
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;

//food point 
var FoodPX;
var FoodPY;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");//utiliser pour dessiner sur le board

    placeFood();
    document.AddEvenlisterner("keyup", changeDirection);
    //update();
    setInterval(update, 1000 / 10);

}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    //affichage sur le canvas
    snakeX += velocityX;
    snakeY += velocityY;
    context.fillRect(snakeY, snakeX, blockSize, blockSize);

    context.fillStyle = "red";
    context.fillRect(FoodPY, FoodPX, blockSize, blockSize);


}

function placeFood() {
    FoodPX = Math.floor((Math.random() * cols) * blockSize);
    FoodPY = Math.floor((Math.random() * rows) * blockSize);
}

function changeDirection(e) {
    if (e.code == "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}