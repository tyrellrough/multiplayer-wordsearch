import NavigationButton from "./NavigationButton.jsx";
import NavigationBar from "./NavigationBar.jsx";

export default function MainMenuPage() {
    return (
        <div>
            <NavigationBar />
            <p>Tyrell's Word Search Puzzles</p>
            <NavigationButton text={'Singleplayer'} targetPage={'singlePlayer'}/>
            <NavigationButton text={'New Multiplayer'} targetPage={'newMultiplayer'}/>
            <NavigationButton text={'Join Multiplayer'} targetPage={'joinMultiplayer'}/>
        </div>
    )
}