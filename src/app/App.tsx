import { FunctionComponent } from "react";
import './styles/reset.scss';
import './styles/global.scss';
import scss from './styles/App.module.scss';
import { routerProvider } from "./providers/routes/Provider";
import { routeConfig } from "./providers/routes/Config";
import { useSelector } from "react-redux";
import { storeType } from "./providers/store";
import { useDispatch } from "react-redux";
import { mouseDown, mouseUp } from "./providers/store/slices/mouseSlice";

export const App: FunctionComponent = () => {
    return (
        <div className={scss.container}>
            { routerProvider(routeConfig) }
        </div>
    );
}