import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import { useState } from "react";

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
        <GameBoard onSelectCell={handleSelectCell} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
