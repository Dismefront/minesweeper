import { FunctionComponent, useMemo } from "react";
import scss from './DigitWatch.module.scss';
import Num0 from '../assets/sprites/timer_zero.png';
import Num1 from '../assets/sprites/timer_one.png';
import Num2 from '../assets/sprites/timer_two.png';
import Num3 from '../assets/sprites/timer_three.png';
import Num4 from '../assets/sprites/timer_four.png';
import Num5 from '../assets/sprites/timer_five.png';
import Num6 from '../assets/sprites/timer_six.png';
import Num7 from '../assets/sprites/timer_seven.png';
import Num8 from '../assets/sprites/timer_eight.png';
import Num9 from '../assets/sprites/timer_nine.png';
import { generateRandomString } from "@/pieces/tools/stringGenerator";

function getSprite(number: number): string | undefined {
    switch (number) {
        case 0:
            return Num0;
        case 1:
            return Num1;
        case 2:
            return Num2;
        case 3:
            return Num3;
        case 4:
            return Num4;
        case 5:
            return Num5;
        case 6:
            return Num6;
        case 7:
            return Num7;
        case 8:
            return Num8;
        case 9:
            return Num9;
        default:
            return undefined;
    }
}

export interface DigitWatchProps {
    displayNum: number;
    boardCount: number;
}

export const DigitWatch: FunctionComponent<DigitWatchProps> = ({ displayNum, boardCount }) => {

    const rootStyle = getComputedStyle(document.documentElement);
    const widthProp: string = rootStyle.getPropertyValue('--panel-height');
    const height: number = Number.parseInt(widthProp.slice(0, widthProp.indexOf('px')));

    const display: number[] = Array(boardCount);
    for (let i = boardCount - 1; i >= 0; i--) {
        display[i] = displayNum % 10;
        displayNum = Math.floor(displayNum / 10);
    }

    const boardNumberComponent = Array(boardCount);
    for (let i = 0; i < boardCount; i++) {
        boardNumberComponent[i] = useMemo(() => {
            console.log("rendered " + display[i]);
            return <img
                key={generateRandomString(5) + display[i]}
                className={scss.pixelated} 
                height={height} 
                src={getSprite(display[i])} 
            />
        }, [display[i]]);
    }

    return (
        <div className={scss.DigitWatch}>
            { boardNumberComponent }
        </div>
    );
}