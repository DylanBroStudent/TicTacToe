
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
// 0 | 1 | 2    7 | 8 | 9 
// ---------    ---------
// 3 | 4 | 5    4 | 5 | 6
// ---------    ---------
// 6 | 7 | 8    1 | 2 | 3


//win conditions are a nested array/matrix
let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
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
                gameMode = 1
                resetGame()
                turn()
                break
            case ('2'):
                console.log('---PLAYER VS AI---')
                gameMode = 2
                resetGame()
                turn()
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

//turn logic
const turn = () => {
    displayBoard()
    if (gameTurn > 9){
        //game board is full - draw
        console.log('---GAME DRAW---')
        initialiseMenu()
    } else {
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
                    console.log("It's the AI's turn")
                    getRandomInput()
                    break
            }
        }
    }
}

const getRandomInput = () => {
    //first find valid moves
    let emptySquares = []
    for (let i = 0; i < gameState.length; i++){
        if (gameState[i] === 0) {
            emptySquares.push(i)
        }
    }
    //select a random valid move
    let randomMove = Math.floor(Math.random() * emptySquares.length)
    let selection = emptySquares[randomMove]
    //write new game state
    gameState[selection] = 2
    console.log('AI has selected:', selection + 1)

    //check for win
    let winner = checkWinConditions()
    switch (winner) {
        case 2:
            //AI wins
            displayBoard()
            console.log('---AI WINS---')
            initialiseMenu()
            break
        default:
            //no win - next turn
            gameTurn++
            turn()
            break
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
                    gameState[selection] = 1
                } else {
                    gameState[selection] = 2
                }
                //check for win
                let winner = checkWinConditions()
                switch (winner){
                    case 1:
                        //Player 1 wins
                        displayBoard()
                        console.log('---PLAYER 1 WINS---')
                        initialiseMenu()
                        break
                    case 2:
                        //Player 2 wins
                        displayBoard()
                        console.log('---PLAYER 2 WINS---')
                        initialiseMenu()
                        break
                    default:
                        //next turn
                        gameTurn++
                        turn()
                        break
                }
                
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
        //establish variables
        let condition = winConditions[i]
        let a = gameState[condition[0]]
        let b = gameState[condition[1]]
        let c = gameState[condition[2]]
        //compare three values and return the value if they match and aren't 0
        if (a !== 0 && a === b && a === c){
            return a
        }
    }
    //if no win condition found return 0
    return 0
}

//------------//

//Initialisation
initialiseMenu()

//------------//