const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({onSelectCell, turns}){
    let gameBoard = initialBoard;
    for(const turn of turns){
        const {cell, player} = turn;
        const {row, col} = cell;

        gameBoard[row][col] = player;
    }
   /*  const [gameBoard, setGameBoard] = useState(initialBoard);

    function handleSelectCell(rowIndex, colIndex){
        setGameBoard(prevGameBoard => {
            const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedGameBoard;
        });
        onSelectCell();
    } */

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerCell, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectCell(rowIndex, colIndex)}>{playerCell}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>
}