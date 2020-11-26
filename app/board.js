import {GRIDSIZE, PIECESIZE } from './pieces.js'
//const GRIDSIZE = Pieces.GRIDSIZE;

export default class Board {
    constructor() {
        this.grid = Array(64).fill(0);
    }

    /**
     * Adds a given piece to the grid.
     * @param {Piece} piece - The piece to add 
     * @returns {Number} The array index that it was added at.
     */
    addPiece(piece) {
        let arrayPos = Math.floor(GRIDSIZE * piece.y + piece.x);
        piece.gridIndex = arrayPos;
        this.grid[arrayPos] = piece;

        return arrayPos;
    }

    /**
     * Finds the data for the piece in the grid based on a given sprite reference.
     * @param {Sprite} sprite 
     * @returns The found grid piece or -1 if none was found.
     */
    dataFromSprite(sprite) {
        for (let i = 0; i < this.grid.length; i++) {
            // find the piece that has a reference to the given sprite
            if (Object.is(this.grid[i].sprite, sprite)) {
                return this.grid[i];
            }
        }
        return -1;
    }

    /**
     * Tries to move a piece on the board
     * @param {Number} pi - The piece index in the grid.
     * @param {Number} nx - The new x
     * @param {Number} ny - The new y
     * @param {Number} m - The change in the grid index position
     */
    movePiece(pi, nx, ny, m) {
        // Get the piece and the move for the piece
        let piece = this.grid[pi];
        let move = m;
        
        // TODO: Verify Move

        // Move the piece's data in both dimensions
        piece.x = nx;
        piece.y = ny;
        piece.gridIndex = pi + m;

        // Move the piece's sprite to reflect the move
        piece.sprite.x = piece.x * PIECESIZE;
        piece.sprite.y = piece.y * PIECESIZE;

        // Update the grid with the move
        this.grid[pi + m] = piece;
        this.grid[pi] = 0;
    }
}