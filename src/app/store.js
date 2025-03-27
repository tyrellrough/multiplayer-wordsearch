import { configureStore } from '@reduxjs/toolkit'
import { wordSearchAPI } from "../services/wordSearchAPI.js";


import gameOptionsReducer from "./../features/gameOptions/gameOptionsSlice.js";
import pageSwitcherReducer from "../features/pageSwitcher/pageSwitcherSlice.js";
import screenReducer from "../features/screen/screenSlice.js";
import singlePlayerGameReducer from "../features/gameSinglePlayer/singlePlayerGameSlice.js";
import multiplayerGameReducer from "../features/gameMultiPlayer/multiPlayerGameSlice.js";
import gameAudioReducer from "../features/audio/gameAudioSlice.js";

export const store = configureStore({
    reducer: {
        gameOptions: gameOptionsReducer,
        pageSwitcher: pageSwitcherReducer,
        screen: screenReducer,
        singlePlayerGame: singlePlayerGameReducer,
        multiPlayerGame: multiplayerGameReducer,
        gameAudio: gameAudioReducer,
        [wordSearchAPI.reducerPath]: wordSearchAPI.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(wordSearchAPI.middleware),
})



