import {setFullScreen} from "./screenSlice.js";
import {useDispatch, useSelector} from "react-redux";
import FullScreenMinimiseIcon from "./FullScreenMinimiseIcon.jsx";
import FullScreenFullIcon from "./FullScreenFullIcon.jsx";

export default function FullScreenToggleButton() {

    const dispatch = useDispatch();
    const isFullScreen = useSelector(state => state.screen.isFullscreen);

    const clickHandler = () => {
        toggleFullScreen();
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            dispatch(setFullScreen(true));
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            dispatch(setFullScreen(false));
            document.exitFullscreen();
        }
    }

    if(isFullScreen) {
        return (
            <button onClick={clickHandler}><FullScreenMinimiseIcon /></button>
        );
    } else {
        return (
            <button onClick={clickHandler}><FullScreenFullIcon/></button>
        );
    }






}