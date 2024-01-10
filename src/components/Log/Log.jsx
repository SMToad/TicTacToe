import "./Log.css";

export default function Log({turns}){
    return <ol id="log">
        {turns.map(({cell, player}) => (
            <li key={`${cell.row}${cell.column}`}>
                Player {player} places on cell [{cell.row}, {cell.column}]
                
            </li>
        ))}
    </ol>
}