
//variables
let playerTurn = true
let gameTurn = 0
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
    {squareNo:8, state:0},
    {squareNo:9, state:0}
]

//clear the board and reset the game
function reset(){
    playerTurn = true
    gameTurn = 0
    gameSquares.forEach(square => {
        square.state = 0
    });
    console.log(playerTurn, gameTurn, gameSquares)
}

//turn logic
function turn(){

}

//call at the end of the turn to see if the player has won
function checkWinConditions(){
    
}
