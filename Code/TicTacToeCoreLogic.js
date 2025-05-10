
//variables

let gameTurn = 0

let gameState = [
    0,0,0,
    0,0,0,
    0,0,0
]

// INDEX MAP    INPUT MAP
// 0 | 1 | 2    1 | 2 | 3
// ---------    ---------
// 3 | 4 | 5    4 | 5 | 6
// ---------    ---------
// 6 | 7 | 8    7 | 8 | 9

//Square state - 0 = empty, 1 = X, 2 = 0

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

//clear the board and initialise the game
const initialiseGame = () =>{
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
const checkWinConditions = () => { 
    //find win condition, then check who won
    switch (winConditions.find((c) => compareGridSquares(gameState[c[0]],gameState[c[1]],gameState[c[2]]))){
        case 1:
            //player 1 wins!
            break
        case 2:
            //player 2 wins!
            break
    }

//compare three values and return true if they match and aren't 0
const compareGridSquares = (a,b,c) => {
    if (a === b && a === c && a !== 0){
        return true
    } else {
        return false
    }
}