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
        setGameGUID: (state, action) => {
            state.gameGUID = action.payload;
        },
        setGameName: (state, action) => {
            state.gameName = action.payload;
        }
    }
})

export const {setCurrentPageState, setGameName, setGameGUID} = multiPlayerGameSlice.actions;
export default multiPlayerGameSlice.reducer;