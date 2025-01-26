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
        }
    }
})

export const {setCurrentPageState, setGameName,
    setGameGUID, setLobbyState,
    setGameSize, setWordsTheme} = multiPlayerGameSlice.actions;
export default multiPlayerGameSlice.reducer;