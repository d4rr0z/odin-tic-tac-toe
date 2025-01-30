const gameboard = (() => {
    const board = []
  
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell())
        }
    }
  
    const getBoard = () => board

    const getValuesBoard = () => board.map(row => row.map(cell => cell.getValue()))
  
    const placeMark = (mark, row, col) => {
        if (!board[row][col].getValue()) {
            board[row][col].putMark(mark)
            return true
        }
        return false
    }
  
    const printBoard = () => {
        console.log(getValuesBoard())
    }
  
    return { getBoard, getValuesBoard, placeMark, printBoard }
})()

function Cell() {
    let value = ""

    const putMark = (mark) => {
        value = mark
    }

    const getValue = () => value
  
    return { putMark, getValue }
}
  
const game = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ]
  
    let activePlayer = players[0]
  
    const switchPlayer = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer
  
    const printRound = () => {
        gameboard.printBoard()
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const isThereAWinner = (valuesBoard) => {
        for (let i = 0; i < 3; i++) {
            if (valuesBoard[i][0] && valuesBoard[i].every(cell => cell === valuesBoard[i][0])) {
                return true
            }
            if (valuesBoard[0][i] && valuesBoard.every(row => row[i] === valuesBoard[0][i])) {
                return true
            }
        }
        if (valuesBoard[0][0] && valuesBoard.every((row, index) => row[index] === valuesBoard[0][0])) {
            return true
        }
        if (valuesBoard[0][2] && valuesBoard.every((row, index) => row[2 - index] === valuesBoard[0][2])) {
            return true
        }
        return false
    }
  
    const playRound = (row, col) => {
        if (!isThereAWinner(gameboard.getValuesBoard()) && gameboard.getValuesBoard().flat().includes("")) {
            if (gameboard.placeMark(getActivePlayer().mark, row, col)) {
                if (isThereAWinner(gameboard.getValuesBoard())) {
                    gameboard.printBoard()
                    console.log(`${activePlayer.name} has won!`)
                    return
                } 
                if (!gameboard.getValuesBoard().flat().includes("")) {
                    gameboard.printBoard()
                    console.log("It's a draw!")
                    return
                }
                switchPlayer()
            }
            printRound()
        }
    }

    printRound()
    return { playRound, getActivePlayer }
})()