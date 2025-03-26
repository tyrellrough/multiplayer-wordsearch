import {useDispatch} from "react-redux";
import {changePage} from "./pageSwitcherSlice.js";
import HomeIcon from "./HomeIcon.jsx";

export default function GamesListHomeButton(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(changePage('mainMenu'))
        props.connection.invoke("RemoveUserFromGroup", "lobby").then()
    }
    return (
        <button onClick={clickHandler}><HomeIcon /></button>
    );
}