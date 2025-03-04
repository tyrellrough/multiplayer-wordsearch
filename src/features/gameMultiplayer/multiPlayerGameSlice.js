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
        isHost: false,
        currentPlayer: {},
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
        },
        setIsHost: (state, action) => {
            state.isHost = action.payload;
        },
        setCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload;
        }
    }
})

export const {setCurrentPageState, setGameName,
    setGameGUID, setLobbyState,
    setGameSize, setWordsTheme, setCurrentPlayerColour, setIsHost, setCurrentPlayer} = multiPlayerGameSlice.actions;
export default multiPlayerGameSlice.reducer;