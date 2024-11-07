import {createSlice} from '@reduxjs/toolkit';

const screenSlice = createSlice({
    name: 'screen',
    initialState: { isFullscreen: false },
    reducers: {
        toggleFullscreenState: (state) => {

        }

    }
})

export const {toggleFullscreenState} = screenSlice.actions;
export default screenSlice.reducer;
