// Imports
import Board from './board.js';
import { newPawn, PIECESIZE, GRIDSIZE } from './pieces.js';

// Constants and Aliases
const IMGPATH = "app/imgs/";
const Loader = PIXI.loader;
const IDLE = 0;
const MOVECHOICE = 1;

// Pixi App Configuration
let app = new PIXI.Application({width: 800, height: 800});
app.renderer.autoResize = true;
document.body.appendChild(app.view);

let gameState = IDLE;
let pieceSelected;

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
    boardSprite.interactive = true;
    boardSprite.on('mousedown', boardClicked);
    boardSprite.on('touchstart', boardClicked);

    let ps = addPawn(2, 2, 1);
    
    //board.movePiece(ps.gridIndex, 0, 0, 0);

    app.ticker.add(delta => gameLoop(delta));
}

/**
 * Called when a game piece is clicked.
 * @param {EventData} e 
 */
function pieceClicked(e) {
    // if in idle state before click
    if (gameState == IDLE) {
        // get the piece data for the sprite that was clicked
        pieceSelected = board.dataFromSprite(e.target);
        // if the data was found
        if (pieceSelected != -1) {
            // enter moving selection state.
            gameState = MOVECHOICE;
        }
    }
    
}

/**
 * Is called when the game board is clicked.
 * @param {EventData} e 
 */
function boardClicked(e) {
    // convert the mouse coordinates to 8x8 grid coordinates.
    let gridX = Math.floor(e.data.global.x/80);
    let gridY = Math.floor(e.data.global.y/80);
    // if the user is in moving state
    if (gameState == MOVECHOICE) {
        // find the difference in the clicked place to move and the current piece's position
        let moveX = gridX - pieceSelected.x;
        let moveY = gridY - pieceSelected.y;
        // convert the 2D move to a 1D move
        let move = (moveY * GRIDSIZE + moveX);
        // move the selected piece
        board.movePiece(pieceSelected.gridIndex, gridX, gridY, move);
        // return to idle gamestate
        gameState = IDLE;
    }
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
    pawnSprite.interactive = true;
    pawnSprite.on('mousedown', pieceClicked);
    pawnSprite.on('touchstart', pieceClicked);
    
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