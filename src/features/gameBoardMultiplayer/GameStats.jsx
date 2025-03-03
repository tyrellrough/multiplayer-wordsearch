import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import PlayerStatElement from "./PlayerStatElement.jsx";

export default function GameStats(props) {
    const [isHidden, setIsHidden] = useState(false);
    const gameGuid = useSelector(state => state.multiPlayerGame.gameGUID);
    const [playerStats, setPlayersStats] = useState([]);

    props.connection.on("UpdateGameStats", playerStatsResult => {
        setPlayersStats(playerStatsResult);
        console.log(playerStatsResult);
    })

    async function GetGameStats(gameGuid) {
        props.connection.invoke("GetGameStats", gameGuid).then(playerStatsResult => {
            setPlayersStats(playerStatsResult);
            console.log(playerStatsResult);
        })
    }

    function ToggleDisplayedClickHandler() {
        setIsHidden(!isHidden);
    }

    useEffect(() => {
       GetGameStats(gameGuid).then();
    }, []);

    if(isHidden) {
        return (
            <div>
                <button onClick={() => ToggleDisplayedClickHandler()}>Show</button>
                <p>Hidden</p>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={() => ToggleDisplayedClickHandler()}>Hide</button>

                <p>GameStats</p>
                {playerStats.map((player, index) =>
                    <div key={index}>
                        <PlayerStatElement player={player}/>
                    </div>
                )}
            </div>
        );
    }


}