import {useDispatch, useSelector} from "react-redux";
import {backPage, changePage} from "./pageSwitcherSlice.js";

export default function GamesListBackButton(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(backPage())
        props.connection.invoke("RemoveUserFromGroup", "lobby").then()
    }

    return (
        <button onClick={clickHandler} className={""}>← Back</button>
    );
}