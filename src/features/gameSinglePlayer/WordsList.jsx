import WordsListElement from "./WordsListElement.jsx";
import {useEffect, useState} from "react";

export default function WordsList(props) {



        return (
            <div
                className="overflow-y-auto overflow-x-hidden text-xl flex flex-row flex-wrap gap-2 sm:max-h-[75vh] sm:flex-col sm:flex-nowrap sm:text-3xl sm:gap-4 justify-center items-center">

                {props.wordsList.map((word, index) => (
                    <WordsListElement key={index} word={word}/>
                ))}
            </div>
        );



}