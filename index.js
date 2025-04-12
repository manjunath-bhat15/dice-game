let player1Score = 0;
let player2Score = 0;
let player1Name = "Player 1";
let player2Name = "Player 2";
let roundsToPlay = 1;
let currentRound = 1;
let currentPlayer = null; // Keeps track of whose turn it is

function startGame() {
    player1Name = document.getElementById("player1Name").value || "Player 1";
    player2Name = document.getElementById("player2Name").value || "Player 2";
    roundsToPlay = parseInt(document.getElementById("rounds").value) || 1;

    document.getElementById("p1-name").innerText = player1Name;
    document.getElementById("p2-name").innerText = player2Name;
    document.getElementById("round-info").innerText = `Round ${currentRound}`;

    document.querySelector(".setup").classList.add("hidden");
    document.querySelector(".game-area").classList.remove("hidden");

    chooseFirstPlayer(); // Decide who rolls first
}

function chooseFirstPlayer() {
    currentPlayer = Math.random() < 0.5 ? 1 : 2; // Randomly select first player
    updateRollButtons();
}

function rollDice(player) {
    if (player !== currentPlayer) return; // Prevent wrong turns

    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let randomDiceImage = "dice" + randomNumber + ".png";
    let randomDiceImageSource = "images/" + randomDiceImage;

    if (player === 1) {
        document.querySelector(".img1").setAttribute("src", randomDiceImageSource);
        player1Score = randomNumber;
        currentPlayer = 2; // Switch to Player 2
    } else {
        document.querySelector(".img2").setAttribute("src", randomDiceImageSource);
        player2Score = randomNumber;
        currentPlayer = 1; // Switch to Player 1
    }

    updateRollButtons();
    checkWinner();
}

function updateRollButtons() {
    const p1Button = document.querySelector(".dice1 .roll-btn");
    const p2Button = document.querySelector(".dice2 .roll-btn");

    if (currentPlayer === 1) {
        p1Button.classList.remove("disabled");
        p1Button.disabled = false;
        p2Button.classList.add("disabled");
        p2Button.disabled = true;
    } else {
        p1Button.classList.add("disabled");
        p1Button.disabled = true;
        p2Button.classList.remove("disabled");
        p2Button.disabled = false;
    }
}

function checkWinner() {
    if (player1Score !== 0 && player2Score !== 0) {
        let winnerText = "";

        if (player1Score > player2Score) {
            winnerText = `🚩 ${player1Name} Wins! 😍`;
            document.getElementById("player1Score").innerText++;
        } else if (player1Score < player2Score) {
            winnerText = `🚩 ${player2Name} Wins! 😍`;
            document.getElementById("player2Score").innerText++;
        } else {
            winnerText = "It's a Draw! 🎲";
        }

        document.getElementById("result").innerText = winnerText;
        player1Score = 0;
        player2Score = 0;

        if (currentRound < roundsToPlay) {
            currentRound++;
            document.getElementById("round-info").innerText = `Round ${currentRound}`;
        } else {
            endGame();
        }
    }
}

function endGame() {
    document.querySelectorAll(".roll-btn").forEach(btn => {
        btn.classList.add("disabled");
        btn.disabled = true;
    });

    let p1Wins = parseInt(document.getElementById("player1Score").innerText);
    let p2Wins = parseInt(document.getElementById("player2Score").innerText);

    if (p1Wins > p2Wins) {
        document.getElementById("result").innerText = `🏆 ${player1Name} Wins the Game!`;
    } else if (p1Wins < p2Wins) {
        document.getElementById("result").innerText = `🏆 ${player2Name} Wins the Game!`;
    } else {
        document.getElementById("result").innerText = "It's a Tie! 🎉";
    }

    document.querySelector(".restart-btn").classList.remove("hidden");
}

function restartGame() {
    location.reload();
}
