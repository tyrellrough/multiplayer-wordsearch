import {createSlice} from '@reduxjs/toolkit';

export const gameAudioSlice = createSlice({
    name: 'gameAudio',
    initialState: {
        isOn : true,
    },
    reducers: {
        setAudioState: (state, action) => {
            state.isOn = action.payload;
        },
    }
})

export const {setAudioState} = gameAudioSlice.actions;
export default gameAudioSlice.reducer;