//server side
//use game manager to create a new game instance.

//information
//game name
//game players
//game guid


// This component contains the lobby,
// the game itself, lobby list and the signalR connection to the server.
import {useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {useDispatch, useSelector} from "react-redux";
import {setGameGUID, setGameName} from "./multiPlayerGameSlice.js";

export default function MultiplayerPage() {

    const pageState = useSelector(state => state.multiPlayerGame.currentPageState);
    const dispatch = useDispatch();

    //these save the game guid and game name in the multiplayer slice.
    dispatch(setGameGUID(useSelector(state => state.gameOptions.gameGUID)));
    dispatch(setGameName(useSelector(state => state.gameOptions.gameName)));

    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const gameName = useSelector(state => state.multiPlayerGame.gameName);

    const [connection] = useState(new HubConnectionBuilder()
        .withUrl("https://localhost:7033/Game")
        .build())

    useEffect(() => {
        connection.start().then();
        console.log("Connection started");
    }, [connection])

    connection.on("ReceiveMessage", (object) => {

        console.log("recived something from the server ");
        console.log(object["1"]);
        //setMessage(message);

    });

    //connection.invoke("getUserID")

    connection.on("RecieveUserID", (userID) => {
        console.log(userID);
    })



    if(pageState === "joinGameList") {
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
        //connection.invoke("removeFromGroup", "lobbyGroup").then()

        function onclick() {
            connection.invoke("AddUserToGroup",).then()
        }

        return (
            <div>
                <p>lobby</p>
                <p>{gameGUID}</p>
                <button onClick={onclick}>button</button>
            </div>
        )
    } else if(pageState === "game") {
        return (
            <div>
                <p>game</p>
            </div>
        )

    }
}