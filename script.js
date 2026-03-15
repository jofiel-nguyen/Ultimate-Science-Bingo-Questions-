const ADMIN_NAME = "teacher";

const questionBank = [
{a:"10g",q:"Mass of product if 5g Reactant A + 5g Reactant B react in a closed system?"},
{a:"15g",q:"If you start with 15g of ice, what is the mass of the water after it melts?"},
{a:"50g",q:"If the products weigh 50g, what was the total mass of the reactants?"},
{a:"100g",q:"Total mass of a 75g solution mixed with 25g of solvent?"},
{a:"22g",q:"Mass of CO2 produced if 12g Carbon + 10g Oxygen react?"},
{a:"5g",q:"If 10g wood burns and 5g gas escapes, what is the mass of the ash?"},
{a:"8g",q:"In an open system: 10g reactants result in 2g solid. How much gas escaped?"},
{a:"25g",q:"Find X: X grams Iron + 10g Oxygen = 35g Rust."},
{a:"2 atoms",q:"Number of Oxygen atoms in CO2?"},
{a:"4 atoms",q:"Total atoms on the reactant side of 2H2 + O2?"},
{a:"6 atoms",q:"Total Hydrogen atoms in 3H2?"},
{a:"12 atoms",q:"Number of Hydrogen atoms in Glucose (C6H12O6)?"},
{a:"16 atoms",q:"Total atoms in two molecules of C2H6?"},
{a:"Balanced",q:"An equation where Left Side atoms = Right Side atoms is..."},
{a:"Unbalanced",q:"If an equation has more atoms on the right than the left, it is..."},
{a:"Reactant",q:"Ingredients on the left side of the arrow"},
{a:"Product",q:"New substances formed on the right"},
{a:"Yields",q:"Meaning of the chemical arrow →"},
{a:"Subscript",q:"Tiny number showing atom count"},
{a:"Coefficient",q:"Large number multiplying formula"},
{a:"Closed System",q:"Reaction where matter cannot escape"},
{a:"Open System",q:"Reaction where gas escapes"},
{a:"Gas Escaped",q:"Reason for mass loss in open beaker"},
{a:"Law of Conservation",q:"Mass is never created or destroyed"},
{a:"Matter",q:"Anything with mass and volume"}
];

let timeLeft = 300;
let timerInterval;
let currentAnswer = "";
let gameActive = false;
let playerName = "";

displayLeaderboard();

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

function startTimer(){

clearInterval(timerInterval);

timeLeft = 300;

timerInterval=setInterval(()=>{

if(timeLeft<=0){

clearInterval(timerInterval);

gameActive=false;

alert("Time's up!");

}

else{

timeLeft--;

updateTimerDisplay();

}

},1000);

}

function updateTimerDisplay(){

let m=Math.floor(timeLeft/60);

let s=timeLeft%60;

document.getElementById("timer").innerText=
`Time Remaining: ${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;

}

function generateBoard(){

const board=document.getElementById("bingo-board");

board.innerHTML="";

let answers=shuffle(questionBank.map(q=>q.a)).slice(0,24);

for(let i=0;i<25;i++){

let cell=document.createElement("div");

cell.className="cell";

if(i===12){

cell.innerText="FREE";

cell.classList.add("marked","free");

}

else{

let answer=answers.shift();

cell.innerText=answer;

cell.onclick=()=>handleCellClick(cell);

}

board.appendChild(cell);

}

}

function drawQuestion(){

if(!gameActive) return;

let random=Math.floor(Math.random()*questionBank.length);

currentAnswer=questionBank[random].a;

document.getElementById("q-text").innerText=questionBank[random].q;

}

function handleCellClick(cell){

if(!gameActive) return;

if(cell.classList.contains("marked")) return;

if(cell.innerText===currentAnswer){

cell.classList.add("marked");

checkWin();

drawQuestion();

}

else{

cell.classList.add("shake");

setTimeout(()=>cell.classList.remove("shake"),400);

}

}

function checkWin(){

const cells=[...document.querySelectorAll(".cell")];

const marked=cells.map(c=>c.classList.contains("marked"));

const wins=[

[0,1,2,3,4],
[5,6,7,8,9],
[10,11,12,13,14],
[15,16,17,18,19],
[20,21,22,23,24],
[0,5,10,15,20],
[1,6,11,16,21],
[2,7,12,17,22],
[3,8,13,18,23],
[4,9,14,19,24],
[0,6,12,18,24],
[4,8,12,16,20]

];

for(let pattern of wins){

if(pattern.every(i=>marked[i])){

gameWin();

}

}

}

function gameWin(){

clearInterval(timerInterval);

gameActive=false;

let timeSpent=300-timeLeft;

saveScore(playerName,timeSpent);

displayLeaderboard();

alert(`BINGO!
Name: ${playerName}
Time: ${timeSpent} seconds`);

}

function saveScore(name,time){

let scores=JSON.parse(localStorage.getItem("bingoScores"))||[];

scores.push({name,time});

scores.sort((a,b)=>a.time-b.time);

localStorage.setItem("bingoScores",JSON.stringify(scores.slice(0,5)));

}

function displayLeaderboard(){

let scores=JSON.parse(localStorage.getItem("bingoScores"))||[];

const list=document.getElementById("score-list");

list.innerHTML=scores.map((s,i)=>
`<li>${i+1}. ${s.name} — ${s.time}s</li>`
).join("");

}

function resetGame(){

const input=document.getElementById("player-name");

if(!input.value.trim()){

alert("Enter your name");

return;

}

playerName=input.value;

gameActive=true;

document.getElementById("draw-btn").style.display="inline-block";

if(playerName.toLowerCase()===ADMIN_NAME){

document.getElementById("admin-clear-btn").style.display="inline-block";

}

generateBoard();

startTimer();

drawQuestion();

}

function clearScores(){

localStorage.removeItem("bingoScores");

displayLeaderboard();

}
