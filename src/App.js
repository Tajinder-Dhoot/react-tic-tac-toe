import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function Board() {
const [squares, setSquares] = useState(Array(9).fill(null));
const [isXNext, setIsXNext] = useState(true);
const [turnsLeft, setTurnsLeft] = useState(9);

console.log("turns left: " +turnsLeft);
const status = displayStatus(squares, turnsLeft, isXNext);

// const winner = calculateWinner(squares);
// let status;

// console.log("turns left: " +turnsLeft)

// if(winner) {
//   status = "Winner: " +winner;
// }
//  else {
//   status = "Next Player: " + (isXNext? "X" : "O");
// }

function handleClick(i) {
  /**
   * return -> if squares index has some value
   * execute the code block if the value is null or undefined
   */
  console.log('square ' + i + ' clicked!')

  if(squares[i] || status.toLowerCase().includes("winner")) {
    return;
  }

  const nextSquares = squares.slice();
  if(isXNext) {
    nextSquares[i] = 'X';
  }
  else {
    nextSquares[i] = 'O';
  }
  setSquares(nextSquares);
  setIsXNext(!isXNext);
  setTurnsLeft(turnsLeft - 1);
}

  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={function () { handleClick(0)}} />
        <Square value={squares[1]} onSquareClick={function () { handleClick(1)}} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <h1>Game Steps</h1>
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  console.log("calculate winner func is called");
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    // console.log("a: " +a)
    // console.log("b: " +b)
    // console.log("c: " +c)

    if(squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a];
    }
  }

  return null;
}

function displayStatus(squares, turnsLeft, isXNext) {
  let winner = null;
  let status;
  if(turnsLeft <= 4) {
    winner = calculateWinner(squares);
  }
  if(winner) {
    status = "Winner: " +winner;
  }
   else {
    status = "Next Player: " + (isXNext? "X" : "O");
  }

  return status;
}
