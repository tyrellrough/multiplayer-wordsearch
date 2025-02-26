import MultiplayerWordSearchCanvas from "./MultiplayerWordSearchCanvas.jsx";
import MultiplayerWordsList from "./MultiplayerWordsList.jsx";




export default function GameContainerMultiplayer(props) {

        return (
            <div className="h-[90vh] flex gap-2 sm:flex-row flex-col place-items-center justify-center w-full">
                <MultiplayerWordSearchCanvas connection={props.connection} />
                <MultiplayerWordsList connection={props.connection} />
            </div>
        )
}