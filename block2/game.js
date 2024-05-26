const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    color: "blue",
    speed: 5,
    dx: 0,
    dy: 0
};

const coins = [
    { x: 100, y: 100, width: 10, height: 10, color: "gold" },
    { x: 200, y: 150, width: 10, height: 10, color: "gold" },
    { x: 300, y: 50, width: 10, height: 10, color: "gold" },
    { x: 400, y: 200, width: 10, height: 10, color: "gold" },
    { x: 250, y: 250, width: 10, height: 10, color: "gold" },
    { x: 50, y: 300, width: 10, height: 10, color: "gold" },
    { x: 150, y: 75, width: 10, height: 10, color: "gold" },
    { x: 350, y: 100, width: 10, height: 10, color: "gold" },
    { x: 100, y: 200, width: 10, height: 10, color: "gold" },
    { x: 400, y: 50, width: 10, height: 10, color: "gold" }
];

const obstacles = [
    { x: 150, y: 200, width: 20, height: 20, color: "red" },
    { x: 300, y: 150, width: 20, height: 20, color: "red" }
];

let score = 0;
let gameOver = false;

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.fillStyle = coin.color;
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    });
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Boundary detection
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function detectCollision() {
    // Collision with coins
    coins.forEach((coin, index) => {
        if (player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y) {
            coins.splice(index, 1);
            score += 10;
        }
    });

    // Collision with obstacles
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            score -= 5;
        }
    });

    if (coins.length === 0) {
        gameOver = true;
        saveScore(score);
        showHighScores();
    }
}

function update() {
    if (!gameOver) {
        clear();
        drawPlayer();
        drawCoins();
        drawObstacles();
        drawScore();
        movePlayer();
        detectCollision();

        requestAnimationFrame(update);
    }
}

function keyDown(e) {
    if (e.key === "ArrowRight" || e.key === "Right") {
        player.dx = player.speed;
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
        player.dx = -player.speed;
    } else if (e.key === "ArrowUp" || e.key === "Up") {
        player.dy = -player.speed;
    } else if (e.key === "ArrowDown" || e.key === "Down") {
        player.dy = player.speed;
    }
}

function keyUp(e) {
    if (e.key === "ArrowRight" || e.key === "Right" ||
        e.key === "ArrowLeft" || e.key === "Left" ||
        e.key === "ArrowUp" || e.key === "Up" ||
        e.key === "ArrowDown" || e.key === "Down") {
        player.dx = 0;
        player.dy = 0;
    }
}

function saveScore(score) {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 3);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.getElementById('highScores');
    highScoresList.innerHTML = highScores.map(score => `<li>${score}</li>`).join('');
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

document.getElementById("restartButton").addEventListener("click", () => {
    location.reload();
});

showHighScores();
update();
