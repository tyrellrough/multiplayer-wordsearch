import {useEffect, useState} from "react";

export default function JoinGameList(props) {
    //get a list of games
    //convert the list to elements
    //display elements

    //should paginate the games so not all games are being requested at once.
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPageNumber, setMaxPageNumber] = useState(10);
    const [isAddedToLobbyGroup, setIsAddedToLobbyGroup] = useState(false);
    //const pageNumber = 1;
    const pageSize = 5;

    useEffect(() => {
        AddToLobbyGroup();
    })

    //this is invoked by the server.
    props.connection.on("NewGameAdded", () => {
        GetNumberOfPages(pageSize);
    })

    function GetGamesByPage(pageNumber, pageSize) {
        props.connection.invoke("GetGamesByPage", pageNumber, pageSize).then(
            result => {
                console.log(result);
            }
        )
    }

    function GetNumberOfPages(pageSize) {
        props.connection.invoke("GetNumberOfPages", pageSize).then(
            result => {
                setMaxPageNumber(result);
                if(pageNumber > maxPageNumber) {
                    setPageNumber(maxPageNumber)
                }
            }
        )
    }

    function AddToLobbyGroup() {
        props.connection.invoke("AddPlayerToGroup", "lobby").then(
            () => {
                setIsAddedToLobbyGroup(true)
            }
        )
    }

    function IncreasePageNumber() {
        if(pageNumber < maxPageNumber) {
            setPageNumber(pageNumber + 1);
        }

    }

    function DecreasePageNumber() {
        if(pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
        //otherwise do nothing.
    }

    if(!isAddedToLobbyGroup) {
        return (
            <p>Loading</p>
        );
    } else {
        return (
            <div>
                <p>game list</p>
                <button onClick={() => {
                    GetGamesByPage(pageNumber, pageSize);
                    GetNumberOfPages(pageSize);
                }}>Get second game</button>

                <div>
                    <button onClick={() => {DecreasePageNumber()}}>Decrease page num</button>
                    <p>{pageNumber}</p>
                    <button onClick={() => {IncreasePageNumber()}}>Increase page num</button>
                    <button onClick={() => {GetGamesByPage(pageNumber, pageSize)}}>Refresh List</button>
                </div>
            </div>
        )
    }


}