import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import WordListElementMultiplayer from "./WordListElementMultiplayer.jsx";
import ColourChanger from "../gameMultiplayer/ColourChanger.jsx";
import Colours from "../gameBoard/Colours.js";

export default function MultiplayerWordsList(props) {

    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const [words, setWords] = useState([]);


    function getWords() {
        props.connection.invoke("GetGameWords", gameGUID).then(wordsResult => {
            setWords(wordsResult);
        })
    }

    props.connection.on("UpdateWordsList", words => {
        console.log("updatewordslist", words);
        setWords(words);
    })

    useEffect(() => {
        getWords();
    }, [])

    return (
        <div className={"flex flex-wrap flex-row justify-center gap-2 sm:flex-col sm:gap-0"}>
            {words.map((word, index) => (
                <WordListElementMultiplayer key={index} word={word}/>
            ))}
        </div>
    )
}