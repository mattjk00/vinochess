import GRIDSIZE, { PIECESIZE } from './pieces.js'
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
        let arrayPos = GRIDSIZE * piece.y + piece.x;
        this.grid[arrayPos] = piece;

        return arrayPos;
    }

    /**
     * Tries to move a piece on the board
     * @param {Number} pi - The piece index in the grid.
     * @param {Number} mi - The move index that the piece will perform.
     */
    movePiece(pi, mi) {
        // Get the piece and the move for the piece
        let piece = this.grid[pi];
        let move = piece.moves[mi];
        
        // TODO: Verify Move

        // Move the piece's data in both dimensions
        piece.x += move.dx;
        piece.y += move.dy;
        piece.gridIndex = pi + move.m;

        // Move the piece's sprite to reflect the move
        piece.sprite.x = piece.x * PIECESIZE;
        piece.sprite.y = piece.y * PIECESIZE;

        // Update the grid with the move
        this.grid[pi + move.m] = piece;
        this.grid[pi] = 0;
    }
}