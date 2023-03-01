import { ApplicationPaths } from "@/app/providers/routes/Paths";
import { AppLink } from "@/pieces/links";
import { FunctionComponent, PropsWithChildren } from "react";
import scss from './Menu.module.scss';

export const Menu: FunctionComponent = () => {
    return (
        <div className={scss.container}>
            <AppLink to={ApplicationPaths.START}>start</AppLink>
            <AppLink to={ApplicationPaths.SCOREBOARD}>scoreboard</AppLink>
        </div>
    );
}