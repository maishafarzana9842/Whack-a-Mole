
let score = 0;
let time = 30;
let activeMole = -1;
let gameRunning = false;

let moleTimer;
let gameTimer;

let moleSpeed = 850;

let bestScore = Number(localStorage.getItem("bestScore")) || 0;

const holes = document.querySelectorAll(".hole");

document.getElementById("bestScore").innerText = bestScore;

function showMole() {
    holes.forEach(hole => hole.classList.remove("active"));

    activeMole = Math.floor(Math.random() * 9);

    holes[activeMole].classList.add("active");
}

function scheduleMole() {
    moleTimer = setTimeout(function() {
        if (!gameRunning) return;

        moleSpeed = Math.max(350, 850 - Math.floor(score / 5) * 70);

        showMole();
        scheduleMole();

    }, moleSpeed);
}

function hitMole(index) {
    if (!gameRunning) return;

    if (index === activeMole) {
        score++;

        document.getElementById("score").innerText = score;

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
            document.getElementById("bestScore").innerText = bestScore;
        }

        clearTimeout(moleTimer);

        holes[index].classList.remove("active");
        activeMole = -1;

        showMole();
        scheduleMole();
    }
}

function startGame() {
    clearTimeout(moleTimer);
    clearInterval(gameTimer);

    score = 0;
    time = 30;
    moleSpeed = 850;
    gameRunning = true;

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    document.getElementById("message").innerText = "Catch the moles!";
    document.getElementById("startBtn").disabled = true;
    document.getElementById("startBtn").innerText = "PLAYING...";

    showMole();
    scheduleMole();

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

    clearTimeout(moleTimer);
    clearInterval(gameTimer);

    holes.forEach(hole => hole.classList.remove("active"));

    activeMole = -1;

    document.getElementById("message").innerText =
        "Game Over! Your Score: " + score;

    document.getElementById("startBtn").innerText = "PLAY AGAIN";
    document.getElementById("startBtn").disabled = false;
}
