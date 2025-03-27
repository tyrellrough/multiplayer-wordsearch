//goes in create game comp
import {useDispatch} from 'react-redux'
import {changePage} from "../pageSwitcher/pageSwitcherSlice.js";
import {setCurrentPageState, setLobbyState} from "./multiPlayerGameSlice.js";

export default function LoadGameListButton() {

    const dispatch = useDispatch()

    const clickHandler = () => {

        dispatch(setCurrentPageState("gamesList"))
        dispatch(setLobbyState(""))
        dispatch(changePage("multiplayer"))
    }

    return (
        <button onClick={clickHandler}>Join Multiplayer</button>
    )
}