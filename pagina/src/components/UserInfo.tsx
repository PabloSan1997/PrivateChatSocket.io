

export function UserInfo({ username }: UserInfoHeader) {
    return (
        <div className="userinfo">
            <span>{username}</span>
        </div>
    );
}
