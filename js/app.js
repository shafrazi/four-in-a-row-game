const game = new Game();

$("#begin-game").click(function(){
  game.startGame();
  this.style.display = "none";
  document.getElementById('play-area').style.opacity = '1';
})

document.addEventListener("keydown", function(event){
  game.handleKeyDown(event);
})
