import { Link } from "react-router-dom";
import { routesnames } from "../routes/routesname";


export function UserInfo({ username }: UserInfoHeader) {
    
    return (
        <div className="userinfo">
            <Link to={`${routesnames.chat}?userfriend=${username}`}>{username}</Link>
        </div>
    );
}
