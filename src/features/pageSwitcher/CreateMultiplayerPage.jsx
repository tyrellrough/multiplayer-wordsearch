import BackButton from './BackButton';
import MultiplayerGameOptionsSelector from "../gameOptions/MultiplayerGameOptionsSelector.jsx";
import NavigationButton from "./NavigationButton.jsx";
import {useGetNewGameNameQuery} from "../../services/wordSearchAPI.js";

export default function CreateMultiplayerPage() {






    return (
        <div>
            <p>Create multiplayer</p>
            <BackButton/>
            <MultiplayerGameOptionsSelector />
            <NavigationButton text="Create New Game Lobby" targetPage={'multiplayer'}/>


        </div>
    )
}