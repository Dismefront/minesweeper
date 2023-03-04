import { storeType } from "@/app/providers/store";
import { FunctionComponent, useState, memo } from "react";
import { useSelector } from "react-redux";
import scss from './Tile.module.scss';

export interface TileProps {
    defaultSprite: string | undefined,
    pressedSprite?: string,
    height?: string,
    width?: string,
    onClick?: () => void
}

export const Tile: FunctionComponent<TileProps> = memo(({
    defaultSprite, pressedSprite, height, width, onClick
}) => {

    const [display, changeDisplay] = useState<string | undefined>(defaultSprite);
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
            onClick={onClick}
        >
            <img src={ display }/>
        </button>
    );
});