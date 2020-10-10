document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
document.addEventListener("DOMContentLoaded", function () { newGame() });

//var difficulty = 'begginer';
var boardHeight = 9;
var boardWidth = 9;
var numberBombs = 10;
var rightFlags;
var wrongFlags;
var gameWin;
var gameLose;

function newGame() {
  initGame();
  createBoard();
  populateBoard();
}

function initGame() {
  rightFlags = 0;
  wrongFlags = 0;
  gameWin = false;
  gameLose = false;
}

function createBoard() {
  //draw board
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = "";
  let tbl = document.createElement('table');
  tbl.classList.add("board");
  for (i = 1; i <= boardWidth; i++) {
    let newRow = tbl.insertRow();
    for (j = 1; j <= boardHeight; j++) {
      let btt = document.createElement('button');
      btt.type = "button";
      btt.classList.add("board-cell");
      btt.classList.add("hidden");
      btt.id = i.toString() + j.toString();
      let newCell = newRow.insertCell(j - 1);
      newCell.appendChild(btt);
    }
    body.append(tbl);
  }

  //config btt click
  Array.from(document.getElementsByClassName('board-cell')).forEach((i) => {
    i.addEventListener('click', updateCell);
    i.addEventListener('contextmenu', updateCell);
  });
}

function populateBoard() {
  //mines
  let currBombs = 0;
  let rndX = 0;
  let rndY = 0;

  while (currBombs < numberBombs) {
    rndX = rndInt(1, boardWidth);
    rndY = rndInt(1, boardHeight);
    rndId = rndX.toString() + rndY.toString();
    if (!document.getElementById(rndId).classList.contains("mine")) {
      document.getElementById(rndId).classList.add("mine");
      currBombs++;
    }
  }

  //non-mines
  for (let i = 1; i <= boardWidth; i++) {
    for (let j = 1; j <= boardHeight; j++) {
      id = i.toString() + j.toString();
      if (!document.getElementById(id).classList.contains("mine")) {
        calcNum(id);
      }
    }
  }
}

function rndInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function updateCell(e) {
  console.log("rightFlags:" + rightFlags);
  console.log("wrongFlags:" + wrongFlags);
  console.log("numberBombs:" + numberBombs);
  if (e.type == 'click') { leftClick(this.id); }
  else if (e.type == 'contextmenu') { rightClick(this.id); }
}

function leftClick(id) {
  if (gameWin || gameLose) { newGame(); }
  else if (isHidden(id)) {
    if (isMine(id)) { loseGame(); }
    else { showCell(id); }
  }
}

function isHidden(id) { return document.getElementById(id).classList.contains("hidden"); }

function isMine(id) { return document.getElementById(id).classList.contains("mine"); }

function isZero(id) { return document.getElementById(id).classList.contains("zero"); }

function isFlagged(id) { return document.getElementById(id).classList.contains("flagged"); }

function loseGame() {
  for (let i = 1; i <= boardWidth; i++) {
    for (let j = 1; j <= boardHeight; j++) {
      if (isMine(toId(i, j)) && !isFlagged(toId(i, j))) { unhideCell(toId(i, j)); }
      else if (!isMine(toId(i, j)) && isFlagged(toId(i, j))) { wrongFlagCell(toId(i, j)); }

    }
  }
  gameLose = true;
}

function rightClick(id) {
  if (isHidden(id)) {
    unhideCell(id);
    flagCell(id);
    if (isMine(id)) { rightFlags++; } else { wrongFlags++; }
  } else if (isFlagged(id)) {
    unflagCell(id);
    hideCell(id);
    if (isMine(id)) { rightFlags--; } else { wrongFlags--; }
  }
  if (rightFlags == numberBombs && wrongFlags == 0) { winGame(); }
}

function hideCell(id) { document.getElementById(id).classList.add("hidden"); }
function unhideCell(id) { document.getElementById(id).classList.remove("hidden"); }

function flagCell(id) { document.getElementById(id).classList.add("flagged"); }
function unflagCell(id) { document.getElementById(id).classList.remove("flagged"); }
function wrongFlagCell(id) {
  document.getElementById(id).classList.remove("flagged");
  document.getElementById(id).classList.add("wrong-flag");
}

function showCell(id) {
  let row = rowOf(id);
  let col = colOf(id);
  if (!isHidden(id)) { return; }
  document.getElementById(id).classList.remove("hidden");
  if (isZero(id)) {
    for (let i = Math.max(row - 1, 1); i <= Math.min(row + 1, boardHeight); i++) {
      for (let j = Math.max(col - 1, 1); j <= Math.min(col + 1, boardWidth); j++) {
        showCell(toId(i, j));
      }
    }
  }
}

function rowOf(id) { return parseInt(id.charAt(0)); }
function colOf(id) { return parseInt(id.charAt(1)); }

function toId(i, j) { return i.toString() + j.toString(); }

function winGame() {
  gameWin = true;
}

function calcNum(id) {
  let row = rowOf(id);
  let col = colOf(id);
  let res = 0;
  for (let i = Math.max(row - 1, 1); i <= Math.min(row + 1, boardWidth); i++) {
    for (let j = Math.max(col - 1, 1); j <= Math.min(col + 1, boardHeight); j++) {
      if (i != row || j != col) { if (isMine(toId(i, j))) { res++; } }
    }
  }
  let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  document.getElementById(id).classList.add(nums[res]);
  document.getElementById(id).innerHTML = res.toString();
}
