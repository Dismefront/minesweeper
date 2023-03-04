import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface gameSliceState {
    gameStarted: boolean,
    board: number[][],
    player_discovery: number[][],
    board_size: number,
    game_won: boolean,
    game_lost: boolean,
    bomb_count: number
}

export interface InitActionPayload {
    x: number,
    y: number,
}

const init_state: gameSliceState = {
    gameStarted: false,
    board: [],
    player_discovery: [],
    board_size: 16,
    game_won: false,
    game_lost: false,
    bomb_count: 40
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
            state.bomb_count = 40;
        },



        initializeBoard(state, action: PayloadAction<InitActionPayload>) {
            const { x, y } = action.payload;
            /**
             * board:
             * -1 - bomb
             * 0 - empty
             * 1 - 9 - bombs in area
             * 
             * player_discovery:
             * -2 - red bomb
             * -1 - bomb
             * 0 - not discovered
             * 1 - discovered
             * 2 - flag
             * 3 - question
             */

            // initializing necessary variables
            for (let i = 0; i < state.board_size; i++) {
                const innerArrBoard: number[] = []
                const innerArrPlayer: number[] = []
                for (let j = 0; j < state.board_size; j++) {
                    innerArrBoard.push(0);
                    innerArrPlayer.push(0);
                }
                state.board.push(innerArrBoard);
                state.player_discovery.push(innerArrPlayer);
            }
            
            let chance = 1;
            const randomEvent = () => {
                if (chance < 0.01)
                    return false;
                return Math.random() <= chance;
            }

            // defining the empty zone
            const dfs_stack = [[x, y]]
            let directionsX = [0, 0, 1, -1];
            let directionsY = [1, -1, 0, 0];
            while (dfs_stack.length > 0) {
                let cur = dfs_stack.pop() as number[];
                state.player_discovery[cur[0]][cur[1]] = 1;
                for (let i = 0; i < 4; i++) {
                    let newX = cur[0] + directionsX[i];
                    let newY = cur[1] + directionsY[i];
                    if (newX >= 0 && newX < state.board_size
                            && newY >= 0 && newY < state.board_size
                            && randomEvent() && !state.player_discovery[newX][newY])
                        dfs_stack.push([newX, newY]);
                }
                chance -= 0.1;
            }

            // placing bombs
            const getRandomXY = () => {
                return [
                    Math.floor(Math.random() * state.board_size),
                    Math.floor(Math.random() * state.board_size)
                ];
            }

            let currentBombCnt = 0;
            while (currentBombCnt != state.bomb_count) {
                const rnd = getRandomXY();
                if (state.player_discovery[rnd[0]][rnd[1]])
                    continue;
                state.board[rnd[0]][rnd[1]] = -1;
                currentBombCnt++;
            }

            // counting area around bombs
            directionsX = [0, 0, -1, 1, 1, -1, 1, -1];
            directionsY = [1, -1, 0, 0, 1, 1, -1, -1];
            for (let i = 0; i < state.board_size; i++) {
                for (let j = 0; j < state.board_size; j++) {
                    if (state.board[i][j] == -1)
                        continue;
                    for (let k = 0; k < 8; k++) {
                        const cur = [i + directionsX[k], j + directionsY[k]];
                        if (cur[0] >= 0 && cur[0] < state.board_size
                                && cur[1] >= 0 && cur[1] < state.board_size
                                && state.board[cur[0]][cur[1]] == -1)
                            state.board[i][j]++;
                    }
                }
            }
        },

        
    }
});

export const gameReducer = gameSlice.reducer;
export const { initializeBoard, refresh } = gameSlice.actions;