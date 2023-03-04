import { DigitWatch } from "@/pieces/DigitWatch";
import { FunctionComponent, useState } from "react";
import scss from './UpperScreen.module.scss';
import { Tile } from "@/pieces/Tile/ui/Tile";
import HappySmile from '@/components/Game/assets/sprites/smile_init.png';
import PressedSmile from '@/components/Game/assets/sprites/smile_pressed.png';
import { useSelector } from "react-redux";
import { storeType } from "@/app/providers/store";
import { useDispatch } from "react-redux";
import { initializeBoard, refresh } from "@/app/providers/store/slices/gameSlice";

export const UpperScreen: FunctionComponent = () => {

    const dispatch = useDispatch();

    return (
        <div
            className={scss.UpperScreen}
        >
            <DigitWatch boardCount={2} displayNum={40} />
            <Tile
                defaultSprite={HappySmile}
                pressedSprite={PressedSmile}
                height={"80%"}
                onClick={() => {
                    dispatch(refresh());
                }
                }
            />
            <DigitWatch boardCount={3} displayNum={10} />
        </div>
    );

}