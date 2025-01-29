import {Fragment, useEffect, useState} from "react";
import ColouredSquare from "./ColouredSquare.jsx";
import GameInfoElement from "./GameInfoElement.jsx";

export default function ColourChanger(props) {
    const [availableColours, setAvailableColours] = useState([]);
    const [newColour, setNewColour] = useState("");

    async function GetAvailableColours() {
        props.connection.invoke("GetAvailableColours", props.gameGuid).then(
            (availableColours) => {
                setAvailableColours(availableColours);
                console.log(availableColours);
            }
        )
    }

    useEffect(() => {
        GetAvailableColours().then()
    }, [])

    function changeColour(e) {
        setNewColour(e.target.value);
        console.log(e.target.value);
        props.connection.invoke("UpdatePlayerColour", e.target.value, props.gameGuid).then(() => {
                GetAvailableColours().then();
        }

        );
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
            <ColouredSquare colour={"bg-wordSearch-pink"}/>
        </Fragment>
    )

}
