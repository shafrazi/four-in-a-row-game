class Board {
  constructor() {
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createSpaces();
  }

  /**
   * Generates 2D array of spaces.
   * @return  {array}     An array of space objects
   */
  createSpaces() {
    const spaces = [];

    for (let x = 0; x < this.columns; x++) {
      const col = [];
      for (let y = 0; y < this.rows; y++) {
        const space = new Space(x, y);
        col.push(space);
      }
      spaces.push(col);
    }
    return spaces;
  }

  drawHTMLBoard() {
    for (let i = 0; i < this.spaces.length; i++) {
      for (let x = 0; x < this.spaces[i].length; x++) {
        this.spaces[i][x].drawSVGSpace();
      }
    }
  }
}
