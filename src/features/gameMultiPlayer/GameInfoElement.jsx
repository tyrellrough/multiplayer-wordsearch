import {useDispatch, useSelector} from "react-redux";
import {
    setGameName,
    setGameGUID,
    setCurrentPageState,
    setLobbyState,
    setGameSize,
    setWordsTheme
} from "./multiPlayerGameSlice.js";

export default function GameInfoElement(props) {

    const dispatch = useDispatch();
    function joinGame() {
        dispatch(setGameName(props.gameName));
        dispatch(setGameGUID(props.guid));
        dispatch(setGameSize(props.size));
        dispatch(setWordsTheme(props.theme));

        dispatch(setLobbyState("existing"));
        dispatch(setCurrentPageState("lobby"));

    }

    return (
        <div className="flex justify-between w-[95%] py-4 sm:text-xl sm:p-5 m-2 border rounded border-black">
            <div className="flex flex-col justify-center w-full">
                <div className="flex justify-between">
                    <p>{props.gameName}</p>
                    <div>
                        <p>{props.playerCount}/{props.maxPlayerCount}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p>Theme: {props.theme}</p>
                    <p>Size: {props.size}</p>
                </div>
            </div>
            <button onClick={() => {
                props.playerCount === props.maxPlayerCount ? "" : joinGame();
            }}>{props.playerCount === props.maxPlayerCount ? "full" : "join"}</button>
        </div>

    )
}