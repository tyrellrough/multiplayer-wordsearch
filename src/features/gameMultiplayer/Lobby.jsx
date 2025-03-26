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
import PlayerStatElement from "../gameBoardMultiplayer/PlayerStatElement.jsx";
import PlayerInfo from "./PlayerInfo.jsx";

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

    function updateGames() {
        props.connection.invoke("UpdateGames");
    }

    useEffect(() => {
        if (lobbyState === "newLobby") {
            dispatch(setIsHost(true));
            props.connection.invoke("CreateNewGame", gameGUID, gameName, size, theme).then(
                () => {
                    AddPlayerAndGetPlayers(true).then(() => {
                        updateGames();
                    })
                }
            );
        } else if (lobbyState === "existingLobby") {
            getPlayersList();
            getCurrentPlayer();
        } else {
            AddPlayerAndGetPlayers(false).then()
        }
    }, []);

    async function AddPlayerAndGetPlayers(isHost) {
        addCurrentPlayer(isHost).then(
            () => {
                getPlayersList();
            }
        )
    }


    return (
        <div className="flex justify-center">
            <div className={"flex justify-center pt-1 h-[90vh] sm:w-[70vw] lg:w-[50vw]"}>

                <div className={"flex flex-col justify-between w-[90vw] bg-white border-black border rounded-lg"}>
                    <div className={"flex flex-col gap-4 w-full"}>
                        <div>
                            <p className="text-4xl py-2">Lobby</p>
                            <p>Game Name: {gameName}</p>
                            <p>Word Theme: {theme}</p>
                            <p>Board Size: {size}</p>
                        </div>

                        <div className={"w-full flex flex-col"}>
                            <p className={"text-2xl underline"}>Players</p>
                            <div className={"w-full flex flex-col items-center gap-2 overflow-y-scroll h-56"}>
                                {playersList.map((player, index) =>
                                    <PlayerInfo key={index} currentPlayer={currentPlayer} player={player}
                                                connection={props.connection}
                                                gameGUID={gameGUID} playerNum={index}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={"flex justify-center"}>
                        <StartGameButton connection={props.connection}/>
                    </div>
                </div>


            </div>
        </div>


    )
}
