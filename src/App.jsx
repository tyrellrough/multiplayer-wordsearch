import './App.css'
import {useSelector} from "react-redux";
import MainMenuPage from "./features/pageSwitcher/MainMenuPage.jsx";
import SinglePlayerPage from "./features/pageSwitcher/SinglePlayerPage.jsx";
import CreateMultiplayerPage from "./features/pageSwitcher/CreateMultiplayerPage.jsx";
import MultiplayerPage from "./features/gameMultiplayer/MultiplayerPage.jsx";
import NavigationBar from "./features/pageSwitcher/NavigationBar.jsx";
import GameContainerSinglePlayer from "./features/gameSinglePlayer/GameContainerSinglePlayer.jsx";

function App() {

    const currentPage = useSelector((state) => state.pageSwitcher.currentPage);

    if(currentPage === "mainMenu") {
        return (
            <div className="h-screen">
                <NavigationBar />
                <MainMenuPage />
            </div>

        )
    } else if (currentPage === "newSinglePlayer") {
        return (
            <div className="h-screen">
                <NavigationBar/>
                <SinglePlayerPage/>
            </div>

        )
    } else if (currentPage === "singlePlayerGame") {
        return (
            <div className="h-screen">
                <NavigationBar />
                <GameContainerSinglePlayer />
            </div>

        )
    } else if (currentPage === "newMultiplayer") {
        return (
            <CreateMultiplayerPage />
        )
    } else if (currentPage === "multiplayer") {
        return (
            <MultiplayerPage />
        )
    }


}

export default App
