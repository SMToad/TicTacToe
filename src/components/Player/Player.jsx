import './Player.css'
import { useState } from 'react';

export default function Player({initialName, symbol, isActive}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick()
    {
        setIsEditing(editing => !editing);
    }

    function handlechange(event)
    {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = isEditing?
        <input type='text' required value={playerName} onChange={handlechange}/>
        :
         <span className="player-name">{playerName}</span>;
    let btnCaption = isEditing ? "Save" : "Edit";

    return (
        <li className={isActive? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
          </li>
    );
}