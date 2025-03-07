import './App.css'
import {useSelector} from "react-redux";
import MainMenuPage from "./features/pageSwitcher/MainMenuPage.jsx";
import SinglePlayerPage from "./features/pageSwitcher/SinglePlayerPage.jsx";
import MultiplayerPage from "./features/gameMultiplayer/MultiplayerPage.jsx";
import NavigationBar from "./features/pageSwitcher/NavigationBar.jsx";
import GameContainerSinglePlayer from "./features/gameSinglePlayer/GameContainerSinglePlayer.jsx";

function App() {

    const currentPage = useSelector((state) => state.pageSwitcher.currentPage);

    if (currentPage === "mainMenu") {
        return (
            <div className="h-screen">
                <NavigationBar/>
                <MainMenuPage/>
                <div className="hide-overflow fill-parent">
                    <div id="background-wrapper" className="fill-parent">
                        <div id="bg" className="fill-parent doodleBG "/>
                        <div id="bg" className="offset fill-parent doodleBG"/>
                    </div>
                    <div id="bg-gradient" className="fill-parent"></div>

                </div>

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
                <NavigationBar/>
                <GameContainerSinglePlayer/>
            </div>

        )
    } else if (currentPage === "multiplayer") {
        return (

            <div className="h-screen">

                <MultiplayerPage/>
            </div>
        )
    }


}

export default App
