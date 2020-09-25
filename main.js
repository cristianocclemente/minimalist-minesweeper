class Cell {
  constructor(mine) {
    this.state = 'hidden';
    this.mine = mine;
  }
}

var size_matrix = 3;
var matrix = [];
var num_bombs = 0;
var right_flags = 0;
var wrong_flags = 0;

function startGame() {
  for(var i=1; i<=size_matrix; i++) {
      matrix[i] = [];
      for(var j=1; j<=size_matrix; j++) {
        randInt = Math.random();
        if(randInt > 0.5) {num_bombs++;}
        matrix[i][j] = new Cell(randInt > 0.5);
      }
  }
}

//disable context menu
document.addEventListener('contextmenu', function(e) {e.preventDefault();});

function updateCell(btt, e) {
  bttRow = parseInt(btt.id.charAt(0));
  bttCol = parseInt(btt.id.charAt(1));
  if (e.type=='click' && matrix[bttRow][bttCol].state == 'hidden') { //left click
    if (matrix[bttRow][bttCol].mine) {
      for(var i=1; i<=size_matrix; i++) {
        for(var j=1; j<=size_matrix; j++) {
          if(matrix[i][j].mine) {
            matrix[i][j].state = 'bombed';
            document.getElementById(i.toString()+j.toString()).style.backgroundColor = 'red';
          }
        }
      }
      alert('Game Over!');
    } else {
      //clear square
      matrix[bttRow][bttCol].state = 'cleared';
      console.log(bttRow.toString(), bttCol.toString());
      document.getElementById(btt.id).innerHTML = calcNum(bttRow, bttCol);
      document.getElementById(btt.id).style.backgroundColor = 'green';
    }
  } else if (e.type == 'contextmenu') { //right click
    if (matrix[bttRow][bttCol].state == 'hidden') {
      matrix[bttRow][bttCol].state = 'flagged';
      document.getElementById(btt.id).style.backgroundColor = 'blue';
      if(matrix[bttRow][bttCol].mine) {right_flags++;} else {wrong_flags++;}
    } else if (matrix[bttRow][bttCol].state == 'flagged') {
      matrix[bttRow][bttCol].state = 'hidden';
      document.getElementById(btt.id).style.backgroundColor = 'white';
      if(matrix[bttRow][bttCol].mine) {right_flags--;} else {wrong_flags--;}
    }
    if(right_flags==num_bombs && wrong_flags==0) {alert('You Won!');}
  }
}

function calcNum(row, col) {
  var res = 0;
  for(i=Math.max(row-1, 1); i<=Math.min(row+1, size_matrix); i++) {
    for(j=Math.max(col-1, 1); j<=Math.min(col+1, size_matrix); j++) {
      if(i!=row || j!=col) {if(matrix[i][j].mine) {res++;console.log(i.toString() + j.toString());}}
    }
  }
  return res;
}
