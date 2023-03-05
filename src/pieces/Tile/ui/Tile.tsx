import { mouseDown, mouseUp } from "@/app/providers/store/slices/mouseSlice";
import { FunctionComponent, useState, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import scss from './Tile.module.scss';

export interface TileProps {
    defaultSprite: string | undefined,
    pressedSprite?: string,
    height?: string,
    width?: string,
    onClick?: () => void,
    isTile: boolean
}

export const Tile: FunctionComponent<TileProps> = ({
    defaultSprite, pressedSprite, height, width, onClick, isTile
}) => {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [display, changeDisplay] = useState<string>();
    const dispatch = useDispatch();

    useEffect(() => {
        changeDisplay(`${defaultSprite}?${new Date().getTime()}`);
    }, [defaultSprite]);

    const handleMouseEnter = () => {
        if (isMouseOver)
            return;
        if (isMousePressed)
            setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        if (!isMouseOver && !isMousePressed)
            return;
        if (isTile)
            dispatch(mouseUp());
        setIsMouseOver(false);
        setIsMousePressed(false);
        changeDisplay(defaultSprite);
    };

    const handleMouseDown = () => {
        if (isTile) {
            dispatch(mouseDown());
        }
        setIsMousePressed(true);
        changeDisplay(pressedSprite);
    }

    return (
        <button
            className={scss.Tile}
            style={{
                height, width
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onClick={onClick}
        >
            { display ? <img src={ display }/> : undefined }
        </button>
    );
};