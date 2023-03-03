import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit/dist/configureStore";


const rootReducer = combineReducers({

});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
}