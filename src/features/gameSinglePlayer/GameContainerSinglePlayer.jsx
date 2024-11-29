
import {useGetWordsByCategoryQuery} from "../../services/wordSearchAPI.js";
import {useDispatch, useSelector} from "react-redux";

import WordSP from "../gameBoard/WordSP.js";
import {useEffect, useState} from "react";
import WordsList from "./WordsList.jsx";
import WordSearchCanvas from "./WordSearchCanvas.jsx";



export default function GameContainerSinglePlayer() {

    //const dispatch = useDispatch();
    const categoryName = useSelector((state) => state.gameOptions.wordsCategory);
    const maxNumberOfWords = useSelector((state) => state.gameOptions.maxNumberOfWords);
    const maxWordLength = useSelector((state) => state.gameOptions.maxWordLength);
    const puzzleWidth = useSelector((state) => state.gameOptions.puzzleWidth);

    const argumentsObject = {};
    argumentsObject.categoryName = categoryName;
    argumentsObject.maxNumberOfWords = maxNumberOfWords;
    argumentsObject.maxWordLength = maxWordLength;


    //Need to sort out success thing. its loading after rendering.
    const {data,error, isSuccess, isLoading}  = useGetWordsByCategoryQuery(argumentsObject);
    const [wordsList, setWordsList] = useState([]);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if(isSuccess) {
            data.forEach((word) => {
                wordsList.push(new WordSP(word.text, false))
                console.log("pushing new")
            })
            setIsDone(true);
        }

    }, [data,wordsList,isSuccess]);

    if(!isDone) {
        return (
            <div>
                <p>loading!</p>
            </div>
        );
    } else {
        return(
                <div className="h-[90vh] flex gap-2 sm:flex-row flex-col place-items-center justify-center w-full">
                    <WordSearchCanvas wordsList={wordsList} setWordsList={setWordsList} boardWidth={puzzleWidth} />
                    <WordsList wordsList={wordsList}/>
                </div>
        );
    }




}