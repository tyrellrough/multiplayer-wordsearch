import {createSlice} from '@reduxjs/toolkit';


const initialState = { value: {
        puzzleSize: 'medium',
        wordTheme: 'fruits',
        wordThemeStatus: 'idle',
    }
}

const gameOptionsSlice = createSlice({
    name: 'gameOptions',
    initialState: initialState,
    reducers: {
        setPuzzleSize: (state, action) => {
            state.value.puzzleSize = action.payload;
        },
        setWordTheme: (state, action) => {
            state.value.wordTheme = action.payload;
        }
    }
})

export const {setPuzzleSize, setWordTheme} = gameOptionsSlice.actions;
export default gameOptionsSlice.reducer;
