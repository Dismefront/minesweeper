import { Route, RouteObject, Routes } from "react-router-dom";

export const routerProvider = (cfg: RouteObject[]) => {
    return (
        <Routes>
            {
                cfg.map(({ path, element }) => {
                    return <Route path={ path } element={ element } />
                })
            }
        </Routes>
    )
};