import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ColourChanger from "./ColourChanger.jsx";
import PlayerNameChanger from "./PlayerNameChanger.jsx";

export default function Lobby(props) {

    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const gameName = useSelector(state => state.multiPlayerGame.gameName);
    const theme = useSelector(state => state.multiPlayerGame.gameTheme);
    const size = useSelector(state => state.multiPlayerGame.gameSize);

    const [playersList, setPlayersList] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState({});

    function getPlayersList() {
        props.connection.invoke("GetPlayersAsList", gameGUID).then(r => {
            setPlayersList(r);
            console.log(r);
        })
    }

    props.connection.on("UpdateGamePlayers", () => {
        getPlayersList();
    })

    //adds the player who calls this method to the game.
    async function addCurrentPlayer() {
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("AddPlayerToGame", gameGUID).then(
            (newPlayer) => {
                console.log("new player" + newPlayer.name, newPlayer.playerID, newPlayer.colour);
                setCurrentPlayer(newPlayer);
            }
        )
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
        <div>
            <p className="text-3xl">Lobby</p>
            <p>Game Name: {gameName}</p>
            <p>Game GUID: {gameGUID}</p>
            <p>Word Theme: {theme}</p>
            <p>Board Size: {size}</p>
            <p className="underline">Players</p>
            <div>
                <div className="flex justify-center gap-4">
                    <p className="w-40">Player Name</p>
                    <p className="w-40">Player Colour</p>
                    <p className="w-40">Change Colour</p>
                </div>

                <div>
                    {playersList.map((player, index) =>
                        <div key={index} className="flex justify-center gap-4">
                            {currentPlayer.playerID === player.playerID ? <PlayerNameChanger />: <p>{player.name}</p>}
                            <p className="w-40">{player.colour}</p>
                            {currentPlayer.playerID === player.playerID ? <ColourChanger connection={props.connection}
                                                                                         gameGuid={gameGUID}
                                                                                         currentColour={currentPlayer.colour}
                                                                                         currentPlayer={currentPlayer} />: <div className="w-40"></div>}
                        </div>
                    )}
                </div>
            </div>

            <button>Start</button>
        </div>
    )
}