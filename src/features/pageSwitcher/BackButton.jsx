import {useDispatch, useSelector} from "react-redux";
import {backPage, changePage} from "./pageSwitcherSlice.js";

export default function BackButton(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(backPage())
    }

    return (
        <button onClick={clickHandler} className={""}>← Back</button>
    );
}