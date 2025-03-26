import PuzzleSizeRadioGroup from "./PuzzleSizeRadioGroup.jsx";

import WordThemeDropDown from "./WordThemeDropDown.jsx";
import GameName from "./GameName.jsx";
import GameGuid from "./GameGuid.jsx";
import {setGameGuid, setGameName} from "./gameOptionsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import CreateGameButton from "../gameMultiplayer/CreateGameButton.jsx";
import {useEffect, useState} from "react";

export default function MultiplayerGameOptionsSelector(props) {

    const gameName = useSelector(state => state.gameOptions.gameName);
    const gameGuid = useSelector((state) => state.gameOptions.gameGuid);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    function GetNewGameNameAndGuid() {
        props.connection.invoke("GetNewGameName").then((gameName) => {
            dispatch(setGameName(gameName));
            props.connection.invoke("GetNewGuid").then((guid) => {
                dispatch(setGameGuid(guid));
                setIsLoaded(true);
            })
        })
    }

    useEffect(() => {
        GetNewGameNameAndGuid();
    }, [])

    return(
        <div className="flex flex-col items-center gap-2 pb-4">
            <p className="underline text-2xl">Puzzle Size</p>
            <PuzzleSizeRadioGroup/>

            <p className="underline text-2xl">Word Theme</p>
            <WordThemeDropDown/>
            <p className="underline text-2xl">Game Name</p>
            <p>{gameName}</p>

            <div>
                <CreateGameButton isLoaded={isLoaded} />
            </div>

        </div>
    );
}