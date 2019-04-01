class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

  get activePlayer() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].active) {
        return this.players[i];
      }
    }
  }

  /**
   * Creates two player objects
   * @return  {array}    An array of two player objects.
   */
  createPlayers() {
    const players = [new Player('Player 1', 1, '#e15258', true),
      new Player('Player 2', 2, '#e59a13')
    ];
    return players;
  }

  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  handleKeyDown(event) {
    if (this.ready) {
      if (event.key === "ArrowLeft") {
        this.activePlayer.activeToken.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (event.key === "ArrowDown") {
        this.playToken();
      }
    }
  }

  playToken() {
    // const currentColumn = this.board.spaces[this.activePlayer.activeToken.columnLocation];
    // const game = this;
    // let target = null;
    // for (let i = 0; i < currentColumn.length; i++) {
    //   if (currentColumn[i].token === null) {
    //     target = currentColumn[i];
    //   }
    // }
    //
    // if (target !== null) {
    //   this.ready = false;
    //   this.activePlayer.activeToken.drop(target, function(){
    //     //callback function code
    //     game.updateGameState(game.activePlayer.activeToken, target)
    //   });
    // }
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }

    if (targetSpace !== null) {
      const game = this;
      game.ready = false;

      activeToken.drop(targetSpace, function() {
        game.updateGameState(activeToken, targetSpace);
      });
    }
  }

  checkForWin(target) {
    const owner = target.token.owner;
    let win = false;

    // vertical
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x][y + 1].owner === owner &&
          this.board.spaces[x][y + 2].owner === owner &&
          this.board.spaces[x][y + 3].owner === owner) {
          win = true;
        }
      }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y].owner === owner &&
          this.board.spaces[x + 2][y].owner === owner &&
          this.board.spaces[x + 3][y].owner === owner) {
          win = true;
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y + 1].owner === owner &&
          this.board.spaces[x - 2][y + 2].owner === owner &&
          this.board.spaces[x - 3][y + 3].owner === owner) {
          win = true;
        }
      }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y - 1].owner === owner &&
          this.board.spaces[x - 2][y - 2].owner === owner &&
          this.board.spaces[x - 3][y - 3].owner === owner) {
          win = true;
        }
      }
    }

    return win;
  }

  switchPlayers() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].active) {
        this.players[i].active = false;
      } else {
        this.players[i].active = true;
      }
    }
  }

  gameOver(message) {
    const gameOverDiv = document.getElementById("game-over");
    gameOverDiv.textContent = message;
    gameOverDiv.style.display = "block";
  }

  updateGameState(token, target) {
    target.mark(token);
    if (this.checkForWin(target)) {
      this.gameOver(`${target.owner.name} wins!`);
    } else {
      this.switchPlayers();
      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
      } else {
        this.gameOver("No more tokens");
      }
    }
  }
}
