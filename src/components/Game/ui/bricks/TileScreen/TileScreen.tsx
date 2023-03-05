import { Tile } from "@/pieces/Tile/ui/Tile";
import { Dispatch, FunctionComponent, memo, ReactNode, useMemo, useState } from "react";
import scss from './TileScreen.module.scss';
import InitTile from '@/components/Game/assets/sprites/tile_init.png';
import EmptyTile from '@/components/Game/assets/sprites/tile_empty.png';
import Tile1 from '@/components/Game/assets/sprites/tile_one.png';
import Tile2 from '@/components/Game/assets/sprites/tile_two.png';
import Tile3 from '@/components/Game/assets/sprites/tile_three.png';
import Tile4 from '@/components/Game/assets/sprites/tile_four.png';
import Tile5 from '@/components/Game/assets/sprites/tile_five.png';
import Tile6 from '@/components/Game/assets/sprites/tile_six.png';
import Tile7 from '@/components/Game/assets/sprites/tile_seven.png';
import Tile8 from '@/components/Game/assets/sprites/tile_eight.png';
import BombTile from '@/components/Game/assets/sprites/bomb_pressed.png';
import CrossedBomb from '@/components/Game/assets/sprites/bomb_crossed.png';
import RedBombTile from '@/components/Game/assets/sprites/bomb_red.png';
import TileQuestion from '@/components/Game/assets/sprites/tile_qm_init.png';
import FlagTile from '@/components/Game/assets/sprites/tile_flag.png';
import { generateRandomString } from "@/pieces/tools/stringGenerator";
import { storeType } from "@/app/providers/store";
import { useDispatch, useSelector } from "react-redux";
import { gameSliceState, handleRightClick, initializeBoard, tryOpen } from "@/app/providers/store/slices/gameSlice";
import { AnyAction } from "@reduxjs/toolkit";

function getSprite(number: number): string {
    switch (number) {
        case 0:
            return EmptyTile;
        case 1:
            return Tile1;
        case 2:
            return Tile2;
        case 3:
            return Tile3;
        case 4:
            return Tile4;
        case 5:
            return Tile5;
        case 6:
            return Tile6;
        case 7:
            return Tile7;
        case 8:
            return Tile8;
        default:
            return EmptyTile;
    }
}

function renderBoard(state: gameSliceState, dispatch: Dispatch<AnyAction>): ReactNode[][] {
    const gen = [];
    for (let i = 0; i < state.board_size; i++) {
        gen.push([] as ReactNode[]);
        for (let j = 0; j < state.board_size; j++) {
            let ToRender = InitTile;
            if (state.gameStarted) {
                if (state.player_discovery[i][j] == 0)
                    ToRender = InitTile;
                else if (state.player_discovery[i][j] == 1)
                    ToRender = getSprite(state.board[i][j]);
                else if (state.player_discovery[i][j] == -1)
                    ToRender = BombTile;
                else if (state.player_discovery[i][j] == 2)
                    ToRender = FlagTile
                else if (state.player_discovery[i][j] == -2)
                    ToRender = RedBombTile;
                else if (state.player_discovery[i][j] == 3)
                    ToRender = TileQuestion;
                else if (state.player_discovery[i][j] == -3)
                    ToRender = CrossedBomb;
            }
            gen[i].push(useMemo(() => (<Tile
                defaultSprite={ToRender}
                pressedSprite={EmptyTile}
                key={`${i}-${j}-tile`}
                isTile={true}
                whenClick={() => {
                    if (!state.gameStarted) {
                        dispatch(initializeBoard({x : i, y : j}));
                    }
                    else {
                        dispatch(tryOpen({x : i, y : j}));
                    }
                }}
                whenRightClick={() => {
                    dispatch(handleRightClick({x : i, y : j}));
                }}
                gameFinished={state.game_lost || state.game_won}
            />), [ToRender, state.gameStarted, state.game_won, state.game_lost]));
        }
    }
    return gen;
}

export const TileScreen: FunctionComponent = () => {

    const st = useSelector((state: storeType) => state.gameReducer);
    const dispatch = useDispatch();

    const gen = renderBoard(st, dispatch);
    return (
        <div
            className={scss.TileScreen}
            onContextMenu={(e) => { e.preventDefault() }}
        >
            {
                gen.map((row, rowInd) =>
                    <div
                        className={scss.row}
                        key={`${rowInd}-row`}
                    >
                        {
                            row.map((col, colInd) =>
                                <div 
                                    className={ scss.col } 
                                    data-row={ rowInd }
                                    data-col={ colInd }
                                    key={ `${rowInd}-${colInd}-col` }
                                >
                                    { col }
                                </div>)
                        }
                    </div>)
            }
        </div>
    );
}