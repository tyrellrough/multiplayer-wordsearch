import MultiplayerWordSearchCanvas from "../gameBoardMultiplayer/MultiplayerWordSearchCanvas.jsx";
import MultiplayerWordsList from "../gameBoardMultiplayer/MultiplayerWordsList.jsx";
import GameStatsOverlay from "../gameBoardMultiplayer/GameStatsOverlay.jsx";
import GameStats from "../gameBoardMultiplayer/GameStats.jsx";


export default function GameContainerMultiplayer(props) {


    return (
        <div className="h-[90vh] flex gap-2 sm:flex-row flex-col place-items-center justify-center w-full">
            <GameStatsOverlay connection={props.connection}/>
            <GameStats connection={props.connection}/>
            <MultiplayerWordSearchCanvas connection={props.connection}/>
            <MultiplayerWordsList connection={props.connection}/>
        </div>
    )
}