import { DigitWatch } from "@/pieces/DigitWatch";
import { FunctionComponent, useState } from "react";
import scss from './UpperScreen.module.scss';
import { Tile } from "@/pieces/Tile/ui/Tile";
import HappySmile from '@/components/Game/assets/sprites/smile_init.png';
import PressedSmile from '@/components/Game/assets/sprites/smile_pressed.png';
import WowSmile from '@/components/Game/assets/sprites/smile_wow.png';
import DeadSmile from '@/components/Game/assets/sprites/smile_dead.png';
import CoolSmile from '@/components/Game/assets/sprites/smile_sunglasses.png';
import { useSelector } from "react-redux";
import { storeType } from "@/app/providers/store";
import { useDispatch } from "react-redux";
import { gameSliceState, initializeBoard, refresh } from "@/app/providers/store/slices/gameSlice";

export const UpperScreen: FunctionComponent = () => {

    const MouseSt = useSelector((state: storeType) => state.mouseReducer);
    const st = useSelector((state: storeType) => state.gameReducer);
    const dispatch = useDispatch();
    
    let ToBeRendered = HappySmile;

    if (MouseSt.pressed) {
        ToBeRendered = WowSmile;
    }
    else if (st.game_lost)
        ToBeRendered = DeadSmile;
    else if (st.game_won)
        ToBeRendered = CoolSmile;

    return (
        <div
            className={scss.UpperScreen}
        >
            <DigitWatch boardCount={2} displayNum={40} />
            <Tile
                defaultSprite={ToBeRendered}
                pressedSprite={PressedSmile}
                height={"80%"}
                onClick={() => {
                    dispatch(refresh());
                }
                }
                isTile={false}
            />
            <DigitWatch boardCount={3} displayNum={10} />
        </div>
    );

}