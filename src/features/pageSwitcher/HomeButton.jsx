import {useDispatch} from "react-redux";
import {changePage} from "./pageSwitcherSlice.js";

export default function HomeButton() {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(changePage('mainMenu'))
    }

    return (
        <button onClick={clickHandler}>Home</button>
    );
}