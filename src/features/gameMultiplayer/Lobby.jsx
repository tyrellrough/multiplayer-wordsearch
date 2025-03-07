import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ColourChanger from "./ColourChanger.jsx";
import PlayerNameChanger from "./PlayerNameChanger.jsx";
import ColouredSquare from "./ColouredSquare.jsx";
import PlayerColourInfo from "./PlayerColourInfo.jsx";
import StartGameButton from "./StartGameButton.jsx";
import {
    setCurrentPageState, setCurrentPlayer,
    setCurrentPlayerColour, setIsHost,

} from "./multiPlayerGameSlice.js";
import Colours from "../gameBoard/Colours.js";

export default function Lobby(props) {

    const lobbyState = useSelector(state => state.multiPlayerGame.lobbyState);
    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const gameName = useSelector(state => state.multiPlayerGame.gameName);
    const size = useSelector(state => state.multiPlayerGame.gameSize);
    const theme = useSelector(state => state.multiPlayerGame.gameTheme);
    const currentPlayer = useSelector(state => state.multiPlayerGame.currentPlayer);

    const dispatch = useDispatch();
    const colours = new Colours();

    const [playersList, setPlayersList] = useState([]);
    //const [currentPlayer, setCurrentPlayer] = useState({});

    function getPlayersList() {
        props.connection.invoke("GetPlayersAsList", gameGUID).then(r => {
            setPlayersList(r);
            console.log(r);
        })
    }

    props.connection.on("UpdateGamePlayers", () => {
        getPlayersList();
    })

    props.connection.on("UpdateCurrentPlayer", () => {
        getCurrentPlayer();
    })

    //adds the player who calls this method to the game.
    async function addCurrentPlayer(isHost) {
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("AddPlayerToGame", gameGUID, isHost).then(
            (newPlayer) => {
                console.log("new player" + newPlayer.name, newPlayer.playerID, newPlayer.colour);
                dispatch(setCurrentPlayerColour(colours.convertColourNameToRGBA(newPlayer.colour)));
                dispatch(setCurrentPlayer(newPlayer));
            }
        )
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("AddPlayerToGroup", gameGUID).then()
        // eslint-disable-next-line react/prop-types
        props.connection.invoke("RemoveUserFromGroup", "lobby").then()
    }

    props.connection.on("StartGame", () => {
        dispatch(setCurrentPageState("game"))
    })

    function getCurrentPlayer() {
        props.connection.invoke("GetCurrentPlayer", gameGUID).then(player => {
            console.log("currentplayer", player)
            dispatch(setCurrentPlayer(player));
        })
    }

    useEffect(() => {
        if(lobbyState === "newLobby") {
            dispatch(setIsHost(true));
            props.connection.invoke("CreateNewGame", gameGUID, gameName, size, theme).then(
                () => {
                    AddPlayerAndGetPlayers(true);
                }
            );
        } else if(lobbyState === "existingLobby") {
            getPlayersList();
            getCurrentPlayer();
        }
        else {
            AddPlayerAndGetPlayers(false);
        }
    }, []);

    function AddPlayerAndGetPlayers(isHost) {
        addCurrentPlayer(isHost).then(
            () => {
                getPlayersList();
            }
        )
    }


    return (
        <div className={"h-5/6 flex flex-col justify-between items-center w-full"}>
            <div className={"flex flex-col gap-4 w-full"}>
                <div>
                    <p className="text-4xl py-2">Lobby</p>
                    <p>Game Name: {gameName}</p>
                    <p>Game GUID: {gameGUID}</p>
                    <p>Word Theme: {theme}</p>
                    <p>Board Size: {size}</p>
                </div>

                <div className={""}>
                    <p className={"text-2xl underline"}>Players</p>
                    <div className={"w-full flex justify-evenly"}>

                        <div className={"flex flex-col"}>

                            <p>Name</p>
                            {playersList.map((player, index) =>
                                <div key={index} className="flex h-10 gap-2 justify-center items-center">
                                    {currentPlayer.playerID === player.playerID ?
                                        <PlayerNameChanger connection={props.connection} playerName={player.name}
                                                           gameGuid={gameGUID}
                                        /> : <p>{player.name}</p>}

                                </div>
                            )}

                        </div>

                        <div className={"flex flex-col"}>
                            <p>Colour</p>
                            {playersList.map((player, index) =>
                                <div key={index} className="flex h-10 gap-2 justify-evenly items-center">
                                    <PlayerColourInfo connection={props.connection} player={player}/>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div className={"w-1/4"}>
                <StartGameButton connection={props.connection}/>
            </div>

        </div>
    )
}
