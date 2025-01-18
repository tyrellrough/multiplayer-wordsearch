//goes in create game comp
import {useDispatch} from 'react-redux'
import {changePage} from "../pageSwitcher/pageSwitcherSlice.js";
import {setCurrentPageState, setGameGUID} from "./multiPlayerGameSlice.js";

export default function CreateGameButton() {

    const dispatch = useDispatch()

    const clickHandler = () => {

        dispatch(setCurrentPageState("lobby"))
        //(setIsNewLobby)
        dispatch(changePage("multiplayer"))
    }

    return (
        <button onClick={clickHandler}>Create Multiplayer Game</button>
    )
}