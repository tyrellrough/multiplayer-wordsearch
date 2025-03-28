import HomeButton from "./HomeButton.jsx";
import FullScreenToggleButton from "../screen/FullScreenToggleButton.jsx";
import ToggleAudioButton from "../audio/ToggleAudioButton.jsx";

export default function NavigationBar() {

    return (
        <div className="w-full flex justify-between">
            <HomeButton />
            <div className={"flex gap-2"}>
                <ToggleAudioButton />
                <FullScreenToggleButton />
            </div>

        </div>
    );
}
