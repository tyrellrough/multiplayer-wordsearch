import {useGetNewGameGuidQuery} from "../../services/wordSearchAPI.js";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGameGuid, setGameName} from "./gameOptionsSlice.js";

export default function GameGuid() {
    const {data: gameGuidData = [], error, isLoading}  = useGetNewGameGuidQuery(undefined, undefined);
    const dispatch = useDispatch();
    const gameGuid = useSelector(state => state.gameOptions.gameGuid);

    if (error) {
        return(
            <p>error</p>
        )
    }
    if (isLoading) {
        return(
            <p>loading</p>
        )
    }

    dispatch(setGameGuid(gameGuidData));

    return (
        <Fragment>
            <p>{gameGuid}</p>
        </Fragment>
    );
}