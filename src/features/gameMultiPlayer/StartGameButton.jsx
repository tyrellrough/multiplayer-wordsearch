//goes in create game comp
import {useSelector} from 'react-redux'

export default function StartGameButton(props) {

    const lobbyState = useSelector(state =>  state.multiPlayerGame.lobbyState);
    const gameGuid = useSelector(state =>  state.multiPlayerGame.gameGUID);
    const currentPlayer = useSelector(state =>  state.multiPlayerGame.currentPlayer);

    const clickHandler = () => {
        props.connection.invoke("StartGameFromServer", gameGuid).then()

    }

    if(currentPlayer.isHost) {
        console.log("inside start game button current player is", currentPlayer)
        return (
            <button onClick={clickHandler}>Start Game</button>
        )
    } else {
        return (
            <p>Waiting for host to start</p>
        )
    }

}