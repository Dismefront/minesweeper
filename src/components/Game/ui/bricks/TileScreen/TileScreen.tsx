import { Tile } from "@/pieces/Tile/ui/Tile";
import { FunctionComponent, memo, ReactNode, useMemo, useState } from "react";
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
import Tile9 from '@/components/Game/assets/sprites/tile_nine.png';
import { generateRandomString } from "@/pieces/tools/stringGenerator";
import { storeType } from "@/app/providers/store";
import { useDispatch, useSelector } from "react-redux";
import { gameSliceState, initializeBoard } from "@/app/providers/store/slices/gameSlice";

function getSprite(number: number): string | undefined {
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
        case 9:
            return Tile9;
        default:
            return undefined;
    }
}

function renderBoard(state: gameSliceState): ReactNode[][] {
    const gen = [];
    const dispatch = useDispatch();
    for (let i = 0; i < state.board_size; i++) {
        gen.push([] as ReactNode[]);
        for (let j = 0; j < state.board_size; j++) {
            if (!state.gameStarted) {
                gen[i].push(useMemo(() => (<Tile
                    defaultSprite={InitTile}
                    pressedSprite={EmptyTile}
                    key={`${i}-${j}-tile`}
                    onClick={() => { 
                        dispatch(initializeBoard({ x: i, y: j }));
                        console.log("NYA"); //logg
                    }}
                    isTile={true}
                />), [InitTile]));
                continue;
            }
            let ToRender: string | undefined;
            if (state.player_discovery[i][j] == 0)
                ToRender = InitTile;
            if (state.player_discovery[i][j] == 1)
                ToRender = getSprite(state.board[i][j]);
        
            gen[i].push(<Tile
                defaultSprite={ToRender}
                pressedSprite={EmptyTile}
                key={`${i}-${j}-tile`}
                onClick={() => { 
                    console.log("HUI"); // logg
                }}
                isTile={true}
            />);
        }
    }
    return gen;
}

export const TileScreen: FunctionComponent = () => {

    const st = useSelector((state: storeType) => state.gameReducer);

    const gen = renderBoard(st);
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