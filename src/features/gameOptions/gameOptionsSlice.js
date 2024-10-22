import {createSlice} from '@reduxjs/toolkit';
//import {createApi} from '@reduxjs/toolkit/query/react'

const initialState = { value: {
        puzzleSize: 'medium',
        wordTheme: 'fruit',
        wordThemeList: '',
        wordThemeStatus: 'idle',
    }
}

// const fetchWordThemes = createAsyncThunk(
//     'gameOptions/fetchWordThemes',
// )

const gameOptionsSlice = createSlice({
    name: 'gameOptions',
    initialState: initialState,
    reducers: {
        setPuzzleSize: (state, action) => {
            state.value = action.payload;
        },
        setWordTheme: (state, action) => {
            state.value = action.payload;
        }
    }
})
