import PlayerNameChanger from "./PlayerNameChanger.jsx";
import PlayerColourInfo from "./PlayerColourInfo.jsx";

export default function PlayerInfo(props) {



    return (
        <div className={"flex w-full px-5"}>
            <p>{props.playerNum + 1}</p>
            <div className={"flex w-full justify-between border border-black rounded-lg"}>


                {props.currentPlayer.playerID === props.player.playerID ?
                    <PlayerNameChanger connection={props.connection}
                                       playerName={props.player.name}
                                       gameGuid={props.gameGUID}
                    /> : <p>{props.player.name}</p>}

                <PlayerColourInfo connection={props.connection} player={props.player}/>
            </div>
        </div>

    )
}