import ColouredSquare from "../gameMultiplayer/ColouredSquare.jsx";

export default function PlayerStatElement(props) {

    let bg;
    //const bg = "bg-wordSearch-green";
    switch (props.player.colour) {
        case "green":
            bg = "bg-wordSearch-green";
            break;
        case "yellow":
            bg = "bg-wordSearch-yellow";
            break;
        case "red":
            bg = "bg-wordSearch-red";
            break;
        case "orange":
            bg = "bg-wordSearch-orange";
            break;
        case "purple":
            bg = "bg-wordSearch-purple";
            break;
        case "darkBlue":
            bg = "bg-wordSearch-darkBlue";
            break;
        case "pink":
            bg = "bg-wordSearch-pink";
            break;
        case "blue":
            bg = "bg-wordSearch-blue";
            break;
        default:
            bg = "";
            break;
    }

    return (
        <div className={"flex items-center justify-center gap-2"}>
            <p>{props.player.name}</p>
            <ColouredSquare colour={bg}/>
            <p>{props.player.wordsFoundCount}</p>
        </div>
    );
}