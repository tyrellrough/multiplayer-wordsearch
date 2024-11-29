import BackButton from './BackButton';
import {HubConnectionBuilder} from "@microsoft/signalr";
import {useEffect, useState} from "react";



export default function CreateMultiplayerPage() {

    const [message1, setMessage] = useState("");

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7033/Game")
            .build();

        connection.start().then(r => connection.invoke("SendMessage", "red"))





        connection.on("ReceiveMessage", (message) => {
            console.log(message);
            setMessage(message);
        });
    }, [message1])



    return (
        <div>
            <p>Create multiplayer</p>
            <BackButton/>
            <p>{message1}</p>
        </div>
    )
}