import {useGetNewGameNameQuery} from "../../services/wordSearchAPI.js";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setGameName} from "./gameOptionsSlice.js";

export default function GameName() {
    const {data: gameNameData = [], error, isLoading}  = useGetNewGameNameQuery(undefined, undefined);
    const dispatch = useDispatch();
    const gameName = useSelector(state => state.gameOptions.gameName);

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

    const randomWordsList = [];
    gameNameData.forEach((word) => {
        randomWordsList.push(word.text)
    })
    //et tempGameName = randomWordsList.join("-");
    //console.log(randomWordsList);
    dispatch(setGameName(randomWordsList.join("-")));

    return (
        <Fragment>
            <p>{gameName}</p>
        </Fragment>
    );
}