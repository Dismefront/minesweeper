import { DigitWatch } from "@/pieces/DigitWatch";
import { FunctionComponent, useState } from "react";
import scss from './UpperScreen.module.scss';
import { Tile } from "@/pieces/Tile/ui/Tile";
import HappySmile from '@/components/Game/assets/sprites/smile_init.png';
import PressedSmile from '@/components/Game/assets/sprites/smile_pressed.png';

export const UpperScreen: FunctionComponent = () => {
    const [isPressed, setIsPressed] = useState(false);

    const handleMosueDown = () => {
        setIsPressed(true);
    }

    const handleMosueUp = () => {
        setIsPressed(false);
    }

    return (
        <div 
            className={scss.UpperScreen} 
            onMouseDown={handleMosueDown}
            onMouseUp={handleMosueUp}
        >
            <DigitWatch boardCount={2} displayNum={40}/>
            <Tile 
                defaultSprite={ HappySmile } 
                mousePressed={ isPressed }
                pressedSprite={ PressedSmile }
                height={"80%"}
            />
            <DigitWatch boardCount={3} displayNum={10}/>
        </div>
    );

}