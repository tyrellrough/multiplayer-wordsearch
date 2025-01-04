import {createSlice} from '@reduxjs/toolkit';

export const multiPlayerGameSlice = createSlice({
    name: 'multiPlayerGame',
    initialState: {
        gameGUID : "",
        gameName : "",
        currentPageState: "",
    },
    reducers: {
        setCurrentPageState: (state, action) => {
            state.currentPageState = action.payload;
        },
    }
})

export const {setCurrentPageState} = multiPlayerGameSlice.actions;
export default multiPlayerGameSlice.reducer;