# TEK 8.6 Science Bingo 🧪

A fast-paced, interactive web-based Bingo game designed for middle school science classrooms. This tool helps students master **TEK 8.6** concepts, including the Law of Conservation of Mass, chemical equations, and atomic counting.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Platform: GitHub Pages](https://img.shields.io/badge/Platform-GitHub%20Pages-blue)

## 🚀 Live Demo
[View the Live Game Here](https://jofiel-nguyen.github.io/Ultimate-Science-Bingo-Questions-/)

## ✨ Features
- **Dynamic Board Generation**: Every student gets a unique, randomized Bingo board.
- **Interactive Gameplay**: Real-time feedback with "shake" animations for incorrect answers and green highlights for correct ones.
- **Local Leaderboard**: Tracks the top 5 fastest times using browser `localStorage`.
- **Teacher Admin Mode**: A hidden shortcut (`Ctrl + Shift + Alt + C`) allows teachers to clear the high scores.
- **Responsive Design**: Optimized for classroom Chromebooks, tablets, and desktops.

## 🕹️ How to Play
1. **Enter Name**: Students start by entering their name to track their score.
2. **Identify Answers**: A science question appears in the question area. Students must find the matching answer on their grid.
3. **Win the Game**: The first student to complete a row, column, or diagonal (including the "Free Space") wins.
4. **Verification**: Upon winning, a popup displays the student's name and total time.

## 🛠️ Technical Details
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla).
- **Storage**: `localStorage` API for persisting high scores without a backend.
- **Hosting**: GitHub Pages.

## 📂 Project Structure
```text
├── index.html   # The main structure and UI of the game
├── style.css    # Custom styling and animations
├── script.js    # Game logic, timer, and score management
└── README.md    # Project documentation
