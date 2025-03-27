import HomeButton from "../pageSwitcher/HomeButton.jsx";
import FullScreenToggleButton from "../screen/FullScreenToggleButton.jsx";
import ExitWithConfirmationButton from "./ExitWithConfirmationButton.jsx";
import ToggleAudioButton from "../audio/ToggleAudioButton.jsx";

export default function NavigationBarInGame(props) {




        return (
            <div className="w-full flex justify-between">
                <ExitWithConfirmationButton connection={props.connection} />
                <div className={"flex gap-2"}>
                    <ToggleAudioButton />
                    <FullScreenToggleButton />
                </div>

            </div>
        );


}

