/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { readApi } from "../api/readApi";
import { UseContextProvider } from "../ContextProvider";
import { UserInfo } from "../components/UserInfo";

export function Home() {
    const [users, setUsers] = React.useState<UserInfoHeader[]>([]);
    const { token } = UseContextProvider();
    React.useEffect(() => {
        readApi.findUsers(token).then(setUsers);
    }, []);

    return (
        <div className="contenedor">
            {users.map(u => <UserInfo key={u.username} {...u} />)}
        </div>
    );
}
