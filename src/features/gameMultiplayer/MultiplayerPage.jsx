//server side
//use game manager to create a new game instance.

//information
//game name
//game players
//game guid


// This component contains the lobby,
// the game itself, lobby list and the signalR connection to the server.
import {Fragment, useEffect, useState} from "react";
import {HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {useDispatch, useSelector} from "react-redux";
import {setGameGUID, setGameName, setGameSize, setWordsTheme} from "./multiPlayerGameSlice.js";
import Lobby from "./Lobby.jsx";
import JoinGameList from "./JoinGameList.jsx";
import GameContainerMultiplayer from "./GameContainerMultiplayer.jsx";
import {changePage} from "../pageSwitcher/pageSwitcherSlice.js";
import NavigationBar from "../pageSwitcher/NavigationBar.jsx";
import BackButton from "../pageSwitcher/BackButton.jsx";
import NavigationBarInGame from "./NavigationBarInGame.jsx";
import MultiplayerGameOptionsSelector from "../gameOptions/MultiplayerGameOptionsSelector.jsx";
import CreateGameButton from "./CreateGameButton.jsx";


export default function MultiplayerPage() {


    const lobbyState = useSelector(state => state.multiPlayerGame.lobbyState);
    const pageState = useSelector(state => state.multiPlayerGame.currentPageState);

    //const connectionState = useSelector(state => state.multiPlayerGame.connectionState);
    const [connectionState, setConnectionState] = useState("unconnected");
    const dispatch = useDispatch();

    const gameGUID = useSelector(state => state.gameOptions.gameGuid);
    const gameName = useSelector(state => state.gameOptions.gameName);
    const gameSize = useSelector(state => state.gameOptions.puzzleSize);
    const theme = useSelector(state => state.gameOptions.wordsCategory);

    const [connection] = useState(new HubConnectionBuilder()
        .withUrl("https://localhost:7033/Game")
        .withAutomaticReconnect()
        .build())

    connection.onclose(error => {
        console.assert(connection.state === HubConnectionState.Disconnected);
    });

    connection.on("SwitchPageStateToStart", () => {
        dispatch(changePage("mainMenu"));
    })

    // var lockResolver;
    // if (navigator && navigator.locks && navigator.locks.request) {
    //     const promise = new Promise((res) => {
    //         lockResolver = res;
    //     });
    //
    //     navigator.locks.request('unique_lock_name', { mode: "shared" }, () => {
    //         return promise;
    //     });
    // }

    async function start() {
        try {
            await connection.start();
            console.assert(connection.state === HubConnectionState.Connected);
            console.log("SignalR Connected.");
            setConnectionState("connected");
        } catch (err) {
            console.assert(connection.state === HubConnectionState.Disconnected);
            console.log(err);
            setTimeout(() => start(), 5000);
        }
    }

    useEffect(() => {
        // if(connectionState === "unconnected") {
        //     connection.start().then(() => setConnectionState("connected"))
        // }
        if(connectionState === "unconnected") {
            start();
        }
    }, [connection, connectionState])

    if(connectionState !== "connected") {
        return (
            <div>
                <p>Waiting for connection to establish</p>
            </div>
        )

    } else if(pageState === "newGameCreator") {
        return(
            <div>
                <NavigationBar/>
                <MultiplayerGameOptionsSelector connection={connection} />
                <CreateGameButton />
            </div>

        );
    } else if(pageState === "gamesList") {
        return(
            <div>
                <NavigationBar/>
                <BackButton />
                <JoinGameList connection={connection}/>
            </div>
        )
    } else if(pageState === "lobby") {
        console.log("page state is lobby")
        //add user to group named the guid
        //connection.invoke("RemoveFromGroup", "lobby").then()

        if(lobbyState === "newLobby") {
            console.log("lobby state is new lobby")
            dispatch(setGameName(gameName));
            dispatch(setGameGUID(gameGUID));
            dispatch(setGameSize(gameSize));
            dispatch(setWordsTheme(theme));
        }

            return (
                <Fragment>
                    <NavigationBarInGame connection={connection}/>
                    <Lobby connection={connection} />
                </Fragment>
            )



    } else if(pageState === "game") {
        return (
            <div>
                <NavigationBarInGame connection={connection} />
                <GameContainerMultiplayer connection={connection} />
            </div>
        )
    }
}