import { Tile } from "@/pieces/Tile/ui/Tile";
import { FunctionComponent, ReactNode, useState } from "react";
import scss from './TileScreen.module.scss';
import EmptyTile from '@/components/Game/assets/sprites/tile_init.png';
import PressedTile from '@/components/Game/assets/sprites/tile_empty.png'
import { generateRandomString } from "@/pieces/tools/stringGenerator";

function renderBoard(size: number) {
    const gen = [];
    for (let i = 0; i < size; i++) {
        gen.push([] as ReactNode[]);
        for (let j = 0; j < size; j++) {
            gen[i].push(<Tile
                defaultSprite={EmptyTile}
                pressedSprite={PressedTile}
                key={generateRandomString(5) + i}
            />);
        }
    }
    return gen;
}

export interface TilesScreenProps {
    boardSize: number;
}

export const TileScreen: FunctionComponent<TilesScreenProps> = ({ boardSize }) => {

    const gen = renderBoard(boardSize);
    return (
        <div
            className={scss.TileScreen}
        >
            {
                gen.map((row, rowInd) =>
                    <div
                        className={scss.row}
                        key={generateRandomString(5) + rowInd}
                    >
                        {
                            row.map((col, colInd) =>
                                <div 
                                    className={ scss.col } 
                                    data-row={ rowInd }
                                    data-col={ colInd }
                                    key={ generateRandomString(5) + rowInd }
                                >
                                    {col}
                                </div>)
                        }
                    </div>)
            }
        </div>
    );
}