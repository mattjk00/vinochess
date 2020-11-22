// Imports
import Board from './board.js';
import { newPawn, PIECESIZE } from './pieces.js';

// Constants and Aliases
const IMGPATH = "app/imgs/";
const Loader = PIXI.loader;

// Pixi App Configuration
let app = new PIXI.Application({width: 800, height: 800});
app.renderer.autoResize = true;
document.body.appendChild(app.view);

// Load textures
Loader
    .add("app/imgs/board.png")
    .add("app/imgs/piece1.png")
    .load(setup);

let boardSprite;
let board = new Board();
/**
 * Setup method. Construct game objects.
 */
function setup() {
    boardSprite = createSpriteAndAdd("board.png");

    let ps = addPawn(2, 2, 1);
    
    board.movePiece(ps.gridIndex, 0);

    app.ticker.add(delta => gameLoop(delta));
}

/**
 * Creates a sprite object with a given image path, adds it to the stage,
 * and then returns it.
 * @param {String} tname - The name of the image file
 * @returns {Sprite} Returns the sprite that was added.
 */
function createSpriteAndAdd(tname) {
    // load the sprite
    let sprite = new PIXI.Sprite(
        Loader.resources[IMGPATH + tname].texture
    );
    // add sprite to the stage
    app.stage.addChild(sprite);
    return sprite;
}

/**
 * Creates and adds a new pawn to the game.
 * This includes creating the piece's data and a sprite to represent it.
 * The piece will be added to the game board and the screen.
 * @param {Number} x - Board X coordinate
 * @param {Number} y - Board Y coordinate
 * @param {Number} owner - The owner of the piece
 * @returns {Piece} The data for the game piece created.
 */
function addPawn(x, y, owner) {
    // create the piece object
    let pawnData = newPawn("pawn", x, y, owner);
    // create a sprite to represent the piece
    let pawnSprite = createSpriteAndAdd("piece1.png");
    
    // Move the sprite to the correct position
    pawnSprite.x = x * PIECESIZE;
    pawnSprite.y = y * PIECESIZE;

    // Add a reference to the sprite to the piece's object
    pawnData.sprite = pawnSprite;
    // Add the piece to the board and save the index it was added at.
    pawnData.gridIndex = board.addPiece( pawnData );
    
    return pawnData;
}

function gameLoop(delta) {
    
}