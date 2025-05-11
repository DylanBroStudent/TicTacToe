
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


//win conditions are a nested array/matrix
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

//set up readline from node to allow input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


//reset and initialise the menu
//called at the start of the program
const initialiseMenu = () => {
    console.log('---MAIN MENU---')
    console.log('1 : Player vs Player')
    console.log('2 : Player vs AI')
    console.log('3 : Quit')
    readline.question('Your selection: ', selection => {
        selection = selection.trim()
        switch (selection) {
            case ('1'):
                readline.close()
                break
            case ('2'):
                readline.close()
                break
            case ('3'):
                console.log('---QUITTING GAME---')
                readline.close()
                break
            default:
                console.log('---INVALID SELECTION---')
                initialiseMenu()
                break
        }
    })
}




//clear the board and initialise the game
const initialiseGame = () =>{
    gameTurn = 0
    gameState = [0,0,0,0,0,0,0,0,0]
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
}

//compare three values and return true if they match and aren't 0
const compareGridSquares = (a,b,c) => {
    if (a === b && a === c && a !== 0){
        return true
    } else {
        return false
    }
}



//------------//

//Initialisation
initialiseMenu()

//------------//