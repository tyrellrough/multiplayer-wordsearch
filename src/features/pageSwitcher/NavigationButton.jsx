import {useDispatch} from 'react-redux'
import {changePage} from "./pageSwitcherSlice.js";

export default function NavigationButton(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(changePage(props.targetPage))
    }

    return (
        <button onClick={clickHandler}>{props.text}</button>
    )
}