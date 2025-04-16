import { HashRouter, Navigate, useRoutes } from "react-router-dom";
import { routesnames } from "./routesname";
import { Login } from "../layouts/Login";
import { Home } from "../layouts/Home";
import { Chat } from "../layouts/Chat";
import { UseContextProvider } from "../ContextProvider";


const ViewLogin = () => {
    const { token } = UseContextProvider();
    const route = token.trim() ? routesnames.home : routesnames.login;
    return <Navigate to={route} />
}

const ViewToken = ({ children }: Children) => {
    const { token } = UseContextProvider();
    if (!token.trim())
        return <Navigate to={routesnames.login} />
    return (
        <>
            {children}
        </>
    );
}

const Routes = () => useRoutes([
    {
        path: routesnames.login,
        element: <Login />
    },
    {
        path: routesnames.home,
        element: <ViewToken><Home /></ViewToken>
    },
    {
        path: routesnames.chat,
        element: <ViewToken><Chat /></ViewToken>
    },
    {
        path: '/',
        element: <ViewLogin />
    }
]);

export function RoutesIndex() {
    return <HashRouter><Routes /></HashRouter>;
}
