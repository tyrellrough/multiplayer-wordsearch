import {createSlice} from '@reduxjs/toolkit';

export const singlePlayerGameSlice = createSlice({
    name: 'singlePlayerGame',
    initialState: {
        wordsList : [],
    },
    reducers: {
        setWordsList: (state, action) => {
            state.wordsList = action.payload;
        },
    }
})

export const {setWordsList} = singlePlayerGameSlice.actions;
export default singlePlayerGameSlice.reducer;