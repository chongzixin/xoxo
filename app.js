const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const SELECTED_CLASS = 'selected'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const instructions = document.getElementById('instructions')
const header = document.getElementById('header')

let circleTurn
let gameEnded
let unmarkedCells

addEventListeners()
startGame()

function startGame() {
  header.innerText = "Hello, Arthur"
  header.style.color = "var(--primary-color)"
  instructions.innerText = "Use the arrow keys (↑, ↓, ←, →) then press Enter to confirm position. Press End to restart";
  
  circleTurn = false
  gameEnded = false
  unmarkedCells = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  
  cellElements.forEach((cell, index) => {
    cell.classList.remove(...[SELECTED_CLASS, CIRCLE_CLASS, X_CLASS])
    cell.addEventListener('click', handleClick, { once: true })
    
    if(index === 0) cell.classList.add(SELECTED_CLASS)
  })
  setBoardHoverClass(true)
}

function endGame(draw) {
  header.innerText = draw ? 'Draw!' : `${circleTurn ? "O" : "X"} Wins!`
  instructions.innerText = "Press any key to restart"
  gameEnded = true
  freezeBoard()
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function swapTurns() {
  circleTurn = !circleTurn
  header.innerText = circleTurn ? "O's turn" : "X's turn"
  header.style.color = circleTurn ? "var(--o-color-set)" : "var(--x-color-set)"
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function setBoardHoverClass(visible) {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (visible) {
    // show hovering depending on whose turn
    circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS)
  }
}

function freezeBoard() {
  // remove all event listeners on cell and disable hovering
  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleClick)
  })
  setBoardHoverClass(false)
}

function handleClick(e) {
  // if we came from a pointer event, set to its target. else it came from keyboard event so use it directly
  cell = e instanceof PointerEvent ? e.target : e
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    unmarkedCells = unmarkedCells.filter(value => value != cell.id) // remove this index from list of remaining cells
    setBoardHoverClass(true)
    toggleActive(cell.id, Math.min(...unmarkedCells))
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function addEventListeners() {
  window.onkeydown = ev => {
    if(ev.defaultPrevented) return
    processKeys(ev.key)
    
    function processKeys(key) {
      if(gameEnded) startGame()
      
      const currentIndex = document.getElementsByClassName(SELECTED_CLASS)[0].id
      let newIndex
      
      if(key === "ArrowUp" && !["0", "1", "2"].includes(currentIndex)) {
        newIndex = +currentIndex - 3;
        toggleActive(currentIndex, newIndex);
      }
      else if(key === "ArrowDown" && !["6", "7", "8"].includes(currentIndex)) {
        newIndex = +currentIndex + 3;
        toggleActive(currentIndex, newIndex);
      }
      else if(key === "ArrowLeft" && !["0", "3", "6"].includes(currentIndex)) {
        newIndex = +currentIndex - 1;
        toggleActive(currentIndex, newIndex);
      }
      else if(key === "ArrowRight" && !["2", "5", "8"].includes(currentIndex)) {
        newIndex = +currentIndex + 1;
        toggleActive(currentIndex, newIndex);
      }
      else if(key === "Enter") {
        const currentCell = document.getElementById(currentIndex)
        handleClick(currentCell)
      }
      else if(key === "r" || key === "End") {
        // if user presses R or End, reset game
        // we use End to provide convenience to users because it's near the arrow keys on the keyboard.
        startGame()
      }
    }
  }
}

function toggleActive(cellToRemove, cellToAdd) {
  document.getElementById(cellToRemove.toString()).classList.remove(SELECTED_CLASS);
  document.getElementById(cellToAdd.toString()).classList.add(SELECTED_CLASS);
}