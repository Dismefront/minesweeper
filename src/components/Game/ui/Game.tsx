import { AppLink } from "@/pieces/Link";
import { LinkDecoration } from "@/pieces/Link";
import { FunctionComponent } from "react";
import scss from './Game.module.scss';
import { AppTable } from "@/pieces/Table/AppTable";
import { TileScreen } from "./bricks/TileScreen/TileScreen";
import { UpperScreen } from "./bricks/UpperScreen/UpperScreen";

export interface GameProps {
    newgame: boolean;
}

export const Game: FunctionComponent<GameProps> = ({ newgame }) => {
    
    return (
        <>
            <AppLink applyClass={scss.topleft} to='/' linkDecoration={LinkDecoration.BACK}>
                Back
            </AppLink>
            <div className={scss.Game}>
                <AppTable payload={[
                    <UpperScreen />,
                    <TileScreen />
                ]}/>
            </div>
        </>
    );
}