import { useState } from "react";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function getActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];
  for(const turn of gameTurns){
      const {cell, player} = turn;
      const {row, column} = cell;

      gameBoard[row][column] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, playerNames){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    let firstCell = gameBoard[combination[0].row][combination[0].column];
    let secondCell = gameBoard[combination[1].row][combination[1].column];
    let thirdCell = gameBoard[combination[2].row][combination[2].column];

    if(firstCell && firstCell == secondCell && firstCell == thirdCell){
      winner = playerNames[firstCell];
    }
  }
  return winner;
}

function App() {
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectCell(rowIndex, colIndex){
    setGameTurns(currGameTurns => {
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

  function handleRestart(){
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, newName){
    setPlayerNames(prevNames => {
      return {
        ...prevNames,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol="X" 
            isActive={activePlayer === "X"}
            onChangeName={handleChangePlayerName}/>
          <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === "O"}
            onChangeName={handleChangePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectCell={handleSelectCell} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
