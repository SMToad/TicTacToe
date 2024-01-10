import "./GameBoard.css";

export default function GameBoard({onSelectCell, board}){
    return <ol id="game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerCell, colIndex) => (
                        <li key={colIndex}>
                            <button 
                                onClick={() => onSelectCell(rowIndex, colIndex)}
                                disabled={playerCell!==null}
                                >
                                    {playerCell}
                            </button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
}