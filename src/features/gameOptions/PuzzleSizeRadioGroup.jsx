import {useDispatch, useSelector} from 'react-redux'
import {setPuzzleSize} from "./gameOptionsSlice.js";
import {Fragment} from 'react'

export default function PuzzleSizeRadioGroup() {
    const puzzleSizeSelector = useSelector(state => state.gameOptions.value.puzzleSize);
    const dispatch = useDispatch();

    const onPuzzleSizeChange = (e) => {
        dispatch(setPuzzleSize(e.target.value))
    }

    return(
        <Fragment>
            <div>
                <div>
                    <label htmlFor="board-size-small">Small</label>
                    <label htmlFor="board-size-medium">Medium</label>
                    <label htmlFor="board-size-large">Large</label>
                    <label htmlFor="board-size-extra-large">Extra Large</label>
                </div>

                <div>
                    <input type="radio" value="small" name="board-size" id="board-size-small"
                           checked={puzzleSizeSelector === "small"}
                           onChange={onPuzzleSizeChange}/>
                    <input type="radio" value="medium" name="board-size" id="board-size-medium"
                           checked={puzzleSizeSelector === "medium"}
                           onChange={onPuzzleSizeChange}/>
                    <input type="radio" value="large" name="board-size" id="board-size-large"
                           checked={puzzleSizeSelector === "large"}
                           onChange={onPuzzleSizeChange}/>
                    <input type="radio" value="extra-large" name="board-size" id="board-size-extra-large"
                           checked={puzzleSizeSelector === "extra-large"}
                           onChange={onPuzzleSizeChange}/>
                </div>
            </div>


        </Fragment>
    );
}