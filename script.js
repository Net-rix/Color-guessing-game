const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let targetColor = "";
let score = 0;

// Function to generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to generate shades of a given color
function generateShades(baseColor) {
    const shades = [];
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);

    for (let i = -3; i <= 2; i++) {
        let newR = Math.min(255, Math.max(0, r + i * 20));
        let newG = Math.min(255, Math.max(0, g + i * 20));
        let newB = Math.min(255, Math.max(0, b + i * 20));
        shades.push(`rgb(${newR}, ${newG}, ${newB})`);
    }

    return shades.sort(() => Math.random() - 0.5);
}

// Function to start a new round
function startNewRound() {
    gameStatus.textContent = "";
    colorOptionsContainer.innerHTML = "";

    // Generate a random base color
    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;

    // Generate six shades of the target color
    const colorShades = generateShades(targetColor);

    colorShades.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-option");
        button.setAttribute("data-testid", "colorOption");
        button.style.backgroundColor = color;
        button.addEventListener("click", () => checkGuess(color));
        colorOptionsContainer.appendChild(button);
    });
}

// Function to check if the guess is correct
function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.className = "correct";
        score++;
        scoreDisplay.textContent = score;
    } else {
        gameStatus.textContent = "Wrong! Try Again.";
        gameStatus.className = "wrong";
    }

    // Start a new round after a short delay
    setTimeout(startNewRound, 1000);
}

// Function to reset the game
function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    startNewRound();
}

// Event Listener for New Game Button
newGameButton.addEventListener("click", resetGame);

// Initialize the game on page load
startNewRound();
