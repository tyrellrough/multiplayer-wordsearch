import {toggleFullscreenState} from "./screenSlice.js";
import {useDispatch, useSelector} from "react-redux";

export default function FullScreenToggleButton() {

    const dispatch = useDispatch();
    const isFullScreen = useSelector(state => state.isFullscreen);

    const clickHandler = () => {
        toggleFullScreen();
        dispatch(toggleFullscreenState());
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    return (
        <button onClick={clickHandler}>Full Screen</button>
    );





}