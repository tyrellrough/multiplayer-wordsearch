import {useState} from "react";
import {useSelector} from "react-redux";
import PlayerInfo from "../gameMultiplayer/PlayerInfo.jsx";
import PlayerStatElement from "./PlayerStatElement.jsx";
import WinnerDisplayText from "./WinnerDisplayText.jsx";
import GameEndHandler from "./GameEndHandler.jsx";


export default function GameStatsOverlay(props) {

    const [GameState, setGameState] = useState("");
    const gameGuid = useSelector(state => state.multiPlayerGame.gameGUID);
    const [playerStats, setPlayersStats] = useState([]);

    props.connection.on("GameCompleted", () => {
        props.connection.invoke("GetGameStats", gameGuid).then(playerStatsResult => {
            setPlayersStats(playerStatsResult);
        });

        setGameState("complete");
    })

    if(GameState === "complete") {
        return (
            <div className={"absolute text-4xl border p-10 bg-opacity-90 rounded-lg bg-[#ffffff] z-0"}>
                <div className={"flex flex-col gap-4"}>
                    <div>
                        <WinnerDisplayText playerStats={playerStats}/>
                        <p className={"text-xl"}>----------------</p>
                    </div>

                    <div>
                        {playerStats.map((player, index) =>
                            <div key={index}>
                                <PlayerStatElement player={player}/>
                            </div>
                        )}
                    </div>
                </div>
                <GameEndHandler connection={props.connection} />

            </div>
        )
    }


}