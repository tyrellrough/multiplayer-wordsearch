import {useDispatch, useSelector} from "react-redux";
import {setCurrentPageState, setLobbyState} from "../gameMultiplayer/multiPlayerGameSlice.js";

export default function GameEndHandler(props) {
    const gameGuid = useSelector(state => state.multiPlayerGame.gameGUID)
    const wordTheme = useSelector(state => state.multiPlayerGame.gameTheme)
    const gameSize = useSelector(state => state.multiPlayerGame.gameSize)

    const currentPlayer = useSelector(state => state.multiPlayerGame.currentPlayer)

    const dispatch = useDispatch();


    function EndGameHandler() {
        props.connection.invoke("EndGame", gameGuid).then();
    }

    function ReturnLobbyHandler() {
            props.connection.invoke("GenerateNewBoard", gameGuid, wordTheme, gameSize).then(() => {
                props.connection.invoke("ChangePageStateToExistingLobby", gameGuid).then()

            })

    }

    props.connection.on("ChangeStateToExistingLobby", () => {
        dispatch(setLobbyState("existingLobby"))
        dispatch(setCurrentPageState("lobby"))

    })


    if(currentPlayer.isHost) {
        return (
            <div className={"flex gap-2"}>
                <button onClick={() => EndGameHandler()}>End Game</button>
                <button onClick={() => ReturnLobbyHandler()}>New Game</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>Waiting for host</p>
            </div>
        )
    }




}