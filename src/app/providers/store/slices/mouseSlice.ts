import { createSlice } from "@reduxjs/toolkit";

const mouseSlice = createSlice({
    name: 'mouseSlice',
    initialState: {
        pressed: false
    },
    reducers: {
        mouseUp(state) {
            console.log("WHO")
            state.pressed = false;
        },

        mouseDown(state) {
            console.log("ME")
            state.pressed = true;
        }
    }
});

export const mouseReducer = mouseSlice.reducer;
export const { mouseUp, mouseDown } = mouseSlice.actions;