const questionBank = [
    { a: "10g", q: "Mass of product if 5g Reactant A + 5g Reactant B react in a closed system?" },
    { a: "15g", q: "If you start with 15g of ice, what is the mass of the water after it melts?" },
    { a: "50g", q: "If the products weigh 50g, what was the total mass of the reactants?" },
    { a: "100g", q: "Total mass of a 75g solution mixed with 25g of solvent?" },
    { a: "22g", q: "Mass of CO2 produced if 12g Carbon + 10g Oxygen react?" },
    { a: "5g", q: "If 10g wood burns and 5g gas escapes, what is the mass of the ash?" },
    { a: "8g", q: "In an open system: 10g reactants result in 2g solid. How much gas escaped?" },
    { a: "25g", q: "Find X: X grams Iron + 10g Oxygen = 35g Rust." },
    { a: "2 atoms", q: "Number of Oxygen atoms in CO2?" },
    { a: "4 atoms", q: "Total atoms on the reactant side of 2H2 + O2?" },
    { a: "6 atoms", q: "Total Hydrogen atoms in 3H2?" },
    { a: "12 atoms", q: "Number of Hydrogen atoms in Glucose (C6H12O6)?" },
    { a: "16 atoms", q: "Total atoms in two molecules of C2H6?" },
    { a: "Balanced", q: "An equation where Left Side atoms = Right Side atoms is..." },
    { a: "Unbalanced", q: "If an equation has more atoms on the right than the left, it is..." },
    { a: "Reactant", q: "The 'ingredients' found on the left side of the arrow." },
    { a: "Product", q: "The new substances formed on the right side of the arrow." },
    { a: "Yields", q: "What the chemical arrow (→) means." },
    { a: "Subscript", q: "The tiny number used to show the number of atoms." },
    { a: "Coefficient", q: "The large number in front that multiplies the whole formula." },
    { a: "Closed System", q: "A reaction where matter cannot escape." },
    { a: "Open System", q: "A reaction where gas can float away into the room." },
    { a: "Gas Escaped", q: "Reason for mass loss in an open beaker." },
    { a: "Law of Conservation", q: "Rule: Mass is never created or destroyed." },
    { a: "Matter", q: "Anything that has mass and volume." }
];

let timeLeft = 300;
let timerInterval;
let gameActive = false;
let currentAnswer = "";
let playerName = "";

// Initial leaderboard load
displayLeaderboard();

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 300;
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            alert("Time's up! Try again.");
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    document.getElementById('timer').innerText = `Time Remaining: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function generateBoard() {
    const board = document.getElementById('bingo-board');
    board.innerHTML = '';
    let answersOnly = questionBank.map(item => item.a);
    let shuffled = answersOnly.sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < 25; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        if (i === 12) {
            cell.innerText = "FREE SPACE";
            cell.classList.add('free', 'marked');
        } else {
            cell.innerText = shuffled[i];
            cell.onclick = function() { handleCellClick(this); };
        }
        board.appendChild(cell);
    }
}

function handleCellClick(cellElement) {
    if (!gameActive || cellElement.classList.contains('marked')) return;

    if (cellElement.innerText === currentAnswer) {
        cellElement.classList.add('marked');
        checkWin();
        drawQuestion();
    } else {
        cellElement.classList.add('shake');
        setTimeout(() => cellElement.classList.remove('shake'), 400);
    }
}

function drawQuestion() {
    if(!gameActive) return;
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    currentAnswer = questionBank[randomIndex].a;
    document.getElementById('q-text').innerText = questionBank[randomIndex].q;
}

function checkWin() {
    const cells = document.querySelectorAll('.cell');
    const marked = Array.from(cells).map(c => c.classList.contains('marked'));
    const winPatterns = [
        [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
        [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
        [0,6,12,18,24], [4,8,12,16,20]
    ];

    for (let pattern of winPatterns) {
        if (pattern.every(index => marked[index])) {
            gameWin();
            return;
        }
    }
}

function gameWin() {
    clearInterval(timerInterval);
    gameActive = false;
    const timeSpent = 300 - timeLeft;
    saveScore(playerName, timeSpent);
    displayLeaderboard();
    setTimeout(() => alert(`BINGO! ${playerName}, you won in ${timeSpent} seconds!`), 100);
}

function saveScore(name, time) {
    let scores = JSON.parse(localStorage.getItem('bingoScores')) || [];
    scores.push({ name, time });
    scores.sort((a, b) => a.time - b.time);
    localStorage.setItem('bingoScores', JSON.stringify(scores.slice(0, 5)));
}

function displayLeaderboard() {
    const scores = JSON.parse(localStorage.getItem('bingoScores')) || [];
    const list = document.getElementById('score-list');
    list.innerHTML = scores.map((s, i) => `<li><span>${i+1}. ${s.name}</span> <span>${s.time}s</span></li>`).join('');
}

function clearScores() {
    localStorage.removeItem('bingoScores');
    displayLeaderboard();
}

function resetGame() {
    const input = document.getElementById('player-name');
    if (!input.value.trim()) return alert("Enter your name!");
    
    playerName = input.value;
    input.disabled = true;
    gameActive = true;
    document.getElementById('draw-btn').style.display = "inline-block";
    generateBoard();
    startTimer();
    drawQuestion();
}
