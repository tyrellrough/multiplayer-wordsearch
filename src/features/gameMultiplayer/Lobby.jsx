import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function Lobby(props) {

    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const gameName = useSelector(state => state.multiPlayerGame.gameName);
    const [playersList, setPlayersList] = useState([]);

    function getPlayersList() {
        props.connection.invoke("GetPlayersAsList", gameGUID).then(r => {
            setPlayersList(r);
        })
    }

    props.connection.on("UpdateGamePlayers", () => {
        getPlayersList();
    })

    //adds the player who calls this method to the game.
    async function addCurrentPlayer() {
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("AddPlayerToGame", gameGUID).then()
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("AddPlayerToGroup", gameGUID).then()
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("RemoveUserFromGroup", "lobby").then()
    }

    useEffect(() => {
        console.log("about to add playuer")
        addCurrentPlayer().then(
            () => {
                getPlayersList();
            }
        )

    }, []);

    //addCurrentPlayer();
    //could be concurrency issues here. Let's just ignore for now.
    //getPlayersList();


    return (
        //need to pass in the connection

        //game name
        //players list
        //can edit your player name and colour
        //a colour for each player
        //start button for the host or player one
        <div>
            <p className="text-3xl">Lobby</p>
            <p>Game Name: {gameName}</p>
            <p>Game GUID: {gameGUID}</p>
            <p className="underline">Players</p>
            {playersList.map((player, index) =>
                <div key={index}>{player.colour}</div>)}
            <button>Start</button>
        </div>
    )
}