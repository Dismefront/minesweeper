import { AppLink } from "@/pieces/links";
import { LinkDecoration } from "@/pieces/links/ui/Link";
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