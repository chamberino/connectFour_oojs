
////!!!!!!!
////!!!!!
/////!!!!!!
// Check game state then draw board
/////!!!!!!
////!!!!!
////!!!!!!!


// global variables
let x = 0;
let y =0;
let currentPosition = x + ', ' + y;
let currentElement;
let firstPosition; 
let p1 = 1;
let p2 = 2;
let turn;
let state;

const makeGrid = () => {
  if (state !== undefined) {
    destroyGrid();
  }
  // const container = document.querySelector('#container');
  const main = document.querySelector('#main');
  const container = document.createElement('DIV');
  main.appendChild(container)
  container.setAttribute('id', "container")
  for (i=5; i>=0; i--) {
    let rowContainer = document.createElement('DIV');
    rowContainer.classList.add('row');
    container.appendChild(rowContainer);
    for (j=0; j<=6; j++) {
      let row = document.createElement('DIV')
      row.classList.add('space')
      rowContainer.appendChild(row);
      let space = document.createElement('P');
      // space.innerHTML = `${j}, ${i}`;
      space.setAttribute('id', `${j}, ${i}`)
      row.appendChild(space)
    }
  }
  firstPosition = document.getElementById("0, 0");
  firstPosition.classList.add('selected');
  currentElement = document.getElementById(`${currentPosition}`);
  state = true;
  turn = p1;
}

const initializeTurn = () => {
  x = 0;
  y = 0;
  firstPosition.classList.add('selected');
}

// makeGrid()

const destroyGrid = () => {
  container.remove();
}

let isMatch = (x, y, player) => {
  let element = document.getElementById(`${x}, ${y}`);
  console.log(element);
  if(element !== null && element.classList.contains(player)) {
    return true
  } else {
    return false
  }
}

let checkForWin = (x, y, player) => {
  if (
    // check across
    isMatch(x+1, y, player)  && isMatch(x+2, y, player) && isMatch(x+3, y, player) ||
    isMatch(x-1, y, player)  && isMatch(x+1, y, player) && isMatch(x+2, y, player) ||
    isMatch(x-2, y, player)  && isMatch(x-1, y, player) && isMatch(x+1, y, player) ||
    isMatch(x-3, y, player)  && isMatch(x-2, y, player) && isMatch(x-1, y, player) 
    ) {
    document.querySelector('#title').innerText = `Player ${turn} Wins!`;  
    document.querySelector('#overlay').style.display = '';
    state = false;
    return true;
  } if (
    //check diagonal right
    isMatch(x+1, y+1, player)  && isMatch(x+2, y+2, player) && isMatch(x+3, y+3, player) ||
    isMatch(x-1, y-1, player)  && isMatch(x+1, y+1, player) && isMatch(x+2, y+2, player) ||
    isMatch(x-2, y-2, player)  && isMatch(x-1, y-1, player) && isMatch(x+1, y+1, player) ||
    isMatch(x-3, y-3, player)  && isMatch(x-2, y-2, player) && isMatch(x-1, y-1, player) 
  ) {
    document.querySelector('#title').innerText = `Player ${turn} Wins!`;  
    document.querySelector('#overlay').style.display = '';
    state = false;
    return true;
  } if (
    // check diagonal left
    isMatch(x-1, y+1, player)  && isMatch(x-2, y+2, player) && isMatch(x-3, y+3, player) ||
    isMatch(x+1, y-1, player)  && isMatch(x-1, y+1, player) && isMatch(x-2, y+2, player) ||
    isMatch(x+2, y-2, player)  && isMatch(x+1, y-1, player) && isMatch(x-1, y+1, player) ||
    isMatch(x+3, y-3, player)  && isMatch(x+2, y-2, player) && isMatch(x+1, y-1, player)
  ) {
    document.querySelector('#title').innerText = `Player ${turn} Wins!`;  
    document.querySelector('#overlay').style.display = '';
    state = false;
    return true;
  } if (
    // check down
    isMatch(x, y-1, player)  && isMatch(x, y-2, player) && isMatch(x, y-3, player) 
  ) {
    document.querySelector('#title').innerText = `Player ${turn} Wins!`;  
    document.querySelector('#overlay').style.display = '';
    state = false;
    return true;
  } else {
    console.log('bummer')
  }
}

firstSlotAvailable = () => {
  // x = 0;
  // y = 0;      
  // currentPosition = x + ', ' + y;
  // currentElement = document.getElementById(`${currentPosition}`);
  for (i=0; i < document.querySelectorAll('.row').length; i++) {
    if (currentElement.classList.contains('p1Taken') || currentElement.classList.contains('p2Taken')) {      
      y += 1
      currentPosition = x + ', ' + y;
      currentElement = document.getElementById(`${currentPosition}`);
      if (currentElement !== null) {
        currentElement.classList.add('selected');
      }  
    }
    else if (!currentElement.classList.contains('p1Taken') || !currentElement.classList.contains('p2Taken')) {
      currentElement.classList.add('selected');
      break;
    }
  }
}

const body = document.querySelector('BODY');

const removeSelect = () => {
  const p = document.querySelectorAll('P');
  for (i=0; i < p.length; i++) {
    p[i].classList.remove('selected')
  }
} 

checkIfTaken = () => {
  if (currentElement.classList.contains('p1Taken') || currentElement.classList.contains('p2Taken')) {
    console.log('yipee')
    return true
  } else {
    return false
  }
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    // move left on left arrow
    if (e.keyCode == '37') {
      if (x > 0) {         
        // if (currentElement == null) {          
        //   x -= 1;
        // }
        y = 0;               
        removeSelect();
        x -= 1;        
        currentPosition = x + ', ' + y;
        currentElement = document.getElementById(`${currentPosition}`);
        currentElement.classList.add('selected');   
        firstSlotAvailable();           
      }
    }
    // move right on right arrow
    else if (e.keyCode == '39') {
      if (x <= 5) {  
        y = 0;      
        removeSelect();
        x += 1;                
        currentPosition = x + ', ' + y;
        currentElement = document.getElementById(`${currentPosition}`);
        currentElement.classList.add('selected');  
        firstSlotAvailable();      
      }    
    }
    // on enter
    if (e.keyCode == '13') {
      if (document.querySelector('#overlay').style.display !== 'none'){
      } else {
      if (turn == 1) {
        removeSelect();
        document.getElementById(`${currentPosition}`).classList.add('p1Taken');
        checkForWin(x, y, 'p1Taken');
        turn = p2;        
      }        
      else if (turn == 2) {        
        removeSelect();
        currentPosition = x + ', ' + y;
        document.getElementById(`${currentPosition}`).classList.add('p2Taken');
        checkForWin(x, y, 'p2Taken');
        turn = p1;
      } 
      x = 0;
      y = 0;      
      currentPosition = x + ', ' + y;
      currentElement = document.getElementById(`${currentPosition}`);
      firstSlotAvailable();
    }
  }
}
// Note: To check for win...
// 
// When a player places a token, check to see if the 4 possible surrounding areas are occupied by that player!