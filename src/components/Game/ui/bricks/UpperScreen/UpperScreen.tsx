import { DigitWatch } from "@/pieces/DigitWatch";
import { FunctionComponent, useState } from "react";
import scss from './UpperScreen.module.scss';

export const UpperScreen: FunctionComponent = () => {
    return (
        <div className={scss.UpperScreen}>
            <DigitWatch boardCount={2} displayNum={40}/>
            
            <DigitWatch boardCount={3} displayNum={10}/>
        </div>
    );
}