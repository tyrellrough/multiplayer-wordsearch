import {createSlice} from '@reduxjs/toolkit';

export const pageSwitcherSlice = createSlice({
    name: 'pageSwitcher',
    initialState: {
        currentPage: 'mainMenu',
        previousPage: 'mainMenu',
    },
    reducers: {
        changePage: (state, action) => {
            state.previousPage = state.currentPage;
            state.currentPage = action.payload;
        },
        backPage: (state) => {

            state.currentPage = state.previousPage;
        }
    }
})

export const {changePage, backPage} = pageSwitcherSlice.actions;
export default pageSwitcherSlice.reducer;