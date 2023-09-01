const gameBoard = document.querySelector('#gameBoard')
const infoDisplay = document.querySelector('#info')
const restartBtn = document.querySelector('#restart')

restartBtn.addEventListener('click', () => {
  location.reload()
})

const startCells = ['', '', '', '', '', '', '', '', '']
let go = 'circle'
infoDisplay.textContent = 'Circle goes first'

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellEL = document.createElement('div')
    cellEL.classList.add('square')

    cellEL.id = index
    cellEL.addEventListener('click', addGo)

    gameBoard.append(cellEL)
  })
}

createBoard()

function addGo(e) {
  const goDisplay = document.createElement('div')
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === 'circle' ? 'cross' : 'circle'
  infoDisplay.textContent = `it is now ${go}'s go.`
  e.target.removeEventListener('click', addGo)
  checkScore()
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square')
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  console.log(allSquares[4])

  winningCombos.forEach((arr) => {
    const circleWins = arr.every((cell) =>
      allSquares[cell].firstChild?.classList.contains('circle')
    )
    if (circleWins) {
      infoDisplay.textContent = 'Circle Wins!'
      allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)))
      restartBtn.style.display = 'block'
      return
    }
  })

  winningCombos.forEach((arr) => {
    const crossWins = arr.every((cell) =>
      allSquares[cell].firstChild?.classList.contains('cross')
    )
    if (crossWins) {
      infoDisplay.textContent = 'Cross Wins!'
      allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)))
      restartBtn.style.display = 'block'
      return
    }
  })
}
