import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/gameSlice';
import { mouseReducer } from './slices/mouseSlice';

export const store = configureStore({
    reducer: {
        mouseReducer: mouseReducer,
        gameReducer: gameReducer
    }
});

export type storeType = ReturnType<typeof store.getState>