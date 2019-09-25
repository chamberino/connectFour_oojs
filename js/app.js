// VARIABLES
let startButton = document.querySelector('#btn__reset');
let game;

function startGame() {
    game = new Game();
    game.startGame();
}

startButton.addEventListener('click', () => {
    startGame();
})

window.addEventListener('keypress', (e)=> {
    if(document.querySelector('#overlay').style.display === "") {
      if (e.keyCode == '13') {
        // startGame();
      }
    }
  })