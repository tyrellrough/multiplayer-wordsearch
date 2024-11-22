import PuzzleSizeRadioGroup from "./PuzzleSizeRadioGroup.jsx";
import {useGetCategoriesQuery, useGetWordsByCategoryQuery} from "../../services/wordSearchAPI.js";
import WordThemeDropDown from "./WordThemeDropDown.jsx";

export default function SinglePlayerGameOptionsSelector() {



    return(
        <div className="flex flex-col items-center gap-1 pb-4">
            <p className="underline text-2xl">Puzzle Size</p>
            <PuzzleSizeRadioGroup />

            <p className="underline text-2xl">Word Theme</p>
            <WordThemeDropDown />
        </div>
    );
}