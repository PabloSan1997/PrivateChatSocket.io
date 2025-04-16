import React from "react";
import { UseContextProvider } from "../ContextProvider";
import { Navigate } from "react-router-dom";
import { routesnames } from "../routes/routesname";

export function Login() {
    const { token, login } = UseContextProvider();
    const [loginDto, setLoginDto] = React.useState<LoginDto>({ username: '', password: '' })
    if (token.trim()) return <Navigate to={routesnames.home} />
    return (
        <>
            <form className="login" onSubmit={e => {
                e.preventDefault();
                if(loginDto.username.trim() && loginDto.password.trim()){
                    login(loginDto);
                    setLoginDto({username:'', password:''});
                }
            }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={loginDto.username}
                    onChange={e => setLoginDto(l => ({ ...l, username: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={loginDto.password}
                    onChange={e => setLoginDto(l => ({ ...l, password: e.target.value }))}
                />
                <button className="entrar" type="submit">Entrar</button>
            </form>
        </>
    );
}
