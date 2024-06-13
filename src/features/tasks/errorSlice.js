import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        message: null,
    },
    reducers: {
        addError: (state, action) => {
            
            state.message = action.payload;
        },
        clearError: state => {
            state.message = null;
        },
    },
});

export const { addError, clearError } = errorSlice.actions;
export default errorSlice.reducer;