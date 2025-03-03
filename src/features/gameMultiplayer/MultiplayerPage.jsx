//server side
//use game manager to create a new game instance.

//information
//game name
//game players
//game guid


// This component contains the lobby,
// the game itself, lobby list and the signalR connection to the server.
import {Fragment, useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {useDispatch, useSelector} from "react-redux";
import {setGameGUID, setGameName, setGameSize, setWordsTheme} from "./multiPlayerGameSlice.js";
import Lobby from "./Lobby.jsx";
import JoinGameList from "./JoinGameList.jsx";
import {setGameGuid} from "../gameOptions/gameOptionsSlice.js";
import {useGetWordsByCategoryQuery} from "../../services/wordSearchAPI.js";
import WordSP from "../gameBoard/WordSP.js";
import GameContainerMultiplayer from "./GameContainerMultiplayer.jsx";

export default function MultiplayerPage() {



    const pageState = useSelector(state => state.multiPlayerGame.currentPageState);
    const lobbyState = useSelector(state => state.multiPlayerGame.lobbyState);

    //const connectionState = useSelector(state => state.multiPlayerGame.connectionState);
    const [connectionState, setConnectionState] = useState("unconnected");
    const dispatch = useDispatch();

    const gameGUID = useSelector(state => state.gameOptions.gameGuid);
    const gameName = useSelector(state => state.gameOptions.gameName);
    const gameSize = useSelector(state => state.gameOptions.puzzleSize);
    const theme = useSelector(state => state.gameOptions.wordsCategory);

    const [connection] = useState(new HubConnectionBuilder()
        .withUrl("https://localhost:7033/Game")
        .build())



    //const [IsGameGenerated, setIsGameGenerated] = useState(false);

    useEffect(() => {
        if(connectionState === "unconnected") {
            connection.start().then(() => setConnectionState("connected"))
        }
    }, [connection, connectionState])

    if(connectionState !== "connected") {
        return(
            <div>
                <p>Waiting for connection to establish</p>
            </div>
        )
    } else if(pageState === "gamesList") {
        return(
            <Fragment>
                <JoinGameList connection={connection}/>
            </Fragment>
        )
    } else if(pageState === "lobby") {
        console.log("page state is lobby")
        //add user to group named the guid
        //connection.invoke("RemoveFromGroup", "lobby").then()

        //if its a new lobby add the lobby to the server
        if(lobbyState === "newLobby") {
            console.log("lobby state is new lobby")
            dispatch(setGameName(gameName));
            dispatch(setGameGUID(gameGUID));
            dispatch(setGameSize(gameSize));
            dispatch(setWordsTheme(theme));
            //create a game
            console.log("CREATING A GAME")
            connection.invoke("CreateNewGame", gameGUID, gameName, gameSize, theme).then();
        }
            return (
                <Fragment>
                    <Lobby connection={connection} lobbyState={lobbyState} />
                </Fragment>
            )



    } else if(pageState === "game") {
        return (
            <div>
                <GameContainerMultiplayer connection={connection} />
            </div>
        )
    } else if(pageState === "endGame") {

    }
}