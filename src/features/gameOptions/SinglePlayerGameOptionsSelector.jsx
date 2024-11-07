import PuzzleSizeRadioGroup from "./PuzzleSizeRadioGroup.jsx";

export default function SinglePlayerGameOptionsSelector() {
    return(
        <div>
            <p>Single Player</p>

            <p>Puzzle Size</p>
            <PuzzleSizeRadioGroup />

            <p>Word Theme</p>
            <WordThemeDropDown />
        </div>
    );
}