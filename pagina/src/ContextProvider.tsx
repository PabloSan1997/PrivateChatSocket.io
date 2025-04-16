import React from "react";
import { thestorage } from "./utils/thestorage";
import { readApi } from "./api/readApi";

const ContextBase = React.createContext<ContextProviderInterface>({
    token: "",
    login: function (logindto: LoginDto): void {
        throw new Error("Function not implemented." + logindto);
    },
    register: function (register: SignUpDto): void {
        throw new Error("Function not implemented." + register);
    },
    logout: function (): void {
        throw new Error("Function not implemented.");
    },
    userinfo: {
        username: "",
        nickname: "",
        urlImage: ""
    }
});

export function ContextProvider({ children }: Children) {
    const [token, setToken] = React.useState(thestorage.read());
    const [userinfo, setUserInfo] = React.useState<UserInfoHeader>({ username: "", nickname: "", urlImage: "" });

    React.useEffect(()=>{
        readApi.findUserInfo(token).then(setUserInfo).catch(console.error);
    },[token]);

    const login = (data: LoginDto) => {
        readApi.login(data).then(res => {
            setToken(res.jwt);
            thestorage.save(res.jwt);
        });
    }
    const register = (data: SignUpDto) => {
        readApi.regisger(data).then(res => {
            setToken(res.jwt);
            thestorage.save(res.jwt);
        });
    }
    const logout = () => {
        setToken('');
        thestorage.save('');
    }

    return (
        <ContextBase.Provider value={{ token, login, register, logout, userinfo }}>
            {children}
        </ContextBase.Provider>
    );
}


export const UseContextProvider = () => React.useContext(ContextBase);