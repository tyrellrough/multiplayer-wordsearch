import {Fragment, useState} from "react";

export default function PlayerNameChanger(props) {
    const [newName, setNewName] = useState(props.playerName);

    function changeName() {
        props.connection.invoke("UpdatePlayerName", newName, props.gameGuid).then(
        )
    }

    return (
        <div className={"flex flex-col md:flex-row md:gap-2 text-sm"}>
            <input name="playerNameInput" type="text" value={newName}
                   onChange={e => setNewName(e.target.value)}
                    className="border sm:w-fit"

            />
            <button className="" onClick={() => { changeName()
            }}>Update Name</button>
        </div>
    )

}