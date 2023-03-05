import { DigitWatch } from "@/pieces/DigitWatch";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
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
import { increaseTimer, refresh } from "@/app/providers/store/slices/gameSlice";
import { clearInterval } from "timers";

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

    useEffect(() => {
        let timerID: NodeJS.Timer
        if (st.timer_on) {
            timerID = setInterval(() => {
                dispatch(increaseTimer())
            }, 1000);
        }
        return () => {
            if (timerID)
                window.clearInterval(timerID);
        };
    }, [st.timer_on]);

    const component = useMemo(() => {
        return <div
            className={scss.UpperScreen}
        >
            <DigitWatch boardCount={2} displayNum={st.flags_count} />
            <Tile
                defaultSprite={ToBeRendered}
                pressedSprite={PressedSmile}
                height={"80%"}
                whenClick={() => {
                    dispatch(refresh());
                }
                }
                isTile={false}
            />
            <DigitWatch boardCount={3} displayNum={st.seconds} />
        </div>
    }, [ToBeRendered, st.flags_count, st.seconds]);

    return (
        component
    );

}