import PlayerNameChanger from "./PlayerNameChanger.jsx";
import ColouredSquare from "./ColouredSquare.jsx";
import ColourChanger from "./ColourChanger.jsx";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function PlayerColourInfo(props) {

    const currentPlayer = useSelector(state => state.multiPlayerGame.currentPlayer);

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
       <Fragment>
           <p>{props.player.colour}</p>
           <ColouredSquare colour={bg} />
           {currentPlayer.playerID === props.player.playerID ?
               <ColourChanger connection={props.connection} currentColour={currentPlayer.colour}
               /> : null}
       </Fragment>



    );
}