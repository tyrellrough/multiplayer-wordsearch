import {createSlice} from '@reduxjs/toolkit';

const screenSlice = createSlice({
    name: 'screen',
    initialState: { isFullscreen: false },
    reducers: {
        setFullScreen: (state, action) => {
            state.isFullscreen = action.payload;
        }

    }
})

export const {setFullScreen} = screenSlice.actions;
export default screenSlice.reducer;
