//goes in create game comp
import {useDispatch} from 'react-redux'
import {changePage} from "../pageSwitcher/pageSwitcherSlice.js";
import {setCurrentPageState, setLobbyState} from "./multiPlayerGameSlice.js";


export default function CreateGameButton(props) {
    const dispatch = useDispatch()

    const clickHandler = () => {
        console.log("creating new game BUTTON CLICK HANDLER")
        dispatch(setCurrentPageState("lobby"))
        dispatch(setLobbyState("newLobby"))
        dispatch(changePage("multiplayer"))

    }

    if(!props.isLoaded) {
        return (
            <p>Loading ...</p>
        )
    } else {
        return (
            <button onClick={clickHandler}>Create Multiplayer Game</button>
        )
    }

}