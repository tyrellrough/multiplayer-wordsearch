import {useEffect, useState} from "react";
import PlayerStatElement from "./PlayerStatElement.jsx";
import ColouredSquare from "../gameMultiplayer/ColouredSquare.jsx";

export default function WinnerDisplayText(props) {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        let winnersTemp = [];
        let highestScore = 0;

        console.log("props players");
        console.log(props.playerStats);
        //find the highest score
        props.playerStats.forEach((player, i) => {
            console.log("players found count " + player.wordsFoundCount)
            if(player.wordsFoundCount > highestScore) {
                highestScore = player.wordsFoundCount;
            }
        })

        //find the players who match the highest score
        props.playerStats.forEach((player, i) => {
            if(player.wordsFoundCount === highestScore) {
                winnersTemp.push(player);
            }
        })

        console.log("highest score" + highestScore);
        console.log("winners temp");
        console.log(winnersTemp);
        setWinners(winnersTemp);
    }, [props.playerStats]);

    return (
        <div>
            <p> Winners </p>
            <div className="flex gap-2 justify-center">
                {winners.map((player, i) =>
                    <div key={i}>
                        <p>{player.colour}</p>
                    </div>

                )}

            </div>
        </div>

    )
}