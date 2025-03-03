import {Fragment, useEffect, useState} from "react";
import ColouredSquare from "./ColouredSquare.jsx";
import {setCurrentPlayerColour} from "./multiPlayerGameSlice.js";
import {useDispatch} from "react-redux";
import colours from "../gameBoard/Colours.js";
import Colours from "../gameBoard/Colours.js";


export default function ColourChanger(props) {
    const [availableColours, setAvailableColours] = useState([]);
    const [newColour, setNewColour] = useState("");
    const dispatch = useDispatch();
    const colours = new Colours();

    async function GetAvailableColours() {
        props.connection.invoke("GetAvailableColours", props.gameGuid).then(
            (availableColours) => {
                availableColours.unshift("Change Colour")
                setAvailableColours(availableColours);
                console.log(availableColours);
            }
        )
    }

    props.connection.on("UpdateAvailableColours", () => {
        GetAvailableColours().then();
    })

    useEffect(() => {
        GetAvailableColours().then()
    }, [])

    function changeColour(e) {
        if(e.target.value !== "Change Colour") {
            setNewColour(e.target.value);

            const colourARGB = colours.convertColourNameToRGBA(e.target.value);
            dispatch(setCurrentPlayerColour(colourARGB));
            console.log(e.target.value);
            props.connection.invoke("UpdatePlayerColour", e.target.value, props.gameGuid).then(() => {
                    GetAvailableColours().then();
                }
            );
        }

    }

    return(
        <Fragment>
            <select
                value={newColour}
                onChange={(e) => changeColour(e)}
            >
                {availableColours.map((colour, index) => (
                    <option key={index} value={colour}>{colour}</option>
                ))}
            </select>
        </Fragment>
    )

}
