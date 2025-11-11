//block
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head | start
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//food point 
var FoodPX;
var FoodPY;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");//utiliser pour dessiner sur le board

    placeFood();
    update();

}

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    context.fillRect(snakeY, snakeX, blockSize, blockSize);

    context.fillStyle = "red";
    context.fillRect(FoodPY, FoodPX, blockSize, blockSize);


}

function placeFood() {
    FoodPX = Math.floor((Math.random() * cols) * blockSize);
    FoodPY = Math.floor((Math.random() * rows) * blockSize);
}