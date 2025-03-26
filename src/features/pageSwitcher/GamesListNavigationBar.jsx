import FullScreenToggleButton from "../screen/FullScreenToggleButton.jsx";
import ToggleAudioButton from "../audio/ToggleAudioButton.jsx";
import GamesListHomeButton from "./GamesListHomeButton.jsx";

export default function GamesListNavigationBar(props) {

    return (
        <div className="w-full flex justify-between z-10">
            <GamesListHomeButton connection={props.connection} />
            <div className={"flex gap-2"}>
                <ToggleAudioButton />
                <FullScreenToggleButton />
            </div>

        </div>
    );
}
