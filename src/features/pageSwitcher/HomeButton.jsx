import {useDispatch} from "react-redux";
import {changePage} from "./pageSwitcherSlice.js";
import HomeIcon from "./HomeIcon.jsx";

export default function HomeButton() {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(changePage('mainMenu'))

    }
    return (
        <button onClick={clickHandler}><HomeIcon /></button>
    );
}