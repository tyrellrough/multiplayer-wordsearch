export default function LobbyGameDetailsElement(props) {

    return(
        <div>
            <p>{props.gameName}</p>
            <p>{props.numPlayers}</p>
            <p>{props.maxPlayers}</p>
            <button>Join</button>
        </div>
    );


}