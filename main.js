class Cell {
  constructor(mine) {
    //this.state = 'hidden';
    this.mine = mine;
  }
  get getmine() { //! cannot be mine()
    return this.mine;
  }
}

/*var size_matrix = 3;
var matrix = [];
for(var i=1; i<=size_matrix; i++) {
    matrix[i] = [];
    for(var j=1; j<=size_matrix; j++) {
        //matrix[i][j] = new Cell(Math.random() >= 0.5);
        const matrix[i][j] = new Cell('true');
    }
}*/

function createMatrix() {
  var size_matrix = 3;
  var matrix = [];
  let x = new Cell("John");
  //let user = new User("John");
  //user.sayHi();
  /*for(var i=1; i<=size_matrix; i++) {
      matrix[i] = [];
      for(var j=1; j<=size_matrix; j++) {
          //matrix[i][j] = new Cell(Math.random() >= 0.5);
          matrix[i][j] = new Cell('true');
      }
  }*/
}

function fillMatrix() {
  for(var i=1; i<=size_matrix; i++) {
      for(var j=1; j<=size_matrix; j++) {
        //document.getElementById(i.toString()+j.toString()).innerText = matrix[i][j].isMine().toString(); //
        //console.log(matrix[i][j]);
        //console.log(i.toString()+j.toString());
        //document.getElementById(i.toString()+j.toString()).innerText = matrix[i][j];
      }
  }
}

//disabling context menu
if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    alert("You've tried to open context menu");
    window.event.returnValue = false;
  });
}

function updateSquare(btt, e) {
  bttRow = btt.id.charAt(0);
  bttCol = btt.id.charAt(1);
  if (e.type == 'click') { //left click
    if (isMine[bttRow][bttCol]) {
      console.log('lose');
      //lose
    }
  } else if (e.type == 'contextmenu') { //right click
    console.log('right click');
    console.log(getComputedStyle(document.getElementById(btt.id)).backgroundColor);
    //console.log(getComputedStyle(document.getElementById(btt.id)).backgroundColor == 'rgb(255, 255, 255)');
    if(getComputedStyle(document.getElementById(btt.id)).backgroundColor == 'rgb(255, 255, 255)') {
      console.log('hi');
      document.getElementById(btt.id).style.backgroundColor = 'blue';
    }
  }
}
