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
import {setGameGUID, setGameName, setGameSize} from "./multiPlayerGameSlice.js";
import Lobby from "./Lobby.jsx";

export default function MultiplayerPage() {

    const pageState = useSelector(state => state.multiPlayerGame.currentPageState);
    const lobbyState = useSelector(state => state.multiPlayerGame.lobbyState);

    //const connectionState = useSelector(state => state.multiPlayerGame.connectionState);
    const [connectionState, setConnectionState] = useState("unconnected");
    const dispatch = useDispatch();


    //these save the game guid and game name in the multiplayer slice.
    dispatch(setGameGUID(useSelector(state => state.gameOptions.gameGuid)));
    dispatch(setGameName(useSelector(state => state.gameOptions.gameName)));
    dispatch(setGameSize(useSelector(state => state.gameOptions.puzzleSize)));

    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const gameName = useSelector(state => state.multiPlayerGame.gameName);
    const gameSize = useSelector(state => state.multiPlayerGame.gameSize);

    const [connection] = useState(new HubConnectionBuilder()
        .withUrl("https://localhost:7033/Game")
        .build())

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
    } else if(pageState === "joinGameList") {
        //get a list of games
        //convert the list to elements
        //display elements
        return(
            <div>
                <p>Join game list</p>
            </div>
        )
    } else if(pageState === "lobby") {
        //add user to group named the guid
        //connection.invoke("RemoveFromGroup", "lobby").then()

        //if its a new lobby add the lobby to the server
        if(lobbyState === "newLobby") {
            //create a game
            connection.invoke("CreateNewGame", gameGUID, gameName, gameSize).then(r => console.log(r));
        }
        return (
            <Fragment>
                <Lobby connection={connection} />
            </Fragment>
        )
    } else if(pageState === "game") {
        return (
            <div>
                <p>game</p>
            </div>
        )

    }
}