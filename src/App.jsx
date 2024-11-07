import './App.css'
import {useSelector} from "react-redux";
import MainMenuPage from "./features/pageSwitcher/MainMenuPage.jsx";
import SinglePlayerPage from "./features/pageSwitcher/SinglePlayerPage.jsx";
import CreateMultiplayerPage from "./features/pageSwitcher/CreateMultiplayerPage.jsx";
import JoinMultiplayerPage from "./features/pageSwitcher/JoinMultiplayerPage.jsx";
import LobbyPage from "./features/pageSwitcher/LobbyPage.jsx";

function App() {

    const currentPage = useSelector((state) => state.pageSwitcher.currentPage);

    if(currentPage === "mainMenu") {
        return (
            <MainMenuPage />
        )
    } else if (currentPage === "singlePlayer") {
        return (
            <SinglePlayerPage />
        )
    } else if (currentPage === "newMultiplayer") {
        return (
            <CreateMultiplayerPage />
        )
    } else if (currentPage === "joinMultiplayer") {
        return (
            <JoinMultiplayerPage />
        )
    } else if (currentPage === "lobby") {
        return (
            <LobbyPage />
        )
    }


}

export default App
