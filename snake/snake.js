// Set up the canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set up the speed slider and its value display
var speedSlider = document.getElementById("speed");
var speedValue = document.getElementById("speed-value");

// Set up the start and pause buttons
var startButton = document.getElementById("start-button");
var pauseButton = document.getElementById("pause-button");

// Set up the snake and the food
var snake = {
    x: 0,
    y: 0,
    cells: [],
    maxCells: 4,
    speed: parseInt(speedSlider.value),
    dx: 10,
    dy: 0
};
var food = {
    x: getRandomCoord(),
    y: getRandomCoord()
};

// Get a random coordinate that is a multiple of 10 within the canvas
function getRandomCoord() {
    return Math.floor(Math.random() * (canvas.width / 10)) * 10;
}

// Update the position of the snake
function updateSnake() {
    // Move the snake by adding a new head and removing the tail
    snake.cells.unshift({ x: snake.x, y: snake.y });
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Check if the snake has collided with the walls or itself
    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        gameOver();
    }
    for (var i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
            gameOver();
            break;
        }
    }

    // Check if the snake has eaten the food
    if (snake.x === food.x && snake.y === food.y) {
        // Increase the length of the snake
        snake.maxCells++;

        // Generate new coordinates for the food
        food.x = getRandomCoord();
        food.y = getRandomCoord();
    }
}

// Draw the snake and the food
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = "green";
    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, 10, 10);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Update the speed value display
function updateSpeedValue() {
    speedValue.innerHTML = speedSlider.value;
}

// Start the game
function startGame() {
    // Hide the game over message
    document.getElementById("game-over").style.display = "none";

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //reset the speed
    snake.speed = parseInt(speedSlider.value);

    // Reset the snake
    snake.x = 0;
    snake.y = 0;
    snake.cells = [];
    snake.maxCells = 4;
    snake.speed = parseInt(speedSlider.value);
    snake.dx = 10;
    snake.dy = 0;

    // Generate new coordinates for the food
    food.x = getRandomCoord();
    food.y = getRandomCoord();

    // Start the game loop
    gameLoop = setInterval(function () {
        updateSnake();
        draw();
    }, 1000 / snake.speed);
}

// Pause the game
function pauseGame() {
    clearInterval(gameLoop);
}

// End the game
function gameOver() {
    clearInterval(gameLoop);
    document.getElementById("game-over").style.display = "block";
}

// Add event listeners to the speed slider and the start and pause buttons
speedSlider.addEventListener("input", updateSpeedValue);
startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);

//add event listeners to the arrow keys
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && snake.dx === 0) {
        snake.dx = -10;
        snake.dy = 0;
    }
    else if (e.key === "ArrowUp" && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -10;
    }
    else if (e.key === "ArrowRight" && snake.dx === 0) {
        snake.dx = 10;
        snake.dy = 0;
    }
    else if (e.key === "ArrowDown" && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = 10;
    }
});