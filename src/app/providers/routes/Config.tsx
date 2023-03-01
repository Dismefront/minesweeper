import { Game } from "@/components/Game";
import { Menu } from "@/components/Menu";
import { Scoreboard } from "@/components/Scoreboard";
import { Navigate, RouteObject, RouteProps } from "react-router-dom";
import { ApplicationPaths } from "./Paths";

export const routeConfig: RouteObject[] = [
    {
        path: ApplicationPaths.MENU,
        element: <Menu />
    },
    {
        path: ApplicationPaths.SCOREBOARD,
        element: <Scoreboard />
    },
    {
        path: ApplicationPaths.START,
        element: <Game />
    },
    {
        path: ApplicationPaths.ANY,
        element: <Navigate to={ApplicationPaths.MENU} />
    }
]