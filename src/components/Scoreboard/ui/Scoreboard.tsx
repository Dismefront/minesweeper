import { AppLink } from "@/pieces/Link";
import { LinkDecoration } from "@/pieces/Link";
import { FunctionComponent } from "react";
import scss from './Scoreboard.module.scss';

export const Scoreboard: FunctionComponent = () => {
    return (
        <>
            <AppLink applyClass={scss.topleft} to='/' linkDecoration={LinkDecoration.BACK}>
                Back
            </AppLink>
            <div className={scss.container}>
                <>scoreboard</>
            </div>
        </>
    );
}