const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Constants
const birdImg = new Image();
birdImg.src = "assets/bird.png";
const birdX = canvas.width / 2;
let birdY = canvas.height / 2;
let birdDY = 0;
const birdSize = 50;
const pipeWidth = 80;
const pipeSpeed = 3;
const pipeImg = new Image();
pipeImg.src = "assets/pipe.png";

// Variables
let frameCount = 0;
let pipes = [];

// Draw an image
function drawImage(img, x, y, width, height) {
    ctx.drawImage(img, x, y, width, height);
}

// Handle key events to move the bird
function handleKeyDown(event) {
    if (event.code === "Space") {
        birdDY = -8;
    }
}

// Handle mouse events to move the bird
function handleMouseDown(event) {
    birdDY = -8;
}

// Draw the pipes
function drawPipes() {
    // Add a new pipe every 100 frames
    if (frameCount % 100 === 0) {
        const gap = 200; // The gap between the pipes
        const minHeight = 100; // The minimum height of the top pipe
        const maxHeight = canvas.height - gap - minHeight; // The maximum height of the top pipe
        const height1 = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight; // The height of the top pipe
        const height2 = canvas.height - gap - height1; // The height of the bottom pipe
        pipes.push({ x: canvas.width, y: 0, width: pipeWidth, height: height1 });
        pipes.push({ x: canvas.width, y: canvas.height - height2, width: pipeWidth, height: height2 });
    }

    // Move and draw the pipes
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        pipe.x -= pipeSpeed;
        drawImage(pipeImg, pipe.x, pipe.y, pipe.width, pipe.height);
    }

    // Remove pipes that have gone off screen
    if (pipes[0].x + pipes[0].width < 0) {
        pipes.shift();
        pipes.shift();
    }
}

// Draw the bird
function drawBird() {
    drawImage(birdImg, birdX - birdSize / 2, birdY - birdSize / 2, birdSize, birdSize);
}

// Update the game state
function update() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Check if the bird is touching a pipe
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        if (birdX - birdSize / 2 < pipe.x + pipe.width &&
            birdX + birdSize / 2 > pipe.x &&
            birdY - birdSize / 2 < pipe.y + pipe.height &&
            birdY + birdSize / 2 > pipe.y) {
            // Bird is touching a pipe, stop the game
            stopGame();
            return;
        }
    }

    // Check if the bird is below a certain Y level
    const bottomY = canvas.height - birdSize / 2;
    if (birdY > bottomY) {
        // Bird is below the Y level, stop the game
        stopGame();
        return;
    }

    // Move the bird
    birdDY += 0.5;
    birdY += birdDY;


    // Draw the background
    drawImage(new Image(canvas.width, canvas.height), 0, 0, canvas.width, canvas.height);

    // Draw the pipes
    drawPipes();

    // Draw the bird
    drawBird();

    // Check for collision
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        if (birdX < pipe.x + pipe.width &&
            birdX + birdSize > pipe.x &&
            birdY < pipe.y + pipe.height &&
            birdY + birdSize > pipe.y) {
            // Collision detected, stop the game
            alert("Game over!");
            return;
        }
    }

    // Increment the frame count
    frameCount++;

    // Request another frame
    requestAnimationFrame(update);
}


// Start the game loop
requestAnimationFrame(update);

// Add event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("mousedown", handleMouseDown);
