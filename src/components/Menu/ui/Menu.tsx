import { ApplicationPaths } from "@/app/providers/routes/Paths";
import { storeType } from "@/app/providers/store";
import { AppLink, LinkDecoration } from "@/pieces/Link";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import scss from './Menu.module.scss';

export const Menu: FunctionComponent = () => {

    const started = useSelector((state: storeType) => state.gameReducer.gameStarted);

    return (
        <div className={scss.container}>
            <AppLink 
                target='_blank'
                to={"https://github.com/Dismefront/minesweeper"}
                linkDecoration={LinkDecoration.TITLE}
            >Minesweeper by Dismefront(Erik Romaikin)</AppLink>
            { started ? <AppLink to={ApplicationPaths.CONTINUE}>continue</AppLink> : undefined }
            <AppLink to={ApplicationPaths.START}>new game</AppLink>
            {/* <AppLink to={ApplicationPaths.SCOREBOARD}>scoreboard</AppLink> */}
        </div>
    );
}