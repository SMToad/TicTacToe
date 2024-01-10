import { useState } from "react";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function getActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X')
    currentPlayer = 'O';
  return currentPlayer;
}

function App() {
  //const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);

  let gameBoard = initialBoard;
  for(const turn of gameTurns){
      const {cell, player} = turn;
      const {row, column} = cell;

      gameBoard[row][column] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    let firstCell = gameBoard[combination[0].row][combination[0].column];
    let secondCell = gameBoard[combination[1].row][combination[1].column];
    let thirdCell = gameBoard[combination[2].row][combination[2].column];

    if(firstCell && firstCell == secondCell && firstCell == thirdCell){
      winner = firstCell;
    }
  }

  function handleSelectCell(rowIndex, colIndex){
    //setActivePlayer(currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(currGameTurns => {
      //let currentPlayer = 'X';
      //if(currGameTurns.length > 0 && currGameTurns[0].player === 'X')
       // currentPlayer = 'O';
      let currentPlayer = getActivePlayer(currGameTurns);
      const updatedGameTurns = [
        {
          cell : {row: rowIndex, column: colIndex},
          player: currentPlayer
        },
        ...currGameTurns
      ]

      return updatedGameTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        {winner && <p>You won, {winner}, you gorgeous donut!</p>}
        <GameBoard onSelectCell={handleSelectCell} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
