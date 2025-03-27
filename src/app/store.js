import { configureStore } from '@reduxjs/toolkit'
import { wordSearchAPI } from "../services/wordSearchAPI.js";

//import gameOptionsReducer from "../features/gameOptions/gameOptionsSlice.js";
import gameOptionsReducer from "src/features/gameOptions/gameOptionsSlice.js";
import pageSwitcherReducer from "src/features/pageSwitcher/pageSwitcherSlice.js";
import screenReducer from "src/features/screen/screenSlice.js";
import singlePlayerGameReducer from "src/features/gameSinglePlayer/singlePlayerGameSlice.js";
import multiplayerGameReducer from "src/features/gameMultiPlayer/multiPlayerGameSlice.js";
import gameAudioReducer from "src/features/audio/gameAudioSlice.js";

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



