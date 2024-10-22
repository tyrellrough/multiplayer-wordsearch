import {createSlice} from '@reduxjs/toolkit';

export const pageSwitcherSlice = createSlice({
    name: 'pageSwitcher',
    initialState: 'mainMenu',
    reducers: {
        changePage: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {changePage} = pageSwitcherSlice.actions;
export default pageSwitcherSlice.reducer;