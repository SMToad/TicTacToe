import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectCell(){
    setActivePlayer(currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>

        <GameBoard onSelectCell={handleSelectCell} activePlayerSymbol={activePlayer}/>
      </div>
      logger
    </main>
  )
}

export default App
