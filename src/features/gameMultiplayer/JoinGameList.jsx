import {useEffect, useState} from "react";
import GameInfoElement from "./GameInfoElement.jsx";

export default function JoinGameList(props) {
    //get a list of games
    //convert the list to elements
    //display elements

    //should paginate the games so not all games are being requested at once.
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPageNumber, setMaxPageNumber] = useState(1);
    const [isAddedToLobbyGroup, setIsAddedToLobbyGroup] = useState(false);
    const [gameList, setGameList] = useState([]);

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
            <div>
                <p>game list</p>

                {/*{gameList.map((gameInfo, index) => (*/}
                {/*    <div key={index}>{gameInfo.name}</div>*/}
                {/*))}*/}
                <div className="flex items-center flex-col">
                    {gameList.map((gameInfo, index) => (
                        <GameInfoElement key={index} gameName={gameInfo.name} playerCount={0}
                                         maxPlayerCount={gameInfo.maxNumberOfPlayers} theme={gameInfo.theme} size={gameInfo.size}
                        />
                    ))}
                </div>



    {/*            <p>{props.gameName}</p>*/}
    {/*            <div>*/}
    {/*                <p>{props.playerCount}/{props.maxPlayerCount}</p>*/}
    {/*            </div>*/}
    {/*        </div>*/}
    {/*    <div>*/}
    {/*        <p>Theme: {props.theme}</p>*/}
    {/*        <p>Size: {props.size}</p>*/}
    {/*    </div>*/}
    {/*</div>*/}

                
                <div>
                    <button onClick={() => {
                        DecreasePageNumber()
                    }}>Decrease page num
                    </button>
                    <p>{pageNumber}</p>
                    <button onClick={() => {
                        IncreasePageNumber()
                    }}>Increase page num
                    </button>
                </div>
            </div>
        )
    }
}