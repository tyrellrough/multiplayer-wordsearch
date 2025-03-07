import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGameName} from "./gameOptionsSlice.js";

export default function GameName(props) {
    const dispatch = useDispatch();

    function GetNewGameName() {
        props.connection.invoke("GetNewGameName").then((gameName) => {
            dispatch(setGameName(gameName));
        })
    }

    useEffect(() => {
        GetNewGameName();
    }, [])

    return (
        <Fragment>
            <p>{gameName}</p>
        </Fragment>
    );
}