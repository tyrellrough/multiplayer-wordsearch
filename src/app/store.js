import { configureStore } from '@reduxjs/toolkit'
import { wordSearchAPI } from "../services/wordSearchAPI.js";

//trying to fix these
import gameOptionsReducer from './../features/gameOptions/gameOptionsSlice';
import pageSwitcherReducer from './../features/pageSwitcher/pageSwitcherSlice';
import screenReducer from './../features/screen/screenSlice';
import singlePlayerGameReducer from './../features/gameSinglePlayer/singlePlayerGameSlice';
import gameAudioReducer from './../features/audio/gameAudioSlice';
import multiPlayerGameReducer from './../features/gameMultiPlayer/multiPlayerGameSlice';

export const store = configureStore({
    reducer: {
        gameOptions: gameOptionsReducer,
        pageSwitcher: pageSwitcherReducer,
        screen: screenReducer,
        singlePlayerGame: singlePlayerGameReducer,
        multiPlayerGame: multiPlayerGameReducer,
        gameAudio: gameAudioReducer,
        [wordSearchAPI.reducerPath]: wordSearchAPI.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(wordSearchAPI.middleware),
})



