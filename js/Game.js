// Check game state then draw board

class Game {
    constructor() {
        // x, y coordinates
        this.x = 0;
        this.y = 0;
        // Tracks the current position selected
        this.currentPosition = this.x + ', ' + this.y;
        // Tracks the current element
        this.currentElement;
        // p1 and p2 hold numeric values representing the players
        this.p1 = 1;
        this.p2 = 2;
        // Tracks the current players turn
        this.turn = this.p1;
        // Initial position
        this.firstPosition = document.getElementById(`${this.x}, ${this.y}`);
        // Tracks state of game i.e. whether or not a game is in play
        this.state;
    }

    //Hides the #overlay start screen, sets the acticePhrase to a random phrase from the phrases array, then adds it to the screen.
  startGame() {
    document.querySelector('#overlay').style.display = 'none';
    makeGrid();
  }
}

