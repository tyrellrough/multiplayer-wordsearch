import WordsListElement from "./WordsListElement.jsx";
import {useEffect, useState} from "react";

export default function WordsList(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [listWordElements, setListWordElements] = useState("");

    useEffect(() => {
        console.log("worldslist component loaded", props.wordsList)
        const tempListWordElements = props.wordsList.map(
            word => <WordsListElement word={word} key={word.text}/>);
        setListWordElements(tempListWordElements);
        console.log("wordslist elements", listWordElements);
        setIsLoading(false);
    }, [props.wordsList]);

    if(isLoading) {
        return(
            <div>
                <p>Loading</p>
            </div>
        );
    } else {
        return (
            <div
                className="overflow-y-auto overflow-x-hidden flex flex-row flex-wrap gap-2 max-h-[87vh] sm:flex-col sm:flex-nowrap sm:gap-4 justify-center items-center">
                {listWordElements}
            </div>
        );
    }


}