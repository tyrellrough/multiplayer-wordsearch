import {Fragment, useState} from "react";

export default function PlayerNameChanger(props) {
    const [newName, setNewName] = useState(props.playerName);

    function changeName() {
        props.connection.invoke("UpdatePlayerName", newName, props.gameGuid).then(
        )
    }

    return (
        <Fragment>
            <input name="playerNameInput" type="text" value={newName}
                   onChange={e => setNewName(e.target.value)}
                    className="border"
            />
            <button onClick={() => { changeName()
            }}>Update Name</button>
        </Fragment>
    )

}