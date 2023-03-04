import { storeType } from "@/app/providers/store";
import { FunctionComponent, useState, memo } from "react";
import { useSelector } from "react-redux";
import scss from './Tile.module.scss';

export interface TileProps {
    defaultSprite: string,
    pressedSprite?: string,
    height?: string,
    width?: string
}

export const Tile: FunctionComponent<TileProps> = memo(({
    defaultSprite, pressedSprite, height, width
}) => {

    const [display, changeDisplay] = useState<string>(defaultSprite);
    const isMouseDown = useSelector((state: storeType) => state.mouseReducer.pressed);

    const handleWhenEnter = () => {
        if (isMouseDown && pressedSprite)
            changeDisplay(pressedSprite);
    }

    const handleMouseLeave = () => {
        if (isMouseDown)
            changeDisplay(defaultSprite);
    }

    const handleMouseDown = () => {
        if (pressedSprite)
            changeDisplay(pressedSprite);
    }

    const handleMouseUp = () => {
        changeDisplay(defaultSprite);
    }

    return (
        <button
            className={scss.Tile}
            onMouseEnter={ handleWhenEnter }
            onMouseLeave={ handleMouseLeave }
            onMouseDown={ handleMouseDown }
            onMouseUp= { handleMouseUp }
            style={{
                height, width
            }}
        >
            <img src={ display }/>
        </button>
    );
});