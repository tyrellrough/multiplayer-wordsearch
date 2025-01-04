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
import {useSelector} from "react-redux";

export default function MultiplayerPage() {

    const multiplayerValues = useSelector();

    const [connection] = useState(new HubConnectionBuilder()
        .withUrl("https://localhost:7033/Game")
        .build())

    useEffect(() => {
        connection.start();
        console.log("Connection started");
    }, [connection])





    connection.on("ReceiveMessage", (object) => {

        console.log("recived something from the server ");
        console.log(object["1"]);
        //setMessage(message);
    });


    return (
        <div>
            <p>multiplayer page</p>
        </div>
    )
}