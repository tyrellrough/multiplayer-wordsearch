import NavigationBar from "./NavigationBar.jsx";
import BackButton from "./BackButton.jsx";
import SinglePlayerGameOptionsSelector from "../gameOptions/SinglePlayerGameOptionsSelector.jsx";

export default function SinglePlayerPage() {
    return (
        <div>
            <p>singleplayer</p>
            <NavigationBar />
            <BackButton />
            <SinglePlayerGameOptionsSelector />
        </div>
    )
}
