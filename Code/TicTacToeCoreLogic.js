
//variables

let playerTurn = true
let gameTurn = 0

let gameState = [ ]



// INDEX MAP    INPUT MAP
// 0 | 1 | 2    1 | 2 | 3
// ---------    ---------
// 3 | 4 | 5    4 | 5 | 6
// ---------    ---------
// 6 | 7 | 8    7 | 8 | 9

//Square state - 0 = empty, 1 = X, 2 = 0
let gameSquares = [
    {squareNo:0, state:0},
    {squareNo:1, state:0},
    {squareNo:2, state:0},
    {squareNo:3, state:0},
    {squareNo:4, state:0},
    {squareNo:5, state:0},
    {squareNo:6, state:0},
    {squareNo:7, state:0},
    {squareNo:8, state:0}
]

let winConditions = [
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,5],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
]

//clear the board and reset the game
const reset = () =>{
    playerTurn = true
    gameTurn = 0
    gameSquares.forEach(square => {
        square.state = 0
    });
    console.log(playerTurn, gameTurn, gameSquares)
}

//turn logic
const turn = () => {}

//call at the end of the turn to see if the player has won
const checkWinConditions = () => {}
