import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import WordListElementMultiplayer from "../gameBoardMultiplayer/WordListElementMultiplayer.jsx";

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
        <div>
            {words.map((word, index) => (
                <WordListElementMultiplayer key={index} word={word}/>
            ))}
        </div>
    )
}