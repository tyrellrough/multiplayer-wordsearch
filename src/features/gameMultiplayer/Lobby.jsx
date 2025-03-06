import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ColourChanger from "./ColourChanger.jsx";
import PlayerNameChanger from "./PlayerNameChanger.jsx";
import ColouredSquare from "./ColouredSquare.jsx";
import PlayerInfo from "./PlayerInfo.jsx";
import StartGameButton from "./StartGameButton.jsx";
import {
    setCurrentPageState, setCurrentPlayer,
    setCurrentPlayerColour, setIsHost,

} from "./multiPlayerGameSlice.js";
import Colours from "../gameBoard/Colours.js";
import MultiplayerGameOptionsSelector from "../gameOptions/MultiplayerGameOptionsSelector.jsx";

export default function Lobby(props) {

    const lobbyState = useSelector(state => state.multiPlayerGame.lobbyState);
    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const gameName = useSelector(state => state.multiPlayerGame.gameName);
    const size = useSelector(state => state.multiPlayerGame.gameSize);
    const theme = useSelector(state => state.multiPlayerGame.gameTheme);
    //const currentPlayer = useSelector(state => state.multiPlayerGame.currentPlayer);

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
                            <PlayerInfo connection={props.connection}
                                        gameGUID = {gameGUID} player={player}
                            />
                        </div>
                    )}
                </div>
            </div>

            <StartGameButton connection={props.connection} />
        </div>
    )
}
