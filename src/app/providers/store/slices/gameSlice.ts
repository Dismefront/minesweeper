import { createSlice } from "@reduxjs/toolkit";

export interface gameSliceInitState {
    gameStarted: boolean,
    board: number[][],
    player_discovery: number[],
    board_size: number,
    game_won: boolean,
    game_lost: boolean
}

const init_state: gameSliceInitState = {
    gameStarted: false,
    board: [],
    player_discovery: [],
    board_size: 16,
    game_won: false,
    game_lost: false
}

const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: init_state,
    reducers: {
        refresh(state) {
            state.gameStarted = false;
            state.board = [];
            state.player_discovery = [];
            state.game_won = false;
            state.game_lost = false;
        },

        initializeBoard(state) {
            /**
             * 0 - empty
             * 1 - 9 - bombs in area
             */
            for (let i = 0; i < state.board_size; i++) {
                const innerArr = []
                for (let j = 0; j < state.board_size; j++)
                    innerArr.push(0);
                state.board.push(innerArr);
            }
        }
    }
});

export const gameReducer = gameSlice.reducer;
export const { initializeBoard } = gameSlice.actions;