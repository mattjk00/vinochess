const GRIDSIZE = 8;

/**
 * Represents a game piece. Has a name, position, and set of moves.
 */
class Piece {
    /**
     * Construct a new game piece object. Moves set to empty array
     * @param {String} name - The name of the Piece
     * @param {Number} x - The starting x coordinate of the Piece
     * @param {Number} y - The starting y coordinate of the Piece
     */
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        /** An array of type Move that tells what possible moves the piece can make */
        this.moves = [];
        /** The owner of the pawn. e.g. Player 1 or Player 2 */
        this.owner = -1;
    }
}

/**
 * Represents a possible move that a piece can take.
 * Has the x and y move as well as the one dimensional move for 1d array moevs.
 */
class Move {
    /**
     * Construct a new move object.
     * @param {Number} x - Change in x
     * @param {Number} y - Change in y
     * @param {Number} m - Change in one dimension
     */
    constructor (x, y, m) {
        this.dx = x;
        this.dy = y;
        this.m = m;
    }
}

/**
 * Factory function for creating a new pawn piece. Returns a Piece
 * @param {String} name - Name of Piece
 * @param {Number} x - Starting x position
 * @param {Number} y - Starting y position
 * @param {String} owner - Player owner of this piece.
 */
function newPawn(name, x, y, owner)  {
    let pawn = new Piece(name, x, y);
    let m1 = new Move(0, 1, -GRIDSIZE);
    pawn.moves = [m1];
    pawn.owner = owner;

    return newPawn;
}

module.exports = {
    Piece:Piece,
    Move:Move,
    newPawn:newPawn
}