import MultiplayerWordSearchCanvas from "../gameBoardMultiPlayer/MultiplayerWordSearchCanvas.jsx";
import MultiplayerWordsList from "../gameBoardMultiPlayer/MultiplayerWordsList.jsx";
import GameStatsOverlay from "../gameBoardMultiPlayer/GameStatsOverlay.jsx";
import GameStats from "../gameBoardMultiPlayer/GameStats.jsx";


export default function GameContainerMultiplayer(props) {


    return (
        <div className="h-[90vh] flex gap-2 sm:flex-row flex-col place-items-center overflow-hidden justify-center w-full text-sm sm:text-md md:text-lg lg:text-xl">
            <GameStatsOverlay connection={props.connection}/>
            <GameStats connection={props.connection}/>
            <MultiplayerWordSearchCanvas connection={props.connection}/>
            <MultiplayerWordsList connection={props.connection}/>
        </div>
    )
}