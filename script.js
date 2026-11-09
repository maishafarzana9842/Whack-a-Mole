
let score = 0;
let time = 30;
let activeMole = -1;
let gameRunning = false;

let moleTimer;
let gameTimer;

const holes = document.querySelectorAll(".hole");

function showMole() {
    holes.forEach(hole => hole.classList.remove("active"));

    activeMole = Math.floor(Math.random() * 9);

    holes[activeMole].classList.add("active");
}

function hitMole(index) {
    if (!gameRunning) return;

    if (index === activeMole) {
        score++;

        document.getElementById("score").innerText = score;

        holes[index].classList.remove("active");

        activeMole = -1;

        showMole();
    }
}

function startGame() {
    score = 0;
    time = 30;
    gameRunning = true;

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    document.getElementById("message").innerText = "Catch the moles!";
    document.getElementById("startBtn").disabled = true;

    document.getElementById("startBtn").innerText = "PLAYING...";

    showMole();

    moleTimer = setInterval(showMole, 850);

    gameTimer = setInterval(function() {
        time--;

        document.getElementById("time").innerText = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);
}

function endGame() {
    gameRunning = false;

    clearInterval(moleTimer);
    clearInterval(gameTimer);

    holes.forEach(hole => hole.classList.remove("active"));

    activeMole = -1;

    document.getElementById("message").innerText =
        "Game Over! Your Score: " + score;

    document.getElementById("startBtn").innerText = "PLAY AGAIN";
    document.getElementById("startBtn").disabled = false;
}
