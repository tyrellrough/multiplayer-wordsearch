import {useDispatch, useSelector} from "react-redux";
import {setAudioState} from "./gameAudioSlice.js";
import AudioMutedIcon from "./AudioMutedIcon.jsx";
import AudioOnIcon from "./AudioOnIcon.jsx";

export default function ToggleAudioButton() {

    const dispatch = useDispatch();
    const isOn = useSelector(state => state.gameAudio.isOn);

    function toggleAudio() {
        const newState = !isOn;
        dispatch(setAudioState(newState));
    }


    if(isOn) {
        return (
            <button onClick={() => toggleAudio()}><AudioOnIcon /></button>
        )
    } else {
        return (
            <button onClick={() => toggleAudio()}><AudioMutedIcon /></button>
        )
    }
}