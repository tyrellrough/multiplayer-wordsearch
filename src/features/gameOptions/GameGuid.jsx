
import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGameGuid} from "./gameOptionsSlice.js";

export default function GameGuid(props) {

    const dispatch = useDispatch();
    const gameGuid = useSelector((state) => state.gameOptions.gameGuid);

    function GetNewGameGuid() {
        props.connection.invoke("GetNewGuid").then((guid) => {
            dispatch(setGameGuid(guid));
        })
    }

    useEffect(() => {
        GetNewGameGuid();
    }, []);



    return (
        <Fragment>
            <p>{gameGuid}</p>
        </Fragment>
    );
}