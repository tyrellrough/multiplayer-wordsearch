import HomeButton from "./HomeButton.jsx";
import FullScreenToggleButton from "../screen/FullScreenToggleButton.jsx";

export default function NavigationBar() {

    return (
        <div className="w-full flex justify-between">
            <HomeButton />
            <FullScreenToggleButton />
        </div>
    );
}
