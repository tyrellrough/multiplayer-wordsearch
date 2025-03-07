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
import GameContainerMultiplayer from "./GameContainerMultiplayer.jsx";
import {changePage} from "../pageSwitcher/pageSwitcherSlice.js";
import NavigationBar from "../pageSwitcher/NavigationBar.jsx";
import BackButton from "../pageSwitcher/BackButton.jsx";
import NavigationBarInGame from "./NavigationBarInGame.jsx";
import MultiplayerGameOptionsSelector from "../gameOptions/MultiplayerGameOptionsSelector.jsx";
import CreateGameButton from "./CreateGameButton.jsx";
import SinglePlayerGameOptionsSelector from "../gameOptions/SinglePlayerGameOptionsSelector.jsx";
import NavigationButton from "../pageSwitcher/NavigationButton.jsx";

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
        .build())

    connection.on("SwitchPageStateToStart", () => {
        dispatch(changePage("mainMenu"));
    })

    useEffect(() => {
        if(connectionState === "unconnected") {
            connection.start().then(() => setConnectionState("connected"))
        }
    }, [connection, connectionState])

    if(connectionState !== "connected") {
        return (
            <div>
                <p>Waiting for connection to establish</p>
            </div>
        )

    } else if(pageState === "newGameCreator") {
        return (
            <div className={"flex flex-col h-screen"}>
                <NavigationBar/>


                <div className={"flex h-screen justify-center"}>

                    <div className={"h-5/6 flex flex-col justify-center gap-4"}>
                        <div className={"flex"}>
                            <BackButton/>
                        </div>
                        <p className={"text-3xl"}>New Multiplayer Game</p>
                        <div>
                            <MultiplayerGameOptionsSelector connection={connection}/>

                        </div>


                    </div>
                </div>


            </div>
        );
    } else if (pageState === "gamesList") {
        return (
            <div className={"h-screen flex flex-col"}>
                <NavigationBar/>

                <div className={"flex flex-col h-screen justify-center"}>
                    <div className={"h-5/6 flex flex-col justify-center items-center"}>
                        <JoinGameList connection={connection}/>
                    </div>
                </div>


            </div>
        )
    } else if (pageState === "lobby") {
        console.log("page state is lobby")
        //add user to group named the guid
        //connection.invoke("RemoveFromGroup", "lobby").then()

        if (lobbyState === "newLobby") {
            console.log("lobby state is new lobby")
            dispatch(setGameName(gameName));
            dispatch(setGameGUID(gameGUID));
            dispatch(setGameSize(gameSize));
            dispatch(setWordsTheme(theme));
        }

            return (
                <div className={"h-screen"}>
                    <NavigationBarInGame connection={connection}/>
                    <Lobby connection={connection} />
                </div>
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