import PuzzleSizeRadioGroup from "./PuzzleSizeRadioGroup.jsx";

import WordThemeDropDown from "./WordThemeDropDown.jsx";
import GameName from "./GameName.jsx";
import GameGuid from "./GameGuid.jsx";

export default function MultiplayerGameOptionsSelector() {

    return(
        <div className="flex flex-col items-center gap-1 pb-4">
            <p className="underline text-2xl">Puzzle Size</p>
            <PuzzleSizeRadioGroup/>

            <p className="underline text-2xl">Word Theme</p>
            <WordThemeDropDown/>
            <p className="underline text-2xl">Game Name</p>
            <GameName/>
            <GameGuid />

        </div>
    );
}