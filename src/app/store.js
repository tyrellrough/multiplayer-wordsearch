import { configureStore } from '@reduxjs/toolkit'

import gameOptionsReducer from "../features/gameOptions/gameOptionsSlice.js";
import pageSwitcherReducer from "../features/pageSwitcher/pageSwitcherSlice.js";
import screenReducer from "../features/screen/screenSlice.js";

export const store = configureStore({
    reducer: {
        gameOptions: gameOptionsReducer,
        pageSwitcher: pageSwitcherReducer,
        screen: screenReducer,
    }
})

