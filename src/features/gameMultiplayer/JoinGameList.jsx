import {useEffect, useState} from "react";
import GameInfoElement from "./GameInfoElement.jsx";
import BackButton from "../pageSwitcher/BackButton.jsx";

export default function JoinGameList(props) {
    //get a list of games
    //convert the list to elements
    //display elements

    //should paginate the games so not all games are being requested at once.
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPageNumber, setMaxPageNumber] = useState(1);
    const [isAddedToLobbyGroup, setIsAddedToLobbyGroup] = useState(false);
    const [gameList, setGameList] = useState([]);
    //this stores the amount of players for each game in gameList.
    //playerAmountList[i] has the player amounts for gameList[i].
    //It's better than transporting all game info everytime the player count changes.
    const [playerAmountList, setPlayerAmountList] = useState([]);

    const pageSize = 5;

    useEffect(() => {
        AddToLobbyGroup();
        UpdateNumPagesAndGames();
    }, [])

    useEffect(() => {
        UpdateNumPagesAndGames();
    }, [pageNumber]);

    props.connection.on("NewGameAdded", () => {
        UpdateNumPagesAndGames();
    })

    function UpdateNumPagesAndGames() {
        GetNumberOfPages(pageSize).then(
            () => {
                GetGames(pageNumber, pageSize).then(
                    () => {
                        console.log(gameList);
                    }
                );
            }
        )
    }

    async function GetGames(pageNumber, pageSize) {
        props.connection.invoke("GetGamesByPage", pageNumber, pageSize).then(
            (games) => {
                setGameList(games);
            }
        )
    }

    async function GetNumberOfPages(pageSize) {
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
        //otherwise do nothing.
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
            <div className={"h-full flex flex-col justify-between"}>

                <div className={"flex"}>
                    <BackButton/>
                </div>
                <p className={"text-3xl"}>Games List</p>

                {/*{gameList.map((gameInfo, index) => (*/}
                {/*    <div key={index}>{gameInfo.name}</div>*/}
                {/*))}*/}
                <div className="flex items-center flex-col h-full">
                    {gameList.map((gameInfo, index) => (
                        <GameInfoElement key={index} gameName={gameInfo.name} playerCount={gameInfo.playerCount}
                                         maxPlayerCount={gameInfo.maxNumberOfPlayers} theme={gameInfo.theme}
                                         size={gameInfo.size} guid={gameInfo.guid} connection={props.connection}
                        />
                    ))}
                </div>


                <div className={"flex gap-8"}>
                    <button onClick={() => {
                        DecreasePageNumber()
                    }}>Previous Page
                    </button>
                    <p>{pageNumber}</p>
                    <button onClick={() => {
                        IncreasePageNumber()
                    }}>Next Page
                    </button>
                </div>
            </div>
        )
    }
}