import PlayerNameChanger from "./PlayerNameChanger.jsx";
import ColouredSquare from "./ColouredSquare.jsx";
import ColourChanger from "./ColourChanger.jsx";
import {Fragment, useEffect, useState} from "react";

export default function PlayerInfo(props) {

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
            {props.currentPlayer.playerID === props.player.playerID ? <PlayerNameChanger connection={props.connection}
                                                                                         playerName={props.player.name}
                                                                                         gameGuid={props.gameGUID}/> :
                <p>{props.player.name}</p>}
            <div className="w-40">
                <p>{props.player.colour}</p>
                <ColouredSquare colour={bg}/>
            </div>
            {props.currentPlayer.playerID === props.player.playerID ? <ColourChanger connection={props.connection}
                                                                                     gameGuid={props.gameGUID}
                                                                                     currentColour={props.currentPlayer.colour}
                                                                                     currentPlayer={props.currentPlayer}/> :
                <div className="w-40"></div>}
        </Fragment>
    )
}