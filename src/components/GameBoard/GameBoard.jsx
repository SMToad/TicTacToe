import { useState } from "react";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({onSelectCell, activePlayerSymbol}){
    const [gameBoard, setGameBoard] = useState(initialBoard);

    function handleSelectCell(rowIndex, colIndex){
        setGameBoard(prevGameBoard => {
            const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedGameBoard;
        });
        onSelectCell();
    }

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerCell, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => handleSelectCell(rowIndex, colIndex)}>{playerCell}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
}