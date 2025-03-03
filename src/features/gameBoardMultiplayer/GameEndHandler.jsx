import {useDispatch, useSelector} from "react-redux";
import {setCurrentPageState, setLobbyState} from "../gameMultiplayer/multiPlayerGameSlice.js";

export default function GameEndHandler(props) {
    const gameGuid = useSelector(state => state.multiPlayerGame.gameGUID)
    const dispatch = useDispatch();


    function EndGameHandler() {

    }

    function ReturnLobbyHandler() {
        props.connection.invoke("DeleteGame", gameGuid).then(() =>
            props.connection.invoke("ChangePageStateToLobby", gameGuid).then()
        )
    }

    function NewGameHandler() {

    }

    props.connection.on("ChangeStateToLobby", () => {
        dispatch(setCurrentPageState("lobby"))
        dispatch(setLobbyState("newLobby"))
    })

    // const pageState = useSelector(state => state.multiPlayerGame.currentPageState);
    // const lobbyState = useSelector(state => state.multiPlayerGame.lobbyState);

    return (
        <div>
            <button onClick={() => EndGameHandler()}>End Game</button>
            <button onClick={() => ReturnLobbyHandler()}>Return To Lobby</button>
            <button onClick={() => NewGameHandler()}>New Game</button>
        </div>
    );


}