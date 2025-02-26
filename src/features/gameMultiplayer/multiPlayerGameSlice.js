import {createSlice} from '@reduxjs/toolkit';

export const multiPlayerGameSlice = createSlice({
    name: 'multiPlayerGame',
    initialState: {
        gameGUID : "",
        gameName : "",
        gameSize: "",
        gameTheme: "",
        currentPageState: "",
        lobbyState: "",
        connectionState: "",
        currentPlayerColour: "",
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
        },
        setLobbyState: (state, action) => {
            state.lobbyState = action.payload;
        },
        setGameSize: (state, action) => {
            state.gameSize = action.payload;
        },
        setWordsTheme: (state, action) => {
            state.gameTheme = action.payload;
        },
        setCurrentPlayerColour: (state, action) => {
            state.currentPlayerColour = action.payload;
        }
    }
})

export const {setCurrentPageState, setGameName,
    setGameGUID, setLobbyState,
    setGameSize, setWordsTheme, setCurrentPlayerColour} = multiPlayerGameSlice.actions;
export default multiPlayerGameSlice.reducer;