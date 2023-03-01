import { FunctionComponent } from "react";
import './styles/reset.scss';
import './styles/global.scss';
import scss from './styles/App.module.scss';
import { Link, RouterProvider } from "react-router-dom";
import { routerProvider } from "./providers/routes/Provider";
import { AppLink } from "@/pieces/links";
import { ApplicationPaths } from "./providers/routes/Paths";
import { routeConfig } from "./providers/routes/Config";

export const App: FunctionComponent = () => {
    console.log("RERENDERED");
    return (
        <div className={scss.container}>
            { routerProvider(routeConfig) }
        </div>
    );
}