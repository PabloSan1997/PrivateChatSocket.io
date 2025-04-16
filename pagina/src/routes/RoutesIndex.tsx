import { HashRouter, useRoutes } from "react-router-dom";


const Routes = () => useRoutes([]);

export function RoutesIndex() {
    return <HashRouter><Routes /></HashRouter>;
}
