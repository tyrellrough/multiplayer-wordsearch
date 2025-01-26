export default function GameInfoElement(props) {


    return (
            <div className="flex justify-between w-96 gap-4">
                <div className="flex flex-col justify-center w-full">
                    <div className="flex justify-between">
                        <p>{props.gameName}</p>
                        <div>
                            <p>{props.playerCount}/{props.maxPlayerCount}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>Theme: {props.theme}</p>
                        <p>Size: {props.size}</p>
                    </div>
                </div>
                <button>Join</button>
            </div>

    )
}