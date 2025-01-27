function Gameboard() {
    const board = []
  
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell())
        }
    }
  
    const getBoard = () => board
  
    const placeMark = (mark, row, col) => {
        if (board[row][col].getValue() === "") {
            board[row][col].putMark(mark)
            return true
      }
      return false
    }
  
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
  
    return { getBoard, placeMark, printBoard }
}

function Cell() {
    let value = ""

    const putMark = (mark) => {
        value = mark
    }

    const getValue = () => value
  
    return { putMark, getValue }
}
  
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
  
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
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer
  
    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const didSomebodyWon = (board) => {
        const valuesBoard = board.map(row => row.map(cell => cell.getValue()))

        for (let i = 0; i < 3; i++) {
            if (valuesBoard[i][0] != "" && valuesBoard[i].every(cell => cell === valuesBoard[i][0])) {
                return true
            }

            if (valuesBoard[0][i] != "" && valuesBoard.every(row => row[i] === valuesBoard[0][i])) {
                return true
            }
        }

        if (valuesBoard[0][0] != "" && valuesBoard.every((row, index) => row[index] === valuesBoard[0][0])) {
            return true
        }

        if (valuesBoard[0][2] != "" && valuesBoard.every((row, index) => row[2 - index] === valuesBoard[0][2])) {
            return true
        }

        return false
    }
  
    const playRound = (row, col) => {
        if (!didSomebodyWon(board.getBoard()) && !board.getBoard().flat().every(cell => cell.getValue() != "")) {
            if (board.placeMark(getActivePlayer().mark, row, col)) {
                
                if (didSomebodyWon(board.getBoard())) {
                    board.printBoard()
                    console.log(`${activePlayer.name} has won!`)
                    return
                } 
                
                if (board.getBoard().flat().every(cell => cell.getValue() != "")) {
                    board.printBoard()
                    console.log("It's a draw!")
                    return
                }

                switchPlayerTurn()
            }

            printNewRound()
        }
    }
  
    printNewRound()
  
    return { playRound, getActivePlayer }
}
  
const game = GameController();