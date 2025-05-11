
//variables

let gameTurn = 1
let playerTurn = 1
let gameMode = 0

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


//initialise the menu
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
                console.log('---PLAYER VS PLAYER---')
                initialisePvPGame()
                break
            case ('2'):
                console.log('---PLAYER VS AI---')
                initialisePvEGame()
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

//clears the game variables ready to play a new round
const resetGame = () => {
    gameTurn = 1
    gameState = [0,0,0,0,0,0,0,0,0]
}

//clear the board and initialise the game for Player vs Player
const initialisePvPGame = () =>{
    resetGame()
    gameMode = 1
    turn()
}

//clear the board and initialise the game for Player vs AI
const initialisePvEGame = () =>{
    resetGame()
    gameMode = 2
    turn()
}

//turn logic
const turn = () => {
    displayBoard()
    switch (checkTurn()){
        case 1:
            //Player 1's Turn
            console.log("It is Player 1's turn")
            console.log("select an empty spot on the grid")
            getPlayerInput(checkTurn())
            break
        case 2:
            switch (gameMode){
                case 1:
                    //Player 2's Turn if playing against another player
                    console.log("It is Player 2's turn")
                    console.log("select an empty spot on the grid")
                    getPlayerInput(checkTurn())
                    break
                case 2:
                    //AI's turn
                    break
            }
    }
    
}

const getPlayerInput = (player) => {
    readline.question('Your selection: ', selection =>{
        //clean selection and adjust from displayState to internal gameState
        selection.trim()
        selection = selection -1
        if (selection >= 0 && selection <= 9){
            //valid input
            //check if selection is already taken
            if (gameState[selection] == 0){
                //position is empty
                //write new game state
                if (player == 1) {
                    gameState[selection] = 'X'
                } else {
                    gameState[selection] = 'O'
                }
                //check for win
                let winner = checkWinConditions()
                switch (winner){
                    case 1:
                        break
                    case 2:
                        break
                    default:
                        break
                }
                //next turn
                gameTurn++
                turn()
            } else {
                //position is already taken
                console.log('---SELECTION ALREADY TAKEN---')
                turn()
            }
        } else {
            //invalid input
            console.log("---INVALID INPUT---")
            turn()
        }
    })
}


//Display a visual depiction of the game state
const displayBoard = () => {
    //translate from state to symbol
    let displayState = [...gameState]
    for (let i = 0; i < 9; i++) {
        switch (displayState[i]) {
            case 0:
                //empty space - populate with number corresponding to selection input
                displayState[i] = (i +1).toString()
                break
            case 1:
                //Player 1 space - X
                displayState[i] = 'X'
                break
            case 2:
                //Player 2 space - O
                displayState[i] = 'O'
                break
        }
    }
    //print the final display
    
    console.log(displayState[6],displayState[7],displayState[8])
    console.log(displayState[3],displayState[4],displayState[5])
    console.log(displayState[0],displayState[1],displayState[2])
}

const checkTurn = () => {
    if (gameTurn % 2 != 0) {
        //odd gameTurn - Player 1
        return 1
    } else {
        //even gameTurn - Player 2
        return 2
    }
}

//call at the end of the turn to see if the player has won
const checkWinConditions = () => {
    //find win condition, then check who won
    for (let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i]
        if (compareGridSquares(gameState[condition[0]], gameState[condition[1]], gameState[condition[2]])) {
            let winner = gameState[condition[0]]
            switch (winner) {
                case 1:
                    console.log("Player 1 wins!");
                    return 1
                case 2:
                    console.log("Player 2 wins!");
                    return 2
        
            }
        }
    }
    //if no win condition found return 0
    return 0
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