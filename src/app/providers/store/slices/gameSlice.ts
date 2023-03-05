import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface gameSliceState {
    gameStarted: boolean,
    board: number[][],
    player_discovery: number[][],
    board_size: number,
    game_won: boolean,
    game_lost: boolean,
    bomb_count: number,
    flags_count: number
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
    bomb_count: 3,
    flags_count: 40
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
            state.bomb_count = 3;
        },

        handleRightClick(state, action: PayloadAction<InitActionPayload>) {
            const { x, y } = action.payload;
            if (!state.gameStarted)
                return;
            if (state.player_discovery[x][y] == 1)
                return;
            if (state.player_discovery[x][y] == 0)
                state.player_discovery[x][y] = 2;
            else if (state.player_discovery[x][y] == 2)
                state.player_discovery[x][y] = 3;
            else if (state.player_discovery[x][y] == 3)
                state.player_discovery[x][y] = 0;
        },

        tryOpen(state, action: PayloadAction<InitActionPayload>) {
            const { x, y } = action.payload;

            // is the guess is bad, we end the game
            if (state.board[x][y] == -1) {
                state.game_lost = true;
                state.player_discovery[x][y] = -2;
                for (let i = 0; i < state.board_size; i++) {
                    for (let j = 0; j < state.board_size; j++) {
                        if (state.player_discovery[i][j] == 2 && state.board[i][j] != -1)
                            state.player_discovery[i][j] = -3;
                        if (state.board[i][j] == -1 && i != x && j != y)
                            state.player_discovery[i][j] = -1;
                    }
                }
                return;
            }

            // try opening good units for the player
            const was: boolean[][] = [];
            for (let i = 0; i < state.board_size; i++) {
                was.push([]);
                for (let j = 0; j < state.board_size; j++)
                    was[i].push(false);
            }
            const dfs = (curx: number, cury: number) => {
                was[curx][cury] = true;
                state.player_discovery[curx][cury] = 1
                let directionsX = [0, 0, 1, -1];
                let directionsY = [1, -1, 0, 0];
                if (state.board[curx][cury] > 0)
                    return;
                for (let k = 0; k < 4; k++) {
                    let newx = curx + directionsX[k];
                    let newy = cury + directionsY[k];
                    if (newx < 0 || newx >= state.board_size || newy < 0 || newy >= state.board_size)
                        continue;
                    if (!was[newx][newy] && (state.player_discovery[newx][newy] == 1 ||
                        state.board[newx][newy] >= 0))
                        dfs(newx, newy);
                }
            }
            dfs(x, y);

            // check if the game is won
            let cnt = 0;
            for (let i = 0; i < state.board_size; i++) {
                for (let j = 0; j < state.board_size; j++) {
                    if (state.player_discovery[i][j] == 1 && state.board[i][j] != -1)
                        cnt++;
                }
            }
            if (cnt == state.board_size * state.board_size - state.bomb_count) {
                console.log("SDF")
                state.game_won = true;
            }
        },

        initializeBoard(state, action: PayloadAction<InitActionPayload>) {
            state.gameStarted = true;
            const { x, y } = action.payload;
            /**
             * board:
             * -1 - bomb
             * 0 - empty
             * 1 - 9 - bombs in area
             * 
             * player_discovery:
             * -3 - crossed bomb
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
            let dfs_stack = [[x, y]]
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

            //expanding player zone
            dfs_stack.push([x, y]);
            const was: boolean[][] = [];
            for (let i = 0; i < state.board_size; i++) {
                was.push([]);
                for (let j = 0; j < state.board_size; j++)
                    was[i].push(false);
            }

            let cnt = 0;
            const dfs = (curx: number, cury: number) => {
                was[curx][cury] = true;
                cnt++;
                state.player_discovery[curx][cury] = 1
                let directionsX = [0, 0, 1, -1];
                let directionsY = [1, -1, 0, 0];
                if (state.board[curx][cury] > 0)
                    return;
                for (let k = 0; k < 4; k++) {
                    let newx = curx + directionsX[k];
                    let newy = cury + directionsY[k];
                    if (newx < 0 || newx >= state.board_size || newy < 0 || newy >= state.board_size)
                        continue;
                    if (!was[newx][newy] && (state.player_discovery[newx][newy] == 1 ||
                        state.board[newx][newy] >= 0))
                        dfs(newx, newy);
                }
            }
            dfs(x, y);
            if (cnt == state.board_size * state.board_size - state.bomb_count)
                state.game_won = true;
        },

        
    }
});

export const gameReducer = gameSlice.reducer;
export const { initializeBoard, refresh, tryOpen, handleRightClick } = gameSlice.actions;