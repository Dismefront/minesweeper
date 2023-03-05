import { mouseDown, mouseUp } from "@/app/providers/store/slices/mouseSlice";
import { FunctionComponent, useState, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import scss from './Tile.module.scss';

export interface TileProps {
    defaultSprite: string | undefined,
    pressedSprite?: string,
    height?: string,
    width?: string,
    whenClick?: () => void,
    whenRightClick?: () => void,
    isTile: boolean,
    gameFinished?: boolean,
}

export const Tile: FunctionComponent<TileProps> = ({
    defaultSprite, pressedSprite, height, width, 
    whenClick, isTile, gameFinished, whenRightClick
}) => {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [display, changeDisplay] = useState<string>();
    const dispatch = useDispatch();

    useEffect(() => {
        changeDisplay(`${defaultSprite}`);
    }, [defaultSprite]);

    const handleMouseEnter = () => {
        if (isTile && gameFinished)
            return;
        if (isMouseOver)
            return;
        if (isMousePressed)
            setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        if (!isMouseOver && !isMousePressed)
            return;
        if (isTile && gameFinished)
            return;
        if (isTile)
            dispatch(mouseUp());
        setIsMouseOver(false);
        setIsMousePressed(false);
        changeDisplay(defaultSprite);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.button == 2)
            return;
        if (isTile && gameFinished)
            return;
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
            onClick={() => {
                    if (isTile && gameFinished) {
                        return;
                    }
                    if (whenClick)
                        whenClick();
                    handleMouseLeave();
                }
            }
            onContextMenu={() => {
                if (isTile && gameFinished) {
                    return;
                }
                if (whenRightClick)
                    whenRightClick();
                handleMouseLeave();
            }}
        >
            { display ? <img src={ display }/> : undefined }
        </button>
    );
};