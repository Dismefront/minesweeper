import { ApplicationPaths } from "@/app/providers/routes/Paths";
import { AppLink } from "@/pieces/Link";
import { FunctionComponent } from "react";
import scss from './Menu.module.scss';

export const Menu: FunctionComponent = () => {
    return (
        <div className={scss.container}>
            <AppLink to={ApplicationPaths.CONTINUE}>continue</AppLink>
            <AppLink to={ApplicationPaths.START}>new game</AppLink>
            <AppLink to={ApplicationPaths.SCOREBOARD}>scoreboard</AppLink>
        </div>
    );
}