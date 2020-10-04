document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
document.addEventListener("DOMContentLoaded", function () { startGame() });

class Cell {
  constructor() {
    this.state = 'hidden';
    this.mine = false;
    this.minesClose = null;
  }
  //get isMine () {return this.mine;}
}

var difficulty = 'begginer';
var boardHeight = 9;
var boardWidth = 9;
var board = [];
var numberBombs = 10;
//var number_bombs = 0;
var rightFlags = 0;
var wrongFlags = 0;

function startGame() {
  drawGrid();
  configBttClick();
  genMines();
}

function drawGrid() {
  var tableRef = document.getElementsByClassName('grid-container')[0];
  for (i = 1; i <= boardWidth; i++) {
    var newRow = tableRef.insertRow();
    for (j = 1; j <= boardHeight; j++) {
      var btt = document.createElement('button');
      btt.type = "button";
      btt.className = "grid-item";
      btt.id = i.toString() + j.toString();
      var newCell = newRow.insertCell(j - 1);
      newCell.appendChild(btt);
    }
  }
}

function configBttClick() {
  Array.from(document.getElementsByClassName('grid-item')).forEach((i) => {
    i.addEventListener("click", updateCell);
    i.addEventListener("contextmenu", updateCell);
  });
  /*document.querySelectorAll('.grid-item').forEach((i) => {
    i.addEventListener("click", updateCell);
    i.addEventListener("contextmenu", updateCell);
  });*/
}

function genMines() {
  var currBombs = 0;
  var rndX = 0;
  var rndY = 0;
  //create board
  for (var i = 1; i <= boardWidth; i++) {
    board[i] = [];
    for (var j = 1; j <= boardHeight; j++) {
      board[i][j] = new Cell();
    }
  }

  //generate mines
  while (currBombs < numberBombs) {
    rndX = getRandomIntInclusive(1, boardWidth);
    rndY = getRandomIntInclusive(1, boardHeight);
    //rndX = Math.random()*(boardWidth-1) + 1;
    //rndY = Math.random()*(boardHeight-1) + 1;
    //console.log(rndX.toString() + rndY.toString());
    if (board[rndX][rndY].mine == false) {
      board[rndX][rndY].mine = true;
      //console.log(rndX.toString() + rndY.toString());
      currBombs++;
    }
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function updateCell(e) {
  //console.log('hi');
  bttRow = parseInt(this.id.charAt(0));
  bttCol = parseInt(this.id.charAt(1));
  if (e.type == 'click' && board[bttRow][bttCol].state == 'hidden') { //left click
    if (board[bttRow][bttCol].mine) {
      for (var i = 1; i <= boardWidth; i++) {
        for (var j = 1; j <= boardHeight; j++) {
          if (board[i][j].mine) {
            board[i][j].state = 'bombed';
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'red';
          }
        }
      }
      //alert('Game Over!');
    } else {
      //clear cell
      board[bttRow][bttCol].state = 'cleared';
      if (this.minesClose == null) { this.minesClose = calcNum(bttRow, bttCol, this.id); }
      document.getElementById(this.id).innerHTML = this.minesClose;
      if (this.minesClose == 0) { clearCell(bttRow, bttCol, this.id); }
      //document.getElementById(btt.id).style.backgroundColor = 'green';
    }
  } else if (e.type == 'contextmenu') { //right click
    if (board[bttRow][bttCol].state == 'hidden') {
      board[bttRow][bttCol].state = 'flagged';
      document.getElementById(this.id).style.backgroundImage = 'url(flag.png)';
      //document.getElementById(btt.id).style.backgroundColor = 'blue';
      if (board[bttRow][bttCol].mine) { rightFlags++; } else { wrongFlags++; }
    } else if (board[bttRow][bttCol].state == 'flagged') {
      board[bttRow][bttCol].state = 'hidden';
      //document.getElementById(btt.id).style.backgroundColor = 'white';
      document.getElementById(this.id).style.backgroundImage = 'none';
      if (board[bttRow][bttCol].mine) { rightFlags--; } else { wrongFlags--; }
    }
    if (rightFlags == numberBombs && wrongFlags == 0) { alert('You Won!'); }
  }
}

function clearCell(row, col, id) {
  console.log('clearcell: row: ' + row.toString() + ' col: ' + col + ' id: ' + id);
  for (var i = Math.max(row - 1, 1); i <= Math.min(row + 1, boardWidth); i++) {
    for (var j = Math.max(col - 1, 1); j <= Math.min(col + 1, boardHeight); j++) {
      console.log('i: ' + i.toString() + 'j: ' + j.toString());
      var otherId = i.toString() + j.toString();
      //console.log(otherId);
      document.getElementById(otherId).state = 'cleared';
      if (document.getElementById(otherId).minesClose == null) {
        //console.log('i: '+ i.toString() + ' j: '+ j.toString());
        var numCalc = calcNum(i, j, otherId);
        document.getElementById(otherId).minesClose = numCalc;
        document.getElementById(otherId).innerHTML = numCalc;
        if (numCalc == 0) {
          //console.log('i: '+ i.toString() + ' j: '+ j.toString());
          clearCell(i, j, otherId);
        }
      }
    }
  }
}

function calcNum(row, col, id) {
  var res = 0;
  for (var i = Math.max(row - 1, 1); i <= Math.min(row + 1, boardWidth); i++) {
    for (var j = Math.max(col - 1, 1); j <= Math.min(col + 1, boardHeight); j++) {
      if (i != row || j != col) { if (board[i][j].mine) { res++;/*console.log(i.toString() + j.toString());*/ } }
    }
  }
  var numName = '';
  switch (res) {
    case 0:
      numName = 'zero';
      break;
    case 1:
      numName = 'one';
      break;
    case 2:
      numName = 'two';
      break;
    case 3:
      numName = 'three';
      break;
    case 4:
      numName = 'four';
      break;
    case 5:
      numName = 'five';
      break;
    case 6:
      numName = 'six';
      break;
    case 7:
      numName = 'seven';
      break;
    case 8:
      numName = 'eight';
      break;
  }
  document.getElementById(id).classList.add(numName);
  return res;
}
