import { AppLink } from "@/pieces/Link";
import { LinkDecoration } from "@/pieces/Link";
import { FunctionComponent } from "react";
import scss from './Game.module.scss';
import { AppTable } from "@/pieces/Table/AppTable";
import { TileScreen } from "./bricks/TileScreen/TileScreen";
import { UpperScreen } from "./bricks/UpperScreen/UpperScreen";
import { storeType } from "@/app/providers/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initializeBoard, refresh } from "@/app/providers/store/slices/gameSlice";

export interface GameProps {
    newgame: boolean;
}

export const Game: FunctionComponent<GameProps> = ({ newgame }) => {
    const st = useSelector((state: storeType) => state.gameReducer);
    if (st.gameStarted && newgame) {
        const dispatch = useDispatch();
        dispatch(refresh());
    }
    
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