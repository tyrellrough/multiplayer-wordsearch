//goes in create game comp
import {useDispatch} from 'react-redux'
import {changePage} from "../pageSwitcher/pageSwitcherSlice.js";
import {setCurrentPageState, setLobbyState} from "./multiPlayerGameSlice.js";

export default function NewMultiplayerButton() {

    const dispatch = useDispatch()

    const clickHandler = () => {

        dispatch(setCurrentPageState("newGameCreator"))
        dispatch(setLobbyState(""))
        dispatch(changePage("multiplayer"))
    }

    return (
        <button onClick={clickHandler}>New Multiplayer</button>
    )
}