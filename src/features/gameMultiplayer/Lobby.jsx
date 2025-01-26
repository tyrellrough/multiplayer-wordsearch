import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function Lobby(props) {

    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const gameName = useSelector(state => state.multiPlayerGame.gameName);
    const [playersElementsList, setPlayersElementsList] = useState();

    function getPlayersList() {
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("GetPlayersAsList", gameGUID).then(r => {
            console.log(r);
            const playersElements = () => {
                const players = r.map((player) =>
                    <div key={player.colour}>{player.colour}</div>
                )
                return <div>{players}</div>
            }
            //console.log(playersElements())
            console.log(playersElements);
            setPlayersElementsList(playersElements());
        })
    }

    props.connection.on("", () => {
        UpdateNumPagesAndGames();
    })

    //adds the player who calls this method to the game.
    function addCurrentPlayer() {
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("AddPlayerToGame", gameGUID).then()
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("AddPlayerToGroup", gameGUID).then()
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("RemoveUserFromGroup", "lobby").then()
    }

    useEffect(() => {
        addCurrentPlayer();
        getPlayersList();
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
            {playersElementsList}
            <button>Start</button>
        </div>
    )
}