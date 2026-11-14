
let score = 0;
let time = 30;
let activeMole = -1;
let gameRunning = false;
let goldenMole = false;

let moleTimer;
let gameTimer;
let moleSpeed = 1300;

let bestScore = Number(localStorage.getItem("bestScore")) || 0;

const holes = document.querySelectorAll(".hole");
const pauseBtn = document.getElementById("pauseBtn");

document.getElementById("bestScore").innerText = bestScore;

function showMole() {
    holes.forEach(hole => hole.classList.remove("active", "golden"));

    activeMole = Math.floor(Math.random() * holes.length);
    goldenMole = Math.random() < 0.20;

    holes[activeMole].classList.add("active");

    if (goldenMole) holes[activeMole].classList.add("golden");
}

function scheduleMole() {
    clearTimeout(moleTimer);

    moleTimer = setTimeout(function() {
        if (!gameRunning) return;

        holes[activeMole].classList.remove("active", "golden");
        activeMole = -1;

        moleSpeed = Math.max(700, 1300 - Math.floor(score / 5) * 50);

        showMole();
        scheduleMole();
    }, moleSpeed);
}

function hitMole(index) {
    if (!gameRunning || index !== activeMole) return;

    score += goldenMole ? 2 : 1;
    document.getElementById("score").innerText = score;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("bestScore").innerText = bestScore;
    }

    clearTimeout(moleTimer);

    holes[activeMole].classList.remove("active", "golden");
    activeMole = -1;

    moleSpeed = Math.max(700, 1300 - Math.floor(score / 5) * 50);

    showMole();
    scheduleMole();
}

function startGame() {
    clearTimeout(moleTimer);
    clearInterval(gameTimer);

    score = 0;
    time = 30;
    moleSpeed = 1300;
    goldenMole = false;
    gameRunning = true;

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    document.getElementById("message").innerText = "Catch the moles!";
    document.getElementById("startBtn").disabled = true;
    document.getElementById("startBtn").innerText = "PLAYING...";

    pauseBtn.disabled = false;
    pauseBtn.innerText = "PAUSE";

    showMole();
    scheduleMole();

    gameTimer = setInterval(function() {
        time--;
        document.getElementById("time").innerText = time;

        if (time <= 0) endGame();
    }, 1000);
}

function togglePause() {
    if (!gameRunning && pauseBtn.innerText === "RESUME") {
        gameRunning = true;
        pauseBtn.innerText = "PAUSE";
        document.getElementById("message").innerText = "Catch the moles!";

        scheduleMole();

        gameTimer = setInterval(function() {
            time--;
            document.getElementById("time").innerText = time;

            if (time <= 0) endGame();
        }, 1000);

    } else if (gameRunning) {
        gameRunning = false;

        clearTimeout(moleTimer);
        clearInterval(gameTimer);

        pauseBtn.innerText = "RESUME";
        document.getElementById("message").innerText = "Game Paused!";
    }
}

function endGame() {
    gameRunning = false;

    clearTimeout(moleTimer);
    clearInterval(gameTimer);

    holes.forEach(hole => hole.classList.remove("active", "golden"));
    activeMole = -1;

    pauseBtn.disabled = true;

    document.getElementById("message").innerText =
        "Game Over! Your Score: " + score;

    document.getElementById("startBtn").innerText = "PLAY AGAIN";
    document.getElementById("startBtn").disabled = false;
}

document.getElementById("startBtn").addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);

holes.forEach((hole, index) => {
    hole.addEventListener("click", function() {
        hitMole(index);
    });
});
