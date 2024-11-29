import {createSlice} from '@reduxjs/toolkit';


const initialState = { 
        puzzleSize: 'medium',
        wordsCategory: 'fruits',
        puzzleWidth: 10,
        maxWordLength: 10,
        maxNumberOfWords: 8,
}

const gameOptionsSlice = createSlice({
    name: 'gameOptions',
    initialState: initialState,
    reducers: {
        setPuzzleSize: (state, action) => {
            state.puzzleSize = action.payload;

            switch (action.payload) {
                case "small":
                    state.maxNumberOfWords = 4;
                    state.puzzleWidth = 6;
                    state.maxWordLength = 6;
                    break;
                case "medium":
                    state.maxNumberOfWords = 8;
                    state.puzzleWidth = 10;
                    state.maxWordLength = 10;
                    break;
                case "large":
                    state.maxNumberOfWords = 12;
                    state.puzzleWidth = 16;
                    state.maxWordLength = 16;
                    break;
                case "extraLarge":
                    state.maxNumberOfWords = 20;
                    state.puzzleWidth = 20;
                    state.maxWordLength = 20;
            }
        },

        setWordsCategory: (state, action) => {
            state.wordsCategory = action.payload;
        }
    }
})

export const {setPuzzleSize, setWordsCategory} = gameOptionsSlice.actions;
export default gameOptionsSlice.reducer;
