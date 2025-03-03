import ColouredStrikeThroughText from "./ColouredStrikeThroughText.jsx";

export default function WordListElementMultiplayer(props) {

    let hexColour;
    //const bg = "bg-wordSearch-green";
    switch (props.word.colour) {
        case "rgba(3, 250, 3, 0.7)":
            hexColour="decoration-[#03FA03B2]"
            break;
        case "rgba(244,245,1,0.7)":
            hexColour="decoration-[#F4F501B2]"
            break;
        case "rgba(246,6,7,0.7)":
            hexColour="decoration-[#F60607B2]"
            break;
        case "rgba(238, 90, 6, 0.7)":
            hexColour="decoration-[#EE5A06B2]"
            break;
        case "rgba(121, 3, 241, 0.7)":
            hexColour="decoration-[#7903F1B2]"
            break;
        case "rgba(2, 3, 237, 0.7)":
            hexColour="decoration-[#0203EDB2]"
            break;
        case "rgba(243, 58, 106, 0.7)":
            hexColour="decoration-[#F33A6AB2]"
            break;
        case "rgba(4, 139, 194, 0.7)":
            hexColour="decoration-[#048BC2B2]"
            break;
        default:
            hexColour="decoration-[#03FA03B2]"
            break;
    }


    if(props.word.isFound) {
        return (
           <ColouredStrikeThroughText colour={hexColour} text={props.word.text}/>
        )
    } else {
        return (
            <p>{props.word.text}</p>
        )
    }
}