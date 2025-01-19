import {createSlice} from '@reduxjs/toolkit';

export const multiPlayerGameSlice = createSlice({
    name: 'multiPlayerGame',
    initialState: {
        gameGUID : "",
        gameName : "",
        gameSize: "",
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
        setConnectionState: (state, action) => {
            state.connectionState = action.payload;
        },
        setGameSize: (state, action) => {
            state.gameSize = action.payload;
        }
    }
})

export const {setCurrentPageState, setGameName,
    setGameGUID, setLobbyState,
    setGameSize} = multiPlayerGameSlice.actions;
export default multiPlayerGameSlice.reducer;