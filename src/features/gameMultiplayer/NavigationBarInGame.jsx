import HomeButton from "../pageSwitcher/HomeButton.jsx";
import FullScreenToggleButton from "../screen/FullScreenToggleButton.jsx";
import ExitWithConfirmationButton from "./ExitWithConfirmationButton.jsx";

export default function NavigationBarInGame(props) {




        return (
            <div className="w-full flex justify-between">
                <ExitWithConfirmationButton connection={props.connection} />
                <FullScreenToggleButton />
            </div>
        );


}

